import { Button, ButtonText } from "@/components/ui/button"
import WishlistedBook from "@/src/components/books/wishlisted-book"
import { supabase } from "@/src/lib/supabase"
import { useWhishlistStore } from "@/src/store/useWishlistStore"
import { useRouter } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const WishlistScreen = () => {

    const router = useRouter()

    const wishlistedBooks = useWhishlistStore((state) => state.items)
    
    const routeToHomepage = () => {
        router.push("/(tabs)")
    }

    return (
        <SafeAreaView className="flex-1 pt-10 px-5 gap-3 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <Text className="text-bookcare-primary text-3xl">Wishlist</Text>
                {
                    wishlistedBooks.length === 0 ?
                    <View className="gap-2 justify-center flex-1 items-center">
                        <Text className="text-bookcare-textDark dark:text-bookcare-darkText font-bold text-2xl">Your wishlist is empty</Text>
                        <Text className="text-bookcare-textMuted text-lg">Start adding books you love</Text>
                        <Button onPress={routeToHomepage} size="lg" className="bg-bookcare-primary rounded-xl">
                            <ButtonText className="text-white font-semibold">Browse Books</ButtonText>
                        </Button>
                    </View> :
                    <ScrollView
                        showsVerticalScrollIndicator={false} contentContainerClassName="gap-3 pb-3"
                    >    
                        <View className="gap-3">
                            {
                                wishlistedBooks.map((book) => (
                                    <WishlistedBook key={book.id} book={book} />
                            ))
                            }
                        </View>
                    </ScrollView>
                    }
        </SafeAreaView>
    )
}

export default WishlistScreen