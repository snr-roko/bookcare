import { Box } from "@/components/ui/box"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const LoginScreen = () => {
    return (
        <SafeAreaView className="flex-1">
            <Box className="flex-1 items-center justify-center bg-white">
                <Text className="text-xl font-bold text-blue-500">Login</Text>
            </Box>
        </SafeAreaView>
    )
}

export default LoginScreen