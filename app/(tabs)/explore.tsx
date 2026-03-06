import { Button, ButtonText } from "@/components/ui/button"
import { supabase } from "@/src/lib/supabase"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const ExploreScreen = () => {
    const logoutUser = async() => {
        await supabase.auth.signOut()
    }
    return (
        <SafeAreaView>
            <View className="flex-1 items-center justify-center bg-white">
                <Text>Home</Text>
                <Button onPress={logoutUser}><ButtonText>Logout</ButtonText></Button>
            </View>
        </SafeAreaView>
    )
}

export default ExploreScreen