import { colors } from "@/src/constants"
import { Stack } from "expo-router"

const AuthRootLayout = () => {
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
                    headerTintColor: colors.darkText,
                    headerStyle: {
                        backgroundColor: colors.primary
                    }
                }}
            />
        </Stack>
    )
}

export default AuthRootLayout