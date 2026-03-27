import { colors } from "@/src/constants"
import { Stack } from "expo-router"
import { useColorScheme } from "react-native"

const AuthRootLayout = () => {
    
    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name="login"
            />
            <Stack.Screen
                name="signup"
            />
            <Stack.Screen
                name="confirmsignup"
                options={{
                    headerShown: true,
                    headerTitle: "Confirm Email",
                    headerTintColor: isDark ? colors.headingDark : colors.heading,
                    headerStyle: {
                        backgroundColor: isDark ? colors.primaryDark : colors.primary
                    }
                }}
            />
        </Stack>
    )
}

export default AuthRootLayout