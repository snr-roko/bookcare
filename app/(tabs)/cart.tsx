import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import CartItemCard from "@/src/components/cart/CartItemCard"
import { colors } from "@/src/constants"
import { useCartStore } from "@/src/store/useCartStore"
import { calculateDeliveryFee, calculateSubTotal, calculateTotalAmount } from "@/src/utils"
import { useRouter } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const CartScreen = () => {

    const [checkoutloading, setCheckoutLoading] = useState<boolean>(false) 
    
    const cart = useCartStore(state => state.cart)

    const router = useRouter()

    const routeToHomepage = () => {
        router.push("/(tabs)")
    }
    
    const subTotal = calculateSubTotal(cart)
    const deliveryFee = calculateDeliveryFee(parseInt(subTotal))
    const totalAmountPayable = calculateTotalAmount(parseInt(subTotal), parseInt(deliveryFee))
    
    const checkout = () => {
        setCheckoutLoading(true)
        setTimeout(() => {
            setCheckoutLoading(false)
            router.push({
                pathname: "/(checkout)",
                params: {
                    "totalAmount": totalAmountPayable
                }
            })
        }, 2000)
    }

    return (
        <SafeAreaView className="flex-1 pt-10 px-5 gap-5 bg-bookcare-bg dark:bg-bookcare-bgDark">
            <Text className="text-bookcare-heading dark:text-bookcare-headingDark text-3xl">Cart</Text>
            {
                cart.length === 0 ? 
                <View className="gap-2 justify-center flex-1 items-center">
                    <Text className="text-bookcare-text dark:text-bookcare-textDark font-bold text-2xl">Your cart is empty</Text>
                    <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-lg">Start adding books you love</Text>
                    <Button onPress={routeToHomepage} size="lg" className="bg-bookcare-primary dark:bg-bookcare-primaryDark rounded-xl">
                        <ButtonText className="text-bookcare-whiteSoft font-semibold">Browse Books</ButtonText>
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
                        <Text className="text-bookcare-subheading dark:text-bookcare-subheadingDark text-xl">Summary</Text>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-bookcare-text dark:text-bookcare-textDark text-xl">Sub Total: </Text>
                                <Text className="font-semibold text-bookcare-text dark:text-bookcare-textDark text-2xl">{subTotal}</Text>
                            </View>
                        <View className="flex-row justify-between">
                            <Text className="text-bookcare-text dark:text-bookcare-textDark text-xl items-center">Delivery Fee: </Text>
                            <Text className="font-semibold text-bookcare-text dark:text-bookcare-textDark text-2xl">{deliveryFee}</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-bookcare-text dark:text-bookcare-textDark text-xl">Total Amount Payable: </Text>
                            <Text className="font-semibold text-bookcare-text dark:text-bookcare-textDark text-2xl">{totalAmountPayable}</Text>
                        </View>
                        <Button onPress={checkout} size="lg" className="bg-bookcare-primary dark:bg-bookcare-primaryDark">
                            {checkoutloading ? <ButtonSpinner color={colors.whiteSoft} /> :<ButtonText className="text-bookcare-whiteSoft text-lg font-bold">Checkout</ButtonText>}
                        </Button>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

export default CartScreen