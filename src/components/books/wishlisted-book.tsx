import { WishlistItem } from "@/src/types"
import { Pressable, Text, View } from "react-native"
import { Image } from "expo-image"
import { colors } from "@/src/constants"
import { Button, ButtonText } from "@/components/ui/button"
import { Ionicons } from "@expo/vector-icons"
import { useWhishlistStore } from "@/src/store/useWishlistStore"
import { useRouter } from "expo-router"
import { useCartBottomSheetStore } from "@/src/store"
import { useCartStore } from "@/src/store/useCartStore"
import { cn } from "@/src/utils"
import { memo, useCallback } from "react"
import * as Haptics from "expo-haptics"

const WishlistedBook = memo(
    ({book}: {book: WishlistItem}) => {

    const router = useRouter()

    const removeFromWishlist = useWhishlistStore((state) => state.removeFromWishlist)

    const openCartSheet = useCartBottomSheetStore(state => state.openSheet)

    const routeToBookDetailsPage = useCallback(
        () => {
        router.push({
            pathname: "/book/[id]",
            params: {
                ...book
            }
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }, []
    ) 

    const openCartModal = () => {
        openCartSheet(book)
    }

    const isInCart = useCartStore(state => state.cart.some(cartItem => cartItem.itemDetails.id === book.id))

    return (
        <Pressable
            onPress={routeToBookDetailsPage} 
            style={{
                overflow: "hidden",
                borderRadius: 8,
                elevation: 2,
            }}
            className="flex-row p-3 gap-5 items-center bg-white dark:bg-bookcare-darkCard">
            <View>
                <Image
                    style={{ height: 120, width: 100}}
                    source={{ uri: book.coverUrl }}
                    placeholder={colors.bookCardBlurHash}
                    transition={300}
                    contentFit="cover"
                />
            </View>
            <View className="flex-1 justify-between">
                <View>
                    <Text numberOfLines={2} className="text-lg flex-shrink font-semibold text-bookcare-textDark dark:text-bookcare-darkText">
                        {book.title}
                    </Text>
                </View>
                <View>
                    <Text numberOfLines={1} className="text-bookcare-textMuted text-sm">
                        {book.authorName}
                    </Text>
                    <Text className="text-lg font-bold text-bookcare-textDark dark:text-bookcare-darkText">GHS {book.price}</Text>
                    <View className="gap-3 flex-row">
                        <Button 
                            disabled={isInCart} 
                            onPress={openCartModal} 
                            size="sm" 
                            className={cn([
                                {"bg-bookcare-primary": !isInCart, "bg-bookcare-mid": isInCart},
                                "rounded-xl" 
                            ])}>
                            <ButtonText className="text-white font-bold">
                                Add to Cart
                            </ButtonText>
                        </Button>
                        <Button onPress={() => removeFromWishlist(book.id)} size="sm" className="bg-bookcare-error rounded-xl">
                            <Ionicons name="heart-dislike" size={28} color="#fff" />
                        </Button>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
)

export default WishlistedBook