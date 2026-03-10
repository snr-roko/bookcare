import { Button, ButtonText } from "@/components/ui/button"
import { supabase } from "@/src/lib/supabase"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const DiscoverScreen = () => {
    const logoutUser = async() => {
        await supabase.auth.signOut()
    }
    return (
        <SafeAreaView className="flex-1 py-20 px-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <View className="flex-1 items-center justify-center">
                <Text className="text-white">Home</Text>
                <Button onPress={logoutUser}><ButtonText>Logout</ButtonText></Button>
            </View>
        </SafeAreaView>
    )
}

export default DiscoverScreen