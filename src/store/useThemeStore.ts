import { create } from "zustand";
import { ThemeType, ThemeMode } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const useThemeStore = create<ThemeType>((set, get) => (
    {
        mode: "system",
        setMode: (mode) => {
            set({mode})
            AsyncStorage.setItem("themeMode", mode)
        },
        loadMode: async () => {
            const mode = await AsyncStorage.getItem("themeMode")
            return mode as ThemeMode ?? null
        }
    }
))