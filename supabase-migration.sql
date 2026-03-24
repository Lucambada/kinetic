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
  id UUID PRIMARY KEY, -- Matches auth.users.id
  name TEXT NOT NULL,
  username TEXT UNIQUE,
  role TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
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

-- Create Policies
-- Operations
CREATE POLICY "Allow all access to authenticated users" ON operations FOR ALL USING (auth.role() = 'authenticated');

-- Audit Logs
CREATE POLICY "Allow all access to authenticated users" ON audit_logs FOR ALL USING (auth.role() = 'authenticated');

-- Team Members
CREATE POLICY "Allow read access to authenticated users" ON team_members FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow insert for new signups" ON team_members FOR INSERT WITH CHECK (true); -- Allow anyone to insert during signup
CREATE POLICY "Allow update for own profile" ON team_members FOR UPDATE USING (auth.uid() = id);

-- Insert Initial Data (Optional)
INSERT INTO team_members (id, name, username, role, email, status, access, avatar) VALUES 
('00000000-0000-0000-0000-000000000001', 'Marcus Thorne', 'mthorne', 'System Administrator', 'm.thorne@kinetic.io', 'active', 'Full Terminal', 'https://picsum.photos/seed/marcus/100/100'),
('00000000-0000-0000-0000-000000000002', 'Elena Rodriguez', 'erodriguez', 'Operations Lead', 'e.rodriguez@kinetic.io', 'active', 'Ops Hub', 'https://picsum.photos/seed/elena/100/100'),
('00000000-0000-0000-0000-000000000003', 'David Chen', 'david', 'Audit Specialist', 'd.chen@kinetic.io', 'away', 'Read-Only Audit', 'https://picsum.photos/seed/david/100/100')
ON CONFLICT (id) DO NOTHING;
