import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { supabase } from "@/src/lib/supabase"
import { cn } from "@/src/utils"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router"
import {useEffect, useRef, useState } from "react"
import { Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const ConfirmSignUpScreen = () => {

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
        <SafeAreaView className="py-20 px-5 flex-1 gap-10 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <Text className="text-bookcare-primary text-3xl">Check your email</Text>
            {errorVerifying && (
                    <View className="flex-row gap-2 items-center p-3 bg-bookcare-error">
                        <Ionicons name="warning-outline" color={colors.darkText} />
                        <Text className="text-bookcare-darkText">{errorVerifying}</Text>
                    </View>
                )}
            <View>
                <Text className="text-bookcare-textMuted text-lg">We sent a six digit code to </Text>
                <Text className="text-bookcare-textDark dark:text-bookcare-darkText text-xl">{email}</Text>
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
                         className="border rounded-lg border-bookcare-mid text-bookcare-textDark 
                             dark:text-bookcare-darkText bg-bookcare-surface 
                             dark:bg-bookcare-darkSurface text-xl font-bold"
                        ref={inputRefs[index]}
                    />
                    ))}                     
            </View>
            <Button disabled={!isComplete} onPress={handleVerification}  className={cn([ 
                {
                    "bg-bookcare-primary": isComplete,
                    "bg-bookcare-primary/50": !isComplete
                }
            ]) } size="xl">
                {isVerifying ? <ButtonSpinner color={colors.darkText} /> : <ButtonText size="xl" className="text-bookcare-darkText">Verify</ButtonText>}
            </Button>
        </SafeAreaView>
    )
}

export default ConfirmSignUpScreen
