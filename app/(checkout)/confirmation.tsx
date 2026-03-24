import { Button, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { useAuthStore } from "@/src/store"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const CheckoutConfirmationScreen = () => {

    const {orderId, deliveryDate} = useLocalSearchParams<{orderId: string, deliveryDate: string}>()

    const email = useAuthStore((state) => state.session?.user.email)

    const router = useRouter()

    return (
        <SafeAreaView className="flex-1 py-10 px-5 gap-16 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <Text className="text-bookcare-textMuted text-2xl">Thank you for choosing Bookcare</Text>
            <View className="flex-1 items-center gap-10">
                <Ionicons size={96} name="thumbs-up" color={colors.primary} />
                <Text className="text-bookcare-primary text-3xl">Order Confirmed</Text>
                <Text className="text-lg text-bookcare-textDark dark:text-bookcare-darkText">Your books will be delivered to you soon</Text>
                <View>
                    <View className="flex-row">
                        <Text className="text-bookcare-textMuted text-2xl">Order: </Text>
                        <Text className="text-bookcare-textMuted text-2xl">{`#BOOKCARE-${orderId}`}</Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-bookcare-textMuted">Estimated Delivery Date: </Text>
                        <Text className="text-bookcare-textMuted">{deliveryDate}</Text>
                    </View>
                </View>
                <Text className="text-sm text-bookcare-textDark dark:text-bookcare-darkText">An Email will be sent to {email} when books are near you.</Text>
                <View className="flex-row gap-5">
                    <Button onPress={() => router.push("/(tabs)/orders")} size="lg" className="bg-bookcare-primary">
                        <ButtonText className="text-bookcare-surface">Track Order</ButtonText>
                    </Button>
                    <Button onPress={() => router.push("/(tabs)")} size="lg" className="bg-bookcare-primary">
                        <ButtonText className="text-bookcare-surface">Continue Shopping</ButtonText>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CheckoutConfirmationScreen