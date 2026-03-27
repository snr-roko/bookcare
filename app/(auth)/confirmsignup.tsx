import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { supabase } from "@/src/lib/supabase"
import { cn } from "@/src/utils"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"
import {useRef, useState } from "react"
import { Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useColorScheme } from "react-native"

const ConfirmSignUpScreen = () => {

    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    const {email} = useLocalSearchParams<{email: string}>()
    const router = useRouter()

    const [isVerifying, setIsverifying] = useState<boolean>(false)
    const [errorVerifying, setErrorVerifying] = useState<string | null>(null)

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const ref0 = useRef<TextInput>(null)
    const ref1 = useRef<TextInput>(null)
    const ref2 = useRef<TextInput>(null)
    const ref3 = useRef<TextInput>(null)
    const ref4 = useRef<TextInput>(null)
    const ref5 = useRef<TextInput>(null)

    const inputRefs = [ref0, ref1, ref2, ref3, ref4, ref5]

    const handleChange = (digit: string, index: number) => {
            const newOtp = [...otp]
            newOtp[index] = digit
            setOtp(newOtp)
            
            if (digit && index < 5) {
                inputRefs[index + 1].current?.focus()
        }
    }

    const handleKeyPress = (keyPressed: string, index: number) => {
        if (keyPressed === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    const isComplete = otp.every((digit) => digit !== "")

    const handleVerification = async () => {
        if (isComplete) {
            try{
                setIsverifying(true)
                const {data: {session}, error} = await supabase.auth.verifyOtp({
                    type: "email",
                    email,
                    token: otp.join("")
            })

           if (!session) {
                        console.log("error: ", error?.message)
                        setErrorVerifying(error?.message ?? "Verification failed")
                        setTimeout(() => {
                            setErrorVerifying(null)
                        }, 3000)
                        return
                    }
            
            router.push("/(tabs)/explore")
        } catch(error) {
            console.log("Error Verifying token" , error)
                    setErrorVerifying("Something went wrong, Try Again")
                        setTimeout(() => {
                            setErrorVerifying(null)
                        }, 3000)

        } finally {
            setIsverifying(false)
            setOtp(['', '', '', '', '', ''])
            inputRefs[0].current?.focus()
        }
        }
    }
    
    return (
        <SafeAreaView className="py-20 px-5 flex-1 gap-10 bg-bookcare-bg dark:bg-bookcare-bgDark">
            <Text className="text-bookcare-heading dark:text-bookcare-headingDark text-3xl">Check your email</Text>
            {errorVerifying && (
                    <View className="flex-row gap-2 items-center p-3 bg-bookcare-error dark:bg-bookcare-errorDark">
                        <Ionicons name="warning-outline" color={isDark ? colors.textDark : colors.text} />
                        <Text className="text-bookcare-text dark:text-bookcare-textDark">{errorVerifying}</Text>
                    </View>
                )}
            <View>
                <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-lg">We sent a six digit code to </Text>
                <Text className="text-bookcare-text dark:text-bookcare-textDark text-xl">{email}</Text>
            </View>  
            <View className="flex-row px-2 gap-3">
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                        maxLength={1}
                        inputMode="numeric"
                        textContentType="oneTimeCode"
                        style={{ width: 48, height: 56, textAlign: 'center' }}
                         className="border rounded-lg border-bookcare-border dark:border-bookcare-borderDark 
                            text-bookcare-text dark:text-bookcare-textDark bg-bookcare-surface 
                            dark:bg-bookcare-surfaceDark text-xl font-bold"
                        ref={inputRefs[index]}
                    />
                    ))}                     
            </View>
            <Button disabled={!isComplete} onPress={handleVerification}  className={cn([ 
                {
                    "bg-bookcare-primary dark:border-bookcare-primaryDark": isComplete,
                    "bg-bookcare-primary/50 dark:bg-bookcare-primaryDark/50": !isComplete
                }
            ]) } size="xl">
                {isVerifying ? <ButtonSpinner color={colors.whiteSoft} /> : <ButtonText size="xl" className="text-bookcare-whiteSoft">Verify</ButtonText>}
            </Button>
        </SafeAreaView>
    )
}

export default ConfirmSignUpScreen
