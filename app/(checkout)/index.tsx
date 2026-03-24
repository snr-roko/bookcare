import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import CardPaymentMethodCard from "@/src/components/checkout/cardPaymentMethod"
import MobileMoneyPaymentMethod from "@/src/components/checkout/mobileMoneyCard"
import { colors } from "@/src/constants"
import { queryClient } from "@/src/lib/queryClient"
import { supabase } from "@/src/lib/supabase"
import { useAuthStore } from "@/src/store"
import { useCartStore } from "@/src/store/useCartStore"
import { CartItemType, mobileMoneySelection, OrderItemType, SupabaseOrderItem } from "@/src/types"
import { cn } from "@/src/utils"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const CheckoutScreen = () => {

    const {totalAmount} = useLocalSearchParams<{totalAmount: string}>()

    const userId = useAuthStore((state) => state.session?.user.id)

    const [paymentMethod, setPaymentMethod] = useState<"mobileMoney"|"card"|null>(null)
    const [isCompletingPayment, setIsCompletingPayment] = useState<boolean>(false)
    const [mobileMoneySelected, setMobileMoneySelected] = useState<mobileMoneySelection>("airtelTigo")

    const clearCart = useCartStore((state) => state.clearCart)
    const cart = useCartStore((state) => state.cart)

    const createOrder = async () => {
        const deliveryDate = new Date()
        deliveryDate.setDate(deliveryDate.getDate() + 2)
        const deliveryDateString = deliveryDate.toISOString().split("T")[0]
        const {data, error} = await supabase.from("Order").insert(
            {
                number_of_books: cart.reduce((prev, curr) => prev + curr.quantity, 0),
                total_amount: totalAmount,
                delivery_date: deliveryDateString,
                user_id: userId
            }
        ).select().single()
        if (error) throw new Error(error.message)
        console.log(data)
        return [data.id, data.delivery_date]
    }

    const createOrderItems = async (cartItems: CartItemType[], orderId: number) => {

        const orderItems: SupabaseOrderItem[] = cartItems.map((cartItem) => ({
            author_name: cartItem.itemDetails.authorName,
            cover_url: cartItem.itemDetails.coverUrl,
            order_id: orderId,
            price: parseInt(cartItem.itemDetails.price),
            quantity: cartItem.quantity,
            title: cartItem.itemDetails.title,
            payment_method: paymentMethod!
        }) ) 
        const {error} = await supabase.from("OrderItem").insert(
            orderItems
        )
        if (error) throw new Error(error.message)
    }

    const router = useRouter()

    const completePayment = () => {
        setIsCompletingPayment(true)
        createOrder()
            .then(([orderId, deliveryDate]) => 
                createOrderItems(cart, orderId)
                    .then(() => {
                        setIsCompletingPayment(false)
                        clearCart()
                        queryClient.invalidateQueries({queryKey: ["orders", "user", userId]})
                        router.replace({
                            pathname: "/(checkout)/confirmation",
                            params: {
                                orderId,
                                deliveryDate
                            }
                        })
                    })
                    .catch(error => console.error(error)))
            .catch(error => console.error(error))
    }

    return (
        <SafeAreaView className="flex-1 py-10 px-5 gap-14 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <Text className="text-bookcare-primary text-3xl">Bookcare Pay</Text>
            <View className="items-center gap-10 flex-1">
                <View className="gap-10">
                    <Text className="text-2xl text-bookcare-textMuted">Rabbi Agyei</Text>
                    <Text className="text-2xl text-bookcare-textDark dark:text-bookcare-darkText">GHS {totalAmount}</Text>
                </View>
                <View className="mt-10 gap-5 justify-center items-center w-full">
                    <View className="gap-5 justify-center items-center">
                        <Text className="text-bookcare-primary text-xl">Choose Payment Method</Text>
                        <View className="flex-row justify-center">
                            <Button 
                                className={
                                    cn(
                                        [{"bg-bookcare-primary": paymentMethod === "mobileMoney",
                                            "bg-bookcare-textMuted": paymentMethod !== "mobileMoney"}
                                            ])} 
                                size="xl" 
                                onPress={() => setPaymentMethod("mobileMoney")}>
                                <ButtonText>Mobile Money</ButtonText>
                            </Button>
                            <Button
                                className={
                                        cn(
                                            [{"bg-bookcare-primary": paymentMethod === "card",
                                                "bg-bookcare-textMuted": paymentMethod !== "card"}
                                                ])} 
                                size="xl" 
                                onPress={() => setPaymentMethod("card")}>
                                <ButtonText>Card</ButtonText>
                            </Button>
                        </View>
                    </View>
                    {
                        paymentMethod === "mobileMoney" && <MobileMoneyPaymentMethod mobileMoneySelection={mobileMoneySelected} setMobileMoneySelection={setMobileMoneySelected} />
                    }
                    {
                        paymentMethod === "card" && <CardPaymentMethodCard />
                    }
                </View>
                <Button 
                    onPress={completePayment} 
                    disabled={paymentMethod === null} size="xl" 
                    className={
                                        cn(
                                            [{"bg-bookcare-primary": paymentMethod !== null,
                                                "bg-bookcare-textMuted": paymentMethod === null}
                                                ])}>
                            {isCompletingPayment ? <ButtonSpinner color={colors.darkText} /> :<ButtonText className="text-white text-lg font-bold">Complete Payment</ButtonText>}
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default CheckoutScreen