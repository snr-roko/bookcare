import { Button, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { useCartBottomSheetStore } from "@/src/store"
import { useCartStore } from "@/src/store/useCartStore"
import { OrderItemType, OrderStatus } from "@/src/types"
import { cn, deriveRating, getStatusColor } from "@/src/utils"
import { Image } from "expo-image"
import { Text, View } from "react-native"

const OrderItemCard = ({orderItem}: {orderItem: OrderItemType}) => {
    const openCartSheet = useCartBottomSheetStore(state => state.openSheet)

    const openCartModal = () => {
        openCartSheet({
            authorKey: orderItem.authorKey,
            authorName: orderItem.authorName,
            coverUrl: orderItem.coverUrl,
            editionCount: String(orderItem.editionCount),
            id: String(orderItem.id),
            price: String(orderItem.price),
            rating: String(deriveRating(String(orderItem.id), orderItem.editionCount)),
            title: orderItem.title,
            yearFirstPublished: orderItem.yearFirstPublished
        })
    }

    const isInCart = useCartStore(state => state.cart.some(cartItem => cartItem.itemDetails.id === String(orderItem.id)))


    return (
        <View
            style={{
                overflow: "hidden",
                borderRadius: 1,
                elevation: 2,
            }}
            className="flex-row p-3 gap-5 border border-bookcare-border dark:border-bookcare-borderDark bg-bookcare-surface dark:bg-bookcare-surfaceDark">
            <View>
                <Image
                    style={{ height: 120, width: 100}}
                    source={{ uri: orderItem.coverUrl }}
                    placeholder={{blurhash: colors.bookCardBlurHash}}
                    transition={300}
                    contentFit="cover"
                />
            </View>
            <View className="flex-1 justify-between">
                <View>
                    <Text numberOfLines={2} className="text-lg flex-shrink font-semibold leading-tight text-bookcare-text dark:text-bookcare-textDark">
                        {orderItem.title}
                    </Text>
                </View>
                <View>
                    <Text numberOfLines={1} className="text-bookcare-muted dark:text-bookcare-mutedDark text-sm">
                        {orderItem.authorName}
                    </Text>
                    <Text className="font-semibold text-bookcare-text dark:text-bookcare-textDark">GHS {orderItem.price}</Text>
                    <View className="flex-row justify-between items-end">
                        <Button 
                            disabled={isInCart} 
                            onPress={openCartModal} 
                            size="sm" 
                            className={cn([
                                {"bg-bookcare-primary dark:bg-bookcare-primaryDark": !isInCart, "bg-bookcare-primary/60 dark:bg-bookcare-primaryDark/60": isInCart},
                                "rounded-xl" 
                            ])}>
                            <ButtonText className="text-bookcare-whiteSoft font-bold">
                                Buy Again
                            </ButtonText>
                        </Button>
                        <View className="flex-row gap-5">
                            <Text className="text-xl font-semibold text-bookcare-muted dark:text-bookcare-mutedDark">x{orderItem.quantity}</Text>
                            <Text className="text-lg font-bold text-bookcare-text dark:text-bookcare-textDark">GHS {orderItem.price * orderItem.quantity}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default OrderItemCard