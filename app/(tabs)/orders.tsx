import { Button, ButtonText } from "@/components/ui/button"
import Skeleton from "@/src/components/common/skeleton"
import OrderCard from "@/src/components/orders/orderCard"
import { useFetchOrders } from "@/src/hooks"
import { useAuthStore } from "@/src/store"
import { useRouter } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const OrdersScreen = () => {

    const router = useRouter()
    
    const userId = useAuthStore(state => state.session?.user.id)

    const {data, isLoading} = useFetchOrders(userId!)

    const routeToHomepage = () => {
        router.push("/(tabs)")
    }

    return (
        <SafeAreaView className="flex-1 py-10 px-5 gap-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <Text className="text-bookcare-primary text-3xl">Orders</Text>
            {
                isLoading ? 
                    <View className="gap-5">
                        <Skeleton height={20} width={300} />
                        <Skeleton height={20} width={300} />
                        <Skeleton height={20} width={300} />
                        <Skeleton height={20} width={300} />
                    </View> :
                    data?.length === 0 ? 
                    <View className="gap-2 justify-center flex-1 items-center">
                        <Text className="text-bookcare-textDark dark:text-bookcare-darkText font-bold text-2xl">No Orders Yet</Text>
                        <Text className="text-bookcare-textMuted text-lg">Add books to your cart to checkout</Text>
                        <Button onPress={routeToHomepage} size="lg" className="bg-bookcare-primary rounded-xl">
                            <ButtonText className="text-white font-semibold">Browse Books</ButtonText>
                        </Button>
                    </View> :
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-3 pb-3 flex-1">
                        {
                            data?.map((order) => (
                                <OrderCard key={order.id} order={order} />
                        ))
                        }
                    </ScrollView>
            }
        </SafeAreaView>
    )
}

export default OrdersScreen