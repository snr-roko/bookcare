import { Button, ButtonText } from "@/components/ui/button"
import Skeleton from "@/src/components/common/skeleton"
import OrderCard from "@/src/components/orders/orderCard"
import { useFetchOrders } from "@/src/hooks"
import { useAuthStore } from "@/src/store"
import { FlashList } from "@shopify/flash-list"
import { useRouter } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { RefreshControl } from "react-native"
import { colors } from "@/src/constants"

const OrdersScreen = () => {

    const router = useRouter()
    
    const userId = useAuthStore(state => state.session?.user.id)

    const {data, isLoading, isRefetching, refetch} = useFetchOrders(userId!)

    const routeToHomepage = () => {
        router.push("/(tabs)")
    }

    return (
        <SafeAreaView className="flex-1 py-10 px-5 gap-5 bg-bookcare-bg dark:bg-bookcare-bgDark">
            <Text className="text-bookcare-heading dark:text-bookcare-headingDark text-3xl">Orders</Text>
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
                        <Text className="text-bookcare-text dark:text-bookcare-textDark font-bold text-2xl">No Orders Yet</Text>
                        <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-lg">Add books to your cart to checkout</Text>
                        <Button onPress={routeToHomepage} size="lg" className="bg-bookcare-primary dark:bg-bookcare-primaryDark rounded-xl">
                            <ButtonText className="text-bookcare-whiteSoft font-semibold">Browse Books</ButtonText>
                        </Button>
                    </View> :
                    <FlashList
                        data={data}
                        renderItem={({item}) => (<OrderCard order={item} />)}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 16}} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefetching}
                                onRefresh={refetch}
                                tintColor={colors.primary}
                                colors={[colors.primary]}
                            />
                        }
                    />
            }
        </SafeAreaView>
    )
}

export default OrdersScreen