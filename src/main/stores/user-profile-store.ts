"use client";

import { create } from "zustand";

export type UserProfile = {
  name: string;
  email: string;
  bio: string;
  phone: string;
  avatarUrl: string | File | null;
};

type UserProfileStore = {
  userProfile: UserProfile;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setBio: (bio: string) => void;
  setPhone: (phone: string) => void;
  setAvatarUrl: (avatarUrl: string | File | null) => void;
  resetUserProfile: () => void;
};

const initialState: UserProfile = {
  name: "",
  email: "",
  bio: "",
  phone: "",
  avatarUrl: null,
};

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  userProfile: initialState,

  setName: (name) =>
    set((state) => ({ userProfile: { ...state.userProfile, name } })),
  setEmail: (email) =>
    set((state) => ({ userProfile: { ...state.userProfile, email } })),
  setBio: (bio) =>
    set((state) => ({ userProfile: { ...state.userProfile, bio } })),
  setPhone: (phone) =>
    set((state) => ({ userProfile: { ...state.userProfile, phone } })),
  setAvatarUrl: (avatarUrl) =>
    set((state) => ({ userProfile: { ...state.userProfile, avatarUrl } })),
  resetUserProfile: () => set(() => ({ userProfile: initialState })),
}));
