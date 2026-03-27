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
                <Text className="text-lg text-bookcare-text dark:text-bookcare-textDark">Select Network</Text>
                <View className="flex-row gap-5">
                    <Button 
                        variant="outline" 
                        size="xs" 
                        onPress={() => selectMobileMoneyMethod("mtn")}
                        className={cn([
                            "border-bookcare-border dark:border-bookcare-borderDark",
                            {
                                "bg-bookcare-primary dark:bg-bookcare-primaryDark": mobileMoneyCard.mobileMoneySelection === "mtn",
                            }
                        ])}
                        >
                        <ButtonText
                            className={cn([
                                "text-bookcare-text dark:text-bookcare-textDark",
                                {
                                    "text-bookcare-whiteSoft": mobileMoneyCard.mobileMoneySelection === "mtn"
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
                            "border-bookcare-border dark:border-bookcare-borderDark",
                            {
                                "bg-bookcare-primary dark:bg-bookcare-primaryDark": mobileMoneyCard.mobileMoneySelection === "telecel",
                            }
                        ])}
                        >
                        <ButtonText
                            className={cn([
                            "text-bookcare-text dark:text-bookcare-textDark",
                            {
                                "text-bookcare-whiteSoft": mobileMoneyCard.mobileMoneySelection === "telecel"
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
                            "border-bookcare-border dark:border-bookcare-borderDark",
                            {
                                "bg-bookcare-primary dark:bg-bookcare-primaryDark": mobileMoneyCard.mobileMoneySelection === "airtelTigo",
                            }
                        ])}
                        >
                        <ButtonText
                            className={cn([
                                "text-bookcare-text dark:text-bookcare-textDark",
                                {
                                    "text-bookcare-whiteSoft": mobileMoneyCard.mobileMoneySelection === "airtelTigo"
                                }
                            ])}
                        >
                            AirtelTigo
                        </ButtonText>
                    </Button>
                </View>
            </View>
            <View className="gap-2">
                <Text className="text-lg text-bookcare-text dark:text-bookcare-textDark">Phone Number</Text>
                <TextInput
                    inputMode="tel"
                    editable={false}
                    value="0244 4444 44"
                    className="p-4 border border-bookcare-border dark:border-bookcare-borderDark rounded-sm h-15 text-bookcare-text dark:text-bookcare-textDark bg-bookcare-surface dark:bg-bookcare-surfaceDark"
                />
            </View>
        </View>
    )
}

export default MobileMoneyPaymentMethod