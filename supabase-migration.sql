-- Migration for Kinetic Ledger

-- Operations Table
CREATE TABLE IF NOT EXISTS operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id TEXT NOT NULL,
  type TEXT NOT NULL, -- 'production', 'distribution', 'refinement'
  status TEXT NOT NULL, -- 'completed', 'active', 'pending'
  location TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  operator_id TEXT NOT NULL,
  volume NUMERIC NOT NULL,
  priority TEXT NOT NULL, -- 'high', 'medium', 'low'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  action TEXT NOT NULL,
  operator_name TEXT NOT NULL,
  status TEXT NOT NULL, -- 'success', 'warning', 'failure'
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL, -- 'active', 'offline', 'away'
  access TEXT NOT NULL, -- 'Full Terminal', 'Ops Hub', etc.
  avatar TEXT,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create Policies (Allow all for now, to be hardened)
CREATE POLICY "Allow all access to authenticated users" ON operations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all access to authenticated users" ON audit_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all access to authenticated users" ON team_members FOR ALL USING (auth.role() = 'authenticated');

-- Insert Initial Data (Optional)
INSERT INTO team_members (name, role, email, status, access, avatar) VALUES 
('Marcus Thorne', 'System Administrator', 'm.thorne@kinetic.io', 'active', 'Full Terminal', 'https://picsum.photos/seed/marcus/100/100'),
('Elena Rodriguez', 'Operations Lead', 'e.rodriguez@kinetic.io', 'active', 'Ops Hub', 'https://picsum.photos/seed/elena/100/100'),
('David Chen', 'Audit Specialist', 'd.chen@kinetic.io', 'away', 'Read-Only Audit', 'https://picsum.photos/seed/david/100/100');
