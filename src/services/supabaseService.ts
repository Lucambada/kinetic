import { supabase } from '../lib/supabase';

export const AuthService = {
  async signUp(email: string, password: string, metadata: any = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};

export const OperationsService = {
  async getOperations() {
    const { data, error } = await supabase
      .from('operations')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createOperation(operation: any) {
    const { data, error } = await supabase
      .from('operations')
      .insert([operation])
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

export const AuditService = {
  async getLogs() {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async logAction(action: string, operator: string, status: string, details: any = {}) {
    const { error } = await supabase
      .from('audit_logs')
      .insert([{ action, operator_name: operator, status, details }]);
    
    if (error) throw error;
  }
};

export const TeamService = {
  async getMembers() {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  }
};
