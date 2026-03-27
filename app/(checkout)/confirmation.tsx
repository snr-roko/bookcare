import { Button, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { useAuthStore } from "@/src/store"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useColorScheme } from "react-native"

const CheckoutConfirmationScreen = () => {

    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    const {orderId, deliveryDate} = useLocalSearchParams<{orderId: string, deliveryDate: string}>()

    const email = useAuthStore((state) => state.session?.user.email)

    const router = useRouter()

    return (
        <SafeAreaView className="flex-1 py-10 px-5 gap-16 bg-bookcare-bg dark:bg-bookcare-bgDark">
            <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-2xl">Thank you for choosing Bookcare</Text>
            <View className="flex-1 items-center gap-10">
                <Ionicons size={96} name="thumbs-up" color={isDark ? colors.primaryDark : colors.primary} />
                <Text className="text-bookcare-subheading dark:text-bookcare-subheadingDark text-3xl">Order Confirmed</Text>
                <Text className="text-lg text-bookcare-text dark:text-bookcare-textDark">Your books will be delivered to you soon</Text>
                <View>
                    <View className="flex-row">
                        <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-2xl">Order: </Text>
                        <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-2xl">{`#BOOKCARE-${orderId}`}</Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-bookcare-muted dark:text-bookcare-mutedDark">Estimated Delivery Date: </Text>
                        <Text className="text-bookcare-muted dark:text-bookcare-mutedDark">{deliveryDate}</Text>
                    </View>
                </View>
                <Text className="text-sm text-bookcare-text dark:text-bookcare-textDark">An Email will be sent to {email} when books are near you.</Text>
                <View className="flex-row gap-5">
                    <Button onPress={() => router.push("/(tabs)/orders")} size="lg" className="bg-bookcare-primary dark:bg-bookcare-primaryDark">
                        <ButtonText className="text-bookcare-whiteSoft">Track Order</ButtonText>
                    </Button>
                    <Button onPress={() => router.push("/(tabs)")} size="lg" className="bg-bookcare-primary dark:bg-bookcare-primaryDark">
                        <ButtonText className="text-bookcare-whiteSoft">Continue Shopping</ButtonText>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CheckoutConfirmationScreen