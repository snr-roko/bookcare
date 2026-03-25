import { Button, ButtonText } from "@/components/ui/button"
import Skeleton from "@/src/components/common/skeleton"
import OrderItemCard from "@/src/components/orders/orderCardItem"
import { colors } from "@/src/constants"
import { useFetchOrderDetails } from "@/src/hooks"
import { OrderItemType, OrderStatus, SupabaseOrderItem } from "@/src/types"
import { getStatusColor } from "@/src/utils"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const OrderDetailsScreen = () => {

    const router = useRouter()

    const {id, totalAmount, deliveryDate, orderDate, paymentMethod, status} = useLocalSearchParams<{
        id: string,
        numberOfBooks: string,
        totalAmount: string,
        deliveryDate: string,
        orderDate: string,
        userId: string,
        paymentMethod: string,
        status: string
    }>()

    const formattedorderDate = new Date(orderDate).toLocaleString()
    const statusColor = getStatusColor(status as OrderStatus)

    const {data, isLoading, isError, error} = useFetchOrderDetails(parseInt(id))
    if(isError) console.log(error)
    return (
        <SafeAreaView className="flex-1 pt-5 px-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <View className="flex-row items-center gap-5 mb-5">
                <Button className="bg-transparent" variant="link"  onPress={() => router.back()}>
                    <Ionicons size={30} name="arrow-back" color={colors.primary} />
                </Button>
                <Text className="text-bookcare-primary text-3xl">{`#BOOKCARE-${id}`}</Text>
            </View>
            {
                isLoading ? 
                    <View className="gap-5">
                        <Skeleton height={20} width={300} />
                        <Skeleton height={20} width={300} />
                        <Skeleton height={20} width={300} />
                        <Skeleton height={20} width={300} />
                    </View> :
            <View className="flex-1 justify-between gap-3">
                <View>
                    <Text className="text-bookcare-textDark dark:text-bookcare-darkText text-lg">Placed on {formattedorderDate}</Text>
                    <Text className="text-bookcare-textDark dark:text-bookcare-darkText text-lg">Delivery on {deliveryDate}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-3 pb-3">
                    { 
                        data?.map((supabaseOrderItem: SupabaseOrderItem):OrderItemType => ({
                            authorKey: supabaseOrderItem.author_key,
                            authorName: supabaseOrderItem.author_name,
                            coverId: supabaseOrderItem.cover_id,
                            coverUrl: supabaseOrderItem.cover_url,
                            editionCount: supabaseOrderItem.edition_count,
                            orderId: supabaseOrderItem.order_id,
                            price: supabaseOrderItem.price,
                            quantity: supabaseOrderItem.quantity,
                            title: supabaseOrderItem.title,
                            workKey: supabaseOrderItem.work_key,
                            yearFirstPublished: supabaseOrderItem.year_first_published,
                            id: supabaseOrderItem.id
                        })).map((orderItem) => (
                            <OrderItemCard key={orderItem.id} orderItem={orderItem}/>
                    ))
                    } 
                </ScrollView>
                <View className="gap-3 py-5">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-bookcare-textDark dark:text-bookcare-darkText text-xl">Payment Method: </Text>
                        <Text className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText text-2xl">{paymentMethod === "mobileMoney" ? "Mobile Money" : "Card"}</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-bookcare-textDark dark:text-bookcare-darkText text-xl">Total Amount Paid: </Text>
                        <Text className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText text-2xl">{totalAmount}</Text>
                    </View>
                    <Button size="xl" disabled style={{backgroundColor: statusColor}} >
                        <ButtonText>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </ButtonText>
                    </Button>
                </View>
            </View>}
        </SafeAreaView>
    )
}

export default OrderDetailsScreen