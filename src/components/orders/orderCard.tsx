import { Order, SupabaseOrder } from "@/src/types"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, Text, View } from "react-native"

const OrderCard = ({order}: {order: SupabaseOrder}) => {
    return (
        <Pressable
            style={{
                overflow: "hidden",
                borderRadius: 8,
                elevation: 2,
            }}
            className="flex-row p-4 items-center bg-white dark:bg-bookcare-darkCard"
            >
            <View
                style={{ flex: 1 }}
                className="items-center justify-center"
            >
                <Ionicons name="bag-handle-outline" size={40} color="#8d4a1a" />
            </View>

            <View
                style={{ flex: 2 }}
                className="justify-center gap-1"
            >
                <Text className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText">
                {`#BOOKCARE-${order.id}`}
                </Text>

                <Text className="text-bookcare-textMuted text-xs">
                {order.number_of_books} books
                </Text>

                <Text className="text-sm font-bold text-bookcare-textDark dark:text-bookcare-darkText">
                GHS {order.total_amount}
                </Text>

                <Text className="text-xs text-bookcare-textMuted">
                Ordered on: {order.delivery_date}
                </Text>
            </View>
        </Pressable>
    )
}

export default OrderCard