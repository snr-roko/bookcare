import { Button, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { OrderItemType, OrderStatus } from "@/src/types"
import { getStatusColor } from "@/src/utils"
import { Image } from "expo-image"
import { Text, View } from "react-native"

const OrderItemCard = ({orderItem}: {orderItem: OrderItemType}) => {
    console.log(orderItem.coverUrl)
        return (
        <View
            style={{
                overflow: "hidden",
                borderRadius: 1,
                elevation: 2,
            }}
            className="flex-row p-3 gap-5 bg-white dark:bg-bookcare-darkCard">
            <View>
                <Image
                    style={{ height: 120, width: 100}}
                    source={{ uri: orderItem.coverUrl }}
                    placeholder={colors.bookCardBlurHash}
                    transition={300}
                    contentFit="cover"
                />
            </View>
            <View className="flex-1 justify-between">
                <View>
                    <Text numberOfLines={2} className="text-lg flex-shrink font-semibold leading-tight text-bookcare-textDark dark:text-bookcare-darkText">
                        {orderItem.title}
                    </Text>
                </View>
                <View>
                    <Text numberOfLines={1} className="text-bookcare-textMuted text-sm">
                        {orderItem.authorName}
                    </Text>
                    <Text className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText">GHS {orderItem.price}</Text>
                    <View className="flex-row justify-between items-end">
                        <Button size="sm" className="bg-bookcare-primary rounded-xl">
                            <ButtonText className="text-white font-bold">
                                Buy Again
                            </ButtonText>
                        </Button>
                        <View className="flex-row gap-5">
                            <Text className="text-xl font-semibold text-bookcare-textMuted">x{orderItem.quantity}</Text>
                            <Text className="text-lg font-bold text-bookcare-textDark dark:text-bookcare-darkText">GHS {orderItem.price * orderItem.quantity}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default OrderItemCard