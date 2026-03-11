import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Profile } from '../types/database';

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: string | null }>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  (set, get) => ({
    session: null,
    user: null,
    profile: null,
    loading: false,
    initialized: false,

    setSession: (session) => set({ session, user: session?.user ?? null }),
    setProfile: (profile) => set({ profile }),
    setLoading: (loading) => set({ loading }),
    setInitialized: (initialized) => set({ initialized }),

    signUp: async (email, password, username) => {
      set({ loading: true });
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { username: username || email.split('@')[0] },
          },
        });

        if (error) throw error;

        if (data.session) {
          set({ session: data.session, user: data.user });
          await get().fetchProfile();
        }

        return { error: null };
      } catch (error: any) {
        return { error: error.message || 'Sign up failed' };
      } finally {
        set({ loading: false });
      }
    },

    signIn: async (email, password) => {
      set({ loading: true });
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        set({ session: data.session, user: data.user });
        await get().fetchProfile();

        return { error: null };
      } catch (error: any) {
        return { error: error.message || 'Sign in failed' };
      } finally {
        set({ loading: false });
      }
    },

    signOut: async () => {
      set({ loading: true });
      try {
        await supabase.auth.signOut();
        set({ session: null, user: null, profile: null });
      } catch (error) {
        console.error('Sign out error:', error);
      } finally {
        set({ loading: false });
      }
    },

    fetchProfile: async () => {
      const { user } = get();
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        set({ profile: data });
      } catch (error) {
        console.error('Fetch profile error:', error);
      }
    },

    updateProfile: async (updates) => {
      const { user } = get();
      if (!user) return { error: 'No user logged in' };

      try {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single();

        if (error) throw error;
        set({ profile: data });
        return { error: null };
      } catch (error: any) {
        return { error: error.message || 'Update failed' };
      }
    },

    initialize: async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          set({ session, user: session.user });
          await get().fetchProfile();
        }

        // Listen for auth changes
        supabase.auth.onAuthStateChange((_event, session) => {
          set({ session, user: session?.user ?? null });
          if (session) {
            get().fetchProfile();
          } else {
            set({ profile: null });
          }
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        set({ initialized: true });
      }
    },
  })
);
