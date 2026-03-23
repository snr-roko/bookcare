import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import CardPaymentMethodCard from "@/src/components/checkout/cardPaymentMethod"
import MobileMoneyPaymentMethod from "@/src/components/checkout/mobileMoneyCard"
import { colors } from "@/src/constants"
import { useCartStore } from "@/src/store/useCartStore"
import { mobileMoneySelection } from "@/src/types"
import { cn } from "@/src/utils"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const CheckoutScreen = () => {

    const {totalAmount} = useLocalSearchParams<{totalAmount: string}>()

    const [paymentMethod, setPaymentMethod] = useState<"mobileMoney"|"card"|null>(null)
    const [isCompletingPayment, setIsCompletingPayment] = useState<boolean>(false)
    const [mobileMoneySelected, setMobileMoneySelected] = useState<mobileMoneySelection>(null)

    const clearCart = useCartStore((state) => state.clearCart)

    const router = useRouter()

    const completePayment = () => {
        setIsCompletingPayment(true)
        setTimeout(() => {
            setIsCompletingPayment(false)
            clearCart()
            router.replace("/(checkout)/confirmation")
        }, 2000)
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