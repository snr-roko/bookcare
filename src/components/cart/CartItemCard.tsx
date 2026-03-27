import { Button, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { useCartStore } from "@/src/store/useCartStore"
import { CartItemType } from "@/src/types"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { memo, useCallback } from "react"
import { Pressable, Text, View } from "react-native"
import * as Haptics from "expo-haptics"

const CartItemCard = memo(
    ({cartItem}: {cartItem: CartItemType}) => {

    const router = useRouter()

    const removeFromCart = useCartStore((state) => state.removeFromCart)

    const routeToBookDetailsPage = useCallback(
        () => {
        router.push({
            pathname: "/book/[id]",
            params: {
                ...cartItem.itemDetails
            }
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }, [] 
    )

    const removeCartItemFromCart = () => {
        removeFromCart(cartItem.itemDetails.id)
    }

    return (
        <Pressable
            onPress={routeToBookDetailsPage} 
            style={{
                overflow: "hidden",
                borderRadius: 1,
                elevation: 2,
            }}
            className="flex-row p-3 gap-5 bg-white dark:bg-bookcare-darkCard">
            <View>
                <Image
                    style={{ height: 120, width: 100}}
                    source={{ uri: cartItem.itemDetails.coverUrl }}
                    placeholder={colors.bookCardBlurHash}
                    transition={300}
                    contentFit="cover"
                />
            </View>
            <View className="flex-1 justify-between">
                <View>
                    <Text numberOfLines={2} className="text-lg flex-shrink font-semibold leading-tight text-bookcare-textDark dark:text-bookcare-darkText">
                        {cartItem.itemDetails.title}
                    </Text>
                </View>
                <View>
                    <Text numberOfLines={1} className="text-bookcare-textMuted text-sm">
                        {cartItem.itemDetails.authorName}
                    </Text>
                    <Text className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText">GHS {cartItem.itemDetails.price}</Text>
                    <View className="flex-row justify-between items-end">
                        <Button onPress={removeCartItemFromCart} size="sm" className="bg-bookcare-primary rounded-xl">
                            <ButtonText className="text-white font-bold">
                                Remove
                            </ButtonText>
                        </Button>
                        <View className="flex-row gap-5">
                            <Text className="text-xl font-semibold text-bookcare-textMuted">x{cartItem.quantity}</Text>
                            <Text className="text-lg font-bold text-bookcare-textDark dark:text-bookcare-darkText">GHS {parseInt(cartItem.itemDetails.price) * cartItem.quantity}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
)

export default CartItemCard