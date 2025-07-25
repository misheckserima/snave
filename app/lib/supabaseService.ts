import { supabase } from './supabase';
import type { User, RegisterData, LoginData } from './api';

export interface SupabaseUser {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  is_active?: boolean;
}

export class SupabaseService {
  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<{ user: SupabaseUser | null; error: any }> {
    // First register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      return { user: null, error: authError };
    }

    // If auth successful, store additional user data in the users table
    if (authData.user) {
      const { data: userRecord, error: profileError } = await supabase
        .from('users')
        .insert<SupabaseUser>([
          {
            id: authData.user.id,
            name: userData.name,
            email: userData.email.toLowerCase(),
            is_active: true,
          },
        ])
        .select()
        .single();

      if (profileError) {
        // If profile creation fails, we should ideally clean up the auth user
        // but for simplicity, we'll just return the error
        return { user: null, error: profileError };
      }

      return { user: userRecord as SupabaseUser, error: null };
    }

    return { user: null, error: new Error('User registration failed') };
  }

  /**
   * Login a user
   */
  async login(credentials: LoginData): Promise<{ user: SupabaseUser | null; error: any }> {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) {
      return { user: null, error: authError };
    }

    if (authData.user) {
      // Get the user profile data
      const { data: userData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        return { user: null, error: profileError };
      }

      return { user: userData as SupabaseUser, error: null };
    }

    return { user: null, error: new Error('Login failed') };
  }

  /**
   * Get the current user profile
   */
  async getProfile(): Promise<{ user: SupabaseUser | null; error: any }> {
    const { data: authData } = await supabase.auth.getUser();
    
    if (!authData.user) {
      return { user: null, error: new Error('Not authenticated') };
    }

    const { data: userData, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      return { user: null, error: profileError };
    }

    return { user: userData as SupabaseUser, error: null };
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<{ error: any }> {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  /**
   * Check if a user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const { data } = await supabase.auth.getUser();
    return !!data.user;
  }
}

export const supabaseService = new SupabaseService();