import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import CardPaymentMethodCard from "@/src/components/checkout/cardPaymentMethod"
import MobileMoneyPaymentMethod from "@/src/components/checkout/mobileMoneyCard"
import { colors } from "@/src/constants"
import { queryClient } from "@/src/lib/queryClient"
import { supabase } from "@/src/lib/supabase"
import { useAuthStore } from "@/src/store"
import { useCartStore } from "@/src/store/useCartStore"
import { CartItemType, mobileMoneySelection, SupabaseOrderItem } from "@/src/types"
import { cn } from "@/src/utils"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { toast } from "sonner-native"


const CheckoutScreen = () => {

    const {totalAmount} = useLocalSearchParams<{totalAmount: string}>()

    const userId = useAuthStore((state) => state.session?.user.id)
    const name = useAuthStore(state => state.session?.user.user_metadata.full_name)

    const [paymentMethod, setPaymentMethod] = useState<"mobileMoney"|"card">("mobileMoney")
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
                user_id: userId,
                payment_method: paymentMethod!,
            }
        ).select().single()
        if (error) throw new Error(error.message)
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
            work_key: cartItem.itemDetails.id,
            author_key: cartItem.itemDetails.authorKey,
            edition_count: parseInt(cartItem.itemDetails.editionCount),
            year_first_published: cartItem.itemDetails.yearFirstPublished
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
                        toast.success("Order successful")
                    })
                    .catch(error => toast.error(error)))
            .catch(error => toast.error(error))
    }

    return (
        <SafeAreaView className="flex-1 py-10 px-5 gap-14 bg-bookcare-bg dark:bg-bookcare-bgDark">
            <Text className="text-bookcare-heading dark:text-bookcare-headingDark text-3xl">Bookcare Pay</Text>
            <View className="items-center gap-10 flex-1">
                <View className="gap-10 items-center">
                    <Text className="text-2xl text-bookcare-muted dark:text-bookcare-mutedDark">{name}</Text>
                    <Text className="text-4xl text-bookcare-text dark:text-bookcare-textDark">GHS {totalAmount}</Text>
                </View>
                <View className="mt-10 gap-5 justify-center items-center w-full">
                    <View className="gap-5 justify-center items-center">
                        <Text className="text-bookcare-subheading dark:text-bookcare-subheadingDark text-xl">Choose Payment Method</Text>
                        <View className="flex-row justify-center">
                            <Button 
                                className={
                                    cn(
                                        [{"bg-bookcare-primary dark:bg-bookcare-primaryDark": paymentMethod === "mobileMoney",
                                            "bg-bookcare-primary/60 dark:bg-bookcare-primaryDark/60": paymentMethod !== "mobileMoney"}
                                            ])} 
                                size="xl" 
                                onPress={() => setPaymentMethod("mobileMoney")}>
                                <ButtonText className="text-bookcare-whiteSoft">Mobile Money</ButtonText>
                            </Button>
                            <Button
                                className={
                                        cn(
                                            [{"bg-bookcare-primary dark:bg-bookcare-primaryDark": paymentMethod === "card",
                                                "bg-bookcare-primary/60 dark:bg-bookcare-primaryDark/60": paymentMethod !== "card"}
                                                ])} 
                                size="xl" 
                                onPress={() => setPaymentMethod("card")}>
                                <ButtonText className="text-bookcare-whiteSoft">Card</ButtonText>
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
                                            [{"bg-bookcare-primary dark:bg-bookcare-primaryDark": paymentMethod !== null,
                                                "bg-bookcare-primary/60 dark:bg-bookcare-primaryDark/60": paymentMethod === null}
                                                ])}>
                            {isCompletingPayment ? <ButtonSpinner color={colors.whiteSoft} /> :<ButtonText className="text-bookcare-whiteSoft text-lg font-bold">Complete Payment</ButtonText>}
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default CheckoutScreen