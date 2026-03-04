import { Box } from "@/components/ui/box"
import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const ExploreScreen = () => {
    return (
        <SafeAreaView>
            <Box className="flex-1 items-center justify-center bg-white">
                <Text>Home</Text>
            </Box>
        </SafeAreaView>
    )
}

export default ExploreScreen