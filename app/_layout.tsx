import "../global.css"
import {QueryClientProvider} from "@tanstack/react-query"
import { queryClient } from "@/src/lib/queryClient"
import {Stack} from "expo-router"
import {SafeAreaProvider} from "react-native-safe-area-context"
import { useAuthStore, useThemeStore } from "@/src/store"
import {useShallow} from "zustand/shallow"
import { useEffect } from "react"
import { SplashScreen } from "expo-router"
import { ActivityIndicator } from "react-native"
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useColorScheme } from "nativewind"

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
    const {loadAuth, isLoggedIn, isLoading} = useAuthStore(useShallow(
        (state) => ({
            loadAuth: state.loadAuth,
            isLoggedIn: state.session !== null,
            isLoading: state.isLoading
        })
    ))

    const mode = useThemeStore((state) => state.mode)
    const {loadMode, setMode} = useThemeStore((state) => ({loadMode: state.loadMode, setMode: state.setMode}))

    const {setColorScheme} = useColorScheme()

    useEffect(() => {
        loadAuth().finally(() => SplashScreen.hideAsync())
    }, [])

    useEffect(() => {
        const initializeTheme = async () => {
            const savedTheme = await loadMode()
            if (savedTheme) setColorScheme(savedTheme)
            else {
                setMode("system")
        }
        }
        initializeTheme()
    }, [])

    useEffect(() => {
        setColorScheme(mode)
    }, [mode])

    if (isLoading) return (
        <ActivityIndicator />
    )

    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode={mode}>
                <SafeAreaProvider>
                    <Stack screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Protected guard={isLoggedIn}>
                            <Stack.Screen
                                name="(tabs)"
                            />
                        </Stack.Protected>
                        <Stack.Protected guard={!isLoggedIn}>
                            <Stack.Screen
                                name="(auth)"
                            />
                        </Stack.Protected>
                    </Stack>
                </SafeAreaProvider>
            </GluestackUIProvider>
        </QueryClientProvider>   
    )
}

export default RootLayout