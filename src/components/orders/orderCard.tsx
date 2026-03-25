import { Order, SupabaseOrder } from "@/src/types"
import { deriveOrderStatus, getStatusColor } from "@/src/utils"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Pressable, Text, View } from "react-native"

const OrderCard = ({order}: {order: SupabaseOrder}) => {
    
    const router = useRouter()

    const status = deriveOrderStatus(order.order_date, order.delivery_date)
    const statusColor = getStatusColor(status)

    const routeToOrderDetailsScreen = () => {
        router.push({
            pathname: `(orders)/[id]`,
            params: {
                id: String(order.id),
                numberOfBooks: String(order.number_of_books),
                totalAmount: String(order.total_amount),
                deliveryDate: order.delivery_date,
                orderDate: order.order_date,
                userId: order.user_id,
                paymentMethod: order.payment_method,
                status
            }
        })
    }

    return (
        <Pressable
            onPress={routeToOrderDetailsScreen}
            style={{
                overflow: "hidden",
                borderRadius: 8,
                elevation: 2,
            }}
            className="flex-row p-4 gap-3 items-center bg-white dark:bg-bookcare-darkCard"
            >
            <View
                style={{ flex: 1 }}
                className="items-center justify-center"
            >
                <Ionicons name="bag-handle-outline" size={40} color={statusColor} />
                <Text style={{ color: statusColor }}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
            </View>

            <View
                style={{ flex: 2 }}
                className="justify-center gap-1"
            >
                <Text className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText">
                {`#BOOKCARE-${order.id}`}
                </Text>

                <Text className="text-bookcare-textMuted text-xs">
                {order.number_of_books} book(s)
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