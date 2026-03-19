import { Button, ButtonText } from "@/components/ui/button"
import CartItemCard from "@/src/components/cart/CartItemCard"
import { useCartStore } from "@/src/store/useCartStore"
import { useRouter } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const CartScreen = () => {
    
    const cart = useCartStore(state => state.cart)

    const router = useRouter()

    const routeToHomepage = () => {
        router.push("/(tabs)")
    }

    return (
        <SafeAreaView className="flex-1 pt-10 px-5 gap-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <Text className="text-bookcare-primary text-3xl">Cart</Text>
            {
                cart.length === 0 ? 
                <View className="gap-2 justify-center flex-1 items-center">
                    <Text className="text-bookcare-textDark dark:text-bookcare-darkText font-bold text-2xl">Your cart is empty</Text>
                    <Text className="text-bookcare-textMuted text-lg">Start adding books you love</Text>
                    <Button onPress={routeToHomepage} size="lg" className="bg-bookcare-primary rounded-xl">
                        <ButtonText className="text-white font-semibold">Browse Books</ButtonText>
                    </Button>
                </View> :
                <View className="flex-1 justify-between">
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-3 pb-3">
                        {
                            cart.map((cartItem) => (
                                <CartItemCard key={cartItem.itemDetails.id} cartItem={cartItem} />
                        ))
                        }
                    </ScrollView>
                    <View className="gap-3">
                        <Text className="text-bookcare-primary text-xl">Summary</Text>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-bookcare-textDark dark:text-bookcare-darkText text-xl">Total Amount: </Text>
                                <Text className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText text-2xl">{cart.reduce((sum, cartItem) => sum + parseInt(cartItem.itemDetails.price) * cartItem.quantity, 0)}</Text>
                            </View>
                        <View className="flex-row justify-between">
                            <Text className="text-bookcare-textDark dark:text-bookcare-darkText text-xl items-center">3% Witholding Tax: </Text>
                            <Text className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText text-2xl">{cart.reduce((sum, cartItem) => sum + parseInt(cartItem.itemDetails.price) * cartItem.quantity, 0) * 0.03}</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-bookcare-textDark dark:text-bookcare-darkText text-xl">Total Amount Payable: </Text>
                            <Text className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText text-2xl">{cart.reduce((sum, cartItem) => sum + parseInt(cartItem.itemDetails.price) * cartItem.quantity, 0) + cart.reduce((sum, cartItem) => sum + parseInt(cartItem.itemDetails.price) * cartItem.quantity, 0) * 0.03}</Text>
                        </View>
                        <Button size="md" className="bg-bookcare-primary">
                            <ButtonText className="text-white text-lg">Checkout</ButtonText>
                        </Button>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

export default CartScreen