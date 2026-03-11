import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Profile, Group, GroupMember } from '../types/database';

interface LeaderboardEntry extends Profile {
  rank: number;
}

interface SocialState {
  leaderboard: LeaderboardEntry[];
  groups: Group[];
  currentGroup: Group | null;
  groupMembers: (GroupMember & { profile: Profile })[];
  loading: boolean;
  error: string | null;

  // Leaderboard
  fetchLeaderboard: () => Promise<void>;

  // Groups
  fetchGroups: () => Promise<void>;
  createGroup: (name: string, description?: string) => Promise<Group | null>;
  joinGroup: (inviteCode: string) => Promise<{ error: string | null }>;
  leaveGroup: (groupId: string) => Promise<void>;
  fetchGroupMembers: (groupId: string) => Promise<void>;
  setCurrentGroup: (group: Group | null) => void;
}

export const useSocialStore = create<SocialState>((set, get) => ({
  leaderboard: [],
  groups: [],
  currentGroup: null,
  groupMembers: [],
  loading: false,
  error: null,

  fetchLeaderboard: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('consistency_score', { ascending: false })
        .limit(50);

      if (error) throw error;

      const leaderboard = (data || []).map((profile, index) => ({
        ...profile,
        rank: index + 1,
      }));

      set({ leaderboard });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchGroups: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Fetch groups user is a member of
      const { data: membershipData, error: membershipError } = await supabase
        .from('group_members')
        .select('group_id')
        .eq('user_id', user.id);

      if (membershipError) throw membershipError;

      const groupIds = membershipData?.map((m) => m.group_id) || [];

      if (groupIds.length > 0) {
        const { data: groupsData, error: groupsError } = await supabase
          .from('groups')
          .select('*')
          .in('id', groupIds);

        if (groupsError) throw groupsError;
        set({ groups: groupsData || [] });
      } else {
        set({ groups: [] });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createGroup: async (name, description) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Generate invite code
      const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();

      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .insert({
          name,
          description,
          invite_code: inviteCode,
          owner_id: user.id,
          is_public: false,
        })
        .select()
        .single();

      if (groupError) throw groupError;

      // Add owner as member
      const { error: memberError } = await supabase
        .from('group_members')
        .insert({
          group_id: groupData.id,
          user_id: user.id,
          role: 'owner',
        });

      if (memberError) throw memberError;

      // Update local state
      set((state) => ({ groups: [...state.groups, groupData] }));
      return groupData;
    } catch (error: any) {
      set({ error: error.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  joinGroup: async (inviteCode) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Find group by invite code
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .select('*')
        .eq('invite_code', inviteCode.toUpperCase())
        .single();

      if (groupError || !groupData) {
        return { error: 'Invalid invite code' };
      }

      // Check if already a member
      const { data: existingMember } = await supabase
        .from('group_members')
        .select('id')
        .eq('group_id', groupData.id)
        .eq('user_id', user.id)
        .single();

      if (existingMember) {
        return { error: 'You are already a member of this group' };
      }

      // Join group
      const { error: joinError } = await supabase
        .from('group_members')
        .insert({
          group_id: groupData.id,
          user_id: user.id,
          role: 'member',
        });

      if (joinError) throw joinError;

      // Update local state
      set((state) => ({ groups: [...state.groups, groupData] }));
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  leaveGroup: async (groupId) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      set((state) => ({
        groups: state.groups.filter((g) => g.id !== groupId),
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchGroupMembers: async (groupId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          profile:profiles(*)
        `)
        .eq('group_id', groupId);

      if (error) throw error;
      set({ groupMembers: data || [] });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setCurrentGroup: (group) => {
    set({ currentGroup: group });
  },
}));
