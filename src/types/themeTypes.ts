export type ThemeMode = "light" | "dark" | "system"

export type ThemeType = {
    mode: ThemeMode
    loadMode: () => Promise<ThemeMode | null>
    setMode: (mode: "light" | "dark" | "system") => void
}