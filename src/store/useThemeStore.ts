import { create } from "zustand";
import { ThemeType, ThemeMode } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const useThemeStore = create<ThemeType>((set, get) => (
    {
        mode: "system",
        setMode: async (mode) => {
            await AsyncStorage.setItem("themeMode", mode)
            set({mode})
        },
        loadMode: async () => {
            const mode = await AsyncStorage.getItem("themeMode")
            return mode as ThemeMode ?? null
        }
    }
))