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

    // Create a team member entry for the new user
    if (data.user) {
      try {
        await supabase.from('team_members').insert([{
          id: data.user.id,
          name: metadata.full_name || email.split('@')[0],
          email: email,
          username: metadata.username || email.split('@')[0],
          role: 'Operador',
          access: 'Nível 1',
          status: 'active'
        }]);
      } catch (insertError) {
        console.error('Failed to create team member record:', insertError);
        // We don't throw here to avoid failing the whole signup if just the profile creation fails
      }
    }

    return data;
  },

  async signIn(identifier: string, password: string) {
    let loginEmail = identifier;

    // If it doesn't look like an email, try to resolve as username
    if (!identifier.includes('@')) {
      const { data, error } = await supabase
        .from('team_members')
        .select('email')
        .eq('username', identifier)
        .single();
      
      if (!error && data) {
        loginEmail = data.email;
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
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
