-- Fix the remaining function without proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Add remaining RLS policies for events, memberships, and payments
DROP POLICY IF EXISTS "Everyone can view published events" ON public.events;
DROP POLICY IF EXISTS "Org admins can manage events" ON public.events;

CREATE POLICY "Everyone can view published events" ON public.events
    FOR SELECT USING (status = 'published' OR public.is_org_admin(auth.uid(), organization_id));

CREATE POLICY "Org admins can manage events" ON public.events
    FOR ALL USING (public.is_org_admin(auth.uid(), organization_id));

DROP POLICY IF EXISTS "Users can view their own memberships" ON public.memberships;
DROP POLICY IF EXISTS "Org admins can view org memberships" ON public.memberships;
DROP POLICY IF EXISTS "Users can apply for membership" ON public.memberships;
DROP POLICY IF EXISTS "Org admins can update memberships" ON public.memberships;

CREATE POLICY "Users can view their own memberships" ON public.memberships
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Org admins can view org memberships" ON public.memberships
    FOR SELECT USING (public.is_org_admin(auth.uid(), organization_id));

CREATE POLICY "Users can apply for membership" ON public.memberships
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Org admins can update memberships" ON public.memberships
    FOR UPDATE USING (public.is_org_admin(auth.uid(), organization_id));

DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;
DROP POLICY IF EXISTS "Org admins can view org payments" ON public.payments;
DROP POLICY IF EXISTS "Users can create payments" ON public.payments;

CREATE POLICY "Users can view their own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Org admins can view org payments" ON public.payments
    FOR SELECT USING (public.is_org_admin(auth.uid(), organization_id));

CREATE POLICY "Users can create payments" ON public.payments
    FOR INSERT WITH CHECK (auth.uid() = user_id);