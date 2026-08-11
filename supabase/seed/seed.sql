-- ==========================================
-- Nexus Team Hub Seed Data
-- ==========================================

INSERT INTO public.organizations (id, name, slug, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Nexus Tech', 'nexus-tech', 'Primary enterprise organization for core platform R&D'),
('22222222-2222-2222-2222-222222222222', 'MMUST Developers', 'mmust-developers', 'University developer community workspace'),
('33333333-3333-3333-3333-333333333333', 'Student Developers', 'student-developers', 'Open student contributor chapter')
ON CONFLICT (slug) DO NOTHING;
