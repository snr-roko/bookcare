import { Button, ButtonText } from "@/components/ui/button"
import { supabase } from "@/src/lib/supabase"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const WishlistScreen = () => {
    const logoutUser = async() => {
        await supabase.auth.signOut()
    }
    return (
        <SafeAreaView className="flex-1 py-10 px-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <Text className="text-bookcare-primary text-3xl">Wishlist</Text>

        </SafeAreaView>
    )
}

export default WishlistScreen