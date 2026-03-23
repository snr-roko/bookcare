import { Button, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { mobileMoneyCardType, mobileMoneySelection } from "@/src/types"
import { cn } from "@/src/utils"
import { Text, TextInput, View } from "react-native"

const MobileMoneyPaymentMethod = (mobileMoneyCard: mobileMoneyCardType) => {

    const selectMobileMoneyMethod = (mobileMoney : mobileMoneySelection) => {
        mobileMoneyCard.setMobileMoneySelection(mobileMoney)
    }

    return (
        <View className="gap-10">
            <View className="gap-2">
                <Text className="text-lg text-bookcare-textDark dark:text-bookcare-darkText">Select Network</Text>
                <View className="flex-row gap-5">
                    <Button 
                        variant="outline" 
                        size="xs" 
                        onPress={() => selectMobileMoneyMethod("mtn")}
                        className={cn([
                            "border-bookcare-primary",
                            {
                                "bg-bookcare-primary": mobileMoneyCard.mobileMoneySelection === "mtn",
                            }
                        ])}
                        >
                        <ButtonText
                            className={cn([
                                "text-bookcare-primary",
                                {
                                    "text-bookcare-surface": mobileMoneyCard.mobileMoneySelection === "mtn"
                                }
                            ])}
                        >
                            MTN
                        </ButtonText>
                    </Button>
                    <Button 
                        variant="outline" 
                        size="xs" 
                        onPress={() => selectMobileMoneyMethod("telecel")}
                        className={cn([
                            "border-bookcare-primary",
                            {
                                "bg-bookcare-primary": mobileMoneyCard.mobileMoneySelection === "telecel",
                            }
                        ])}
                        >
                        <ButtonText
                            className={cn([
                            "text-bookcare-primary",
                            {
                                "text-bookcare-surface": mobileMoneyCard.mobileMoneySelection === "telecel"
                            }
                        ])}
                        >
                            Telecel
                        </ButtonText>
                    </Button>
                    <Button 
                        variant="outline" 
                        size="xs" 
                        onPress={() => selectMobileMoneyMethod("airtelTigo")}
                        className={cn([
                            "border-bookcare-primary",
                            {
                                "bg-bookcare-primary": mobileMoneyCard.mobileMoneySelection === "airtelTigo",
                            }
                        ])}
                        >
                        <ButtonText
                            className={cn([
                                "text-bookcare-primary",
                                {
                                    "text-bookcare-surface": mobileMoneyCard.mobileMoneySelection === "airtelTigo"
                                }
                            ])}
                        >
                            AirtelTigo
                        </ButtonText>
                    </Button>
                </View>
            </View>
            <View className="gap-2">
                <Text className="text-lg text-bookcare-textDark dark:text-bookcare-darkText">Number</Text>
                <TextInput
                    inputMode="tel"
                    maxLength={10}
                    placeholderTextColor={colors.textMuted}
                    className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"
                />
            </View>
        </View>
    )
}

export default MobileMoneyPaymentMethod