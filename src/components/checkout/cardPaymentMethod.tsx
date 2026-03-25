import { colors } from "@/src/constants"
import { Text, TextInput, View } from "react-native"

const CardPaymentMethodCard = () => {
    return (
        <View className="w-full gap-5">
            <View className="gap-3">
                <Text className="text-lg text-bookcare-textDark dark:text-bookcare-darkText">Name on Card</Text>
                <TextInput
                    inputMode="text"
                    value="John Doe"
                    editable={false}
                    className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"         
                />
            </View>
            <View className="gap-3">
                <Text className="text-lg text-bookcare-textDark dark:text-bookcare-darkText">Card Number</Text>
                <TextInput
                    inputMode="numeric"
                    value="4444-4444-4444-4444"
                    editable={false}
                    className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"         
                />
            </View>
            <View className="flex-row gap-5">
                <View className="gap-3 flex-1">
                    <Text className="text-lg text-bookcare-textDark dark:text-bookcare-darkText">CVV</Text>
                    <TextInput
                        maxLength={3}
                        inputMode="numeric"
                        value="444"
                        editable={false}
                        className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"         
                    />  
                </View>
                <View className="gap-3 flex-1">
                    <Text className="text-lg text-bookcare-textDark dark:text-bookcare-darkText">Expiry</Text>
                    <TextInput
                        inputMode="text"
                        editable={false}
                        value="12/28"
                        className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"         
                    />  
                </View>
            </View>
        </View>
    )
}

export default CardPaymentMethodCard