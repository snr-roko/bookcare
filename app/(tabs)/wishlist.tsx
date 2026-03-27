import { Button, ButtonText } from "@/components/ui/button"
import WishlistedBook from "@/src/components/books/wishlisted-book"
import { useWhishlistStore } from "@/src/store/useWishlistStore"
import { useRouter } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useColorScheme } from "react-native"

const WishlistScreen = () => {

    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    const router = useRouter()

    const wishlistedBooks = useWhishlistStore((state) => state.items)
    
    const routeToHomepage = () => {
        router.push("/(tabs)")
    }    

    return (
        <SafeAreaView className="flex-1 pt-10 px-5 gap-3 bg-bookcare-bg dark:bg-bookcare-bgDark">
            <Text className="text-bookcare-heading dark:text-bookcare-headingDark text-3xl">Wishlist</Text>
                {
                    wishlistedBooks.length === 0 ?
                    <View className="gap-2 justify-center flex-1 items-center">
                        <Text className="text-bookcare-text dark:text-bookcare-textDark font-bold text-2xl">Your wishlist is empty</Text>
                        <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-lg">Start adding books you love</Text>
                        <Button onPress={routeToHomepage} size="lg" className="bg-bookcare-primary dark:bg-bookcare-primaryDark rounded-xl">
                            <ButtonText className="text-bookcare-whiteSoft font-semibold">Browse Books</ButtonText>
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