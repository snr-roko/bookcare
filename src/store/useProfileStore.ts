import { create } from "zustand";
import { ProfileStoreType } from "../types";

export const useProfileStore = create<ProfileStoreType>(
   (set) => ({
            profileImage: null,
            setProfileImage: (uri) => set({profileImage: uri})
        })
    )