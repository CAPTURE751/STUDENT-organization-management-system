-- Add missing enum columns to existing tables
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'student';
ALTER TABLE public.organizations ADD COLUMN IF NOT EXISTS organization_type organization_type NOT NULL DEFAULT 'academic';
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS status event_status NOT NULL DEFAULT 'draft';
ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS status membership_status NOT NULL DEFAULT 'pending';
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS status payment_status NOT NULL DEFAULT 'pending';

-- Now create the security functions and policies
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role, _organization_id UUID DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (_organization_id IS NULL OR organization_id = _organization_id OR organization_id IS NULL)
  )
$$;

CREATE OR REPLACE FUNCTION public.is_org_admin(_user_id UUID, _organization_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'super_admin')
      AND (organization_id = _organization_id OR organization_id IS NULL)
  )
$$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Drop existing policies for user_roles
DROP POLICY IF EXISTS "Super admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage org roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- RLS Policies for user_roles
CREATE POLICY "Super admins can manage all roles" ON public.user_roles
    FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage org roles" ON public.user_roles
    FOR ALL USING (public.is_org_admin(auth.uid(), organization_id));

CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

-- Drop existing policies for organizations
DROP POLICY IF EXISTS "Everyone can view active organizations" ON public.organizations;
DROP POLICY IF EXISTS "Admins can manage organizations" ON public.organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON public.organizations;

-- RLS Policies for organizations
CREATE POLICY "Everyone can view active organizations" ON public.organizations
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage organizations" ON public.organizations
    FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users can create organizations" ON public.organizations
    FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Create trigger to automatically create user profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, email)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    NEW.email
  );
  
  -- Give new users the default 'student' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();