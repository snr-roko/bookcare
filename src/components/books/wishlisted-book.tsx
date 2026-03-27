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
            className="border border-bookcare-border dark:border-bookcare-borderDark flex-row p-3 gap-5 items-center bg-bookcare-surface dark:bg-bookcare-surfaceDark">
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
                    <Text numberOfLines={2} className="text-lg flex-shrink font-semibold text-bookcare-text dark:text-bookcare-textDark">
                        {book.title}
                    </Text>
                </View>
                <View>
                    <Text numberOfLines={1} className="text-bookcare-muted dark:text-bookcare-mutedDark text-sm">
                        {book.authorName}
                    </Text>
                    <Text className="text-lg font-bold text-bookcare-text dark:text-bookcare-textDark">GHS {book.price}</Text>
                    <View className="gap-3 flex-row">
                        <Button 
                            disabled={isInCart} 
                            onPress={openCartModal} 
                            size="sm" 
                            className={cn([
                                {"bg-bookcare-primary dark:bg-bookcare-primaryDark": !isInCart, "bg-bookcare-primary/60 dark:bg-bookcare-primaryDark/60": isInCart},
                                "rounded-xl" 
                            ])}>
                            <ButtonText className="text-bookcare-whiteSoft font-bold">
                                Add to Cart
                            </ButtonText>
                        </Button>
                        <Button onPress={() => removeFromWishlist(book.id)} size="sm" className="bg-bookcare-error dark:bg-bookcare-errorDark rounded-xl">
                            <Ionicons name="heart-dislike" size={28} color={colors.whiteSoft} />
                        </Button>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
)

export default WishlistedBook