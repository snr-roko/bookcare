import { KeyboardAvoidingView, Platform, Text, TextInput, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {useForm, Controller} from "react-hook-form"
import { LoginFormType } from "@/src/types"
import {zodResolver} from "@hookform/resolvers/zod"
import { LoginSchema } from "@/src/schemas"
import {Ionicons} from "@expo/vector-icons"
import { colors } from "@/src/constants"
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button"
import { supabase } from "@/src/lib/supabase"
import { useState } from "react"
import { useRouter } from "expo-router"
import { useColorScheme } from "react-native"

const LoginScreen = () => {

    const router = useRouter()

    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)
    const [errorLoggingIn, setErrorLoggingIn] = useState<string | null>(null)

    const {control, handleSubmit, reset} = useForm<LoginFormType>({
        defaultValues: {
            "email": "",
            "password": ""
        },
        mode: "onSubmit",
        resolver: zodResolver(LoginSchema)
    })

    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    const logintoSupabase = async (email: string, password: string) => {
        try{
            setIsLoggingIn(true)
            const {data: {session}, error} = await supabase.auth.signInWithPassword({email, password})
            if (!session) {
                console.log("error: ", error?.message)
                if (error?.code !== "email_not_confirmed") {
                    setErrorLoggingIn(error?.message ?? "Login Failed")
                    setTimeout(() => {
                        setErrorLoggingIn(null)
                    }, 3000)
                } else {
                    const {error} = await supabase.auth.resend({
                                    email,
                                    type: "signup"
                            })
                
                            if (error) {
                                        console.log("error: ", error?.message)
                                        setErrorLoggingIn(error?.message ?? "Verification failed")
                                        setTimeout(() => {
                                            setErrorLoggingIn(null)
                                        }, 3000)
                                        return
                                    }
                            
                            router.push({
                                pathname: "confirmsignup",
                                params: {
                                    email
                                }
                            })
                }
            }
        } catch(error) {
            console.log("Error contacting Auth" , error)
            setErrorLoggingIn("Something went wrong, Try Again")
                setTimeout(() => {
                    setErrorLoggingIn(null)
                }, 3000)
        } finally {
            setIsLoggingIn(false)
            reset()
        }
    }

    return (
        <SafeAreaView className="flex-1 py-20 px-5 bg-bookcare-bg dark:bg-bookcare-bgDark">
            <KeyboardAvoidingView className="gap-10 flex-1" behavior="height">
                <View>
                    <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-2xl ">Welcome Back</Text>
                    <Text className="text-bookcare-heading dark:text-bookcare-headingDark text-3xl">Login to Bookcare</Text>
                </View>
                {errorLoggingIn && (
                    <View className="flex-row gap-2 items-center p-3 bg-bookcare-error dark:bg-bookcare-errorDark">
                        <Ionicons name="warning-outline" color={isDark ? colors.textDark : colors.text} />
                        <Text className="text-bookcare-text dark:text-bookcare-textDark">{errorLoggingIn}</Text>
                    </View>
                )}
                <Controller
                    name="email"
                    control={control}
                    render={({field, fieldState}) => {
                        return (
                            <View className="gap-2">
                                <Text className="text-xl text-bookcare-text dark:text-bookcare-textDark" >Email</Text>
                                <TextInput
                                        inputMode="email"
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        placeholder="john.doe@bookcare.com"
                                        placeholderTextColor={isDark ? colors.mutedDark : colors.muted}
                                        className="p-4 border border-bookcare-border dark:border-bookcare-borderDark rounded-sm h-15 text-bookcare-text dark:text-bookcare-textDark bg-bookcare-surface dark:bg-bookcare-surfaceDark"         
                                    />
                                
                                <Text className="text-bookcare-muted dark:text-bookcare-mutedDark">A valid email should have @ and .com/.org</Text>
                                {fieldState.error && ( 
                                    <View className="flex-row items-center gap-1">
                                        <Ionicons name="alert-circle-outline" color={isDark ? colors.errorDark : colors.error} />
                                        <Text className="text-bookcare-error dark:text-bookcare-errorDark">{fieldState.error.message}</Text>
                                    </View>
                                )
                                }
                            </View>
                        )
                    }}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({field, fieldState}) => {
                        return (
                            <View className="gap-2">
                                <Text className="text-xl text-bookcare-text dark:text-bookcare-textDark" >Password</Text>
                                <TextInput
                                        secureTextEntry={true}                                        
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        placeholder="********************"
                                        placeholderTextColor={isDark ? colors.mutedDark : colors.muted}
                                        className="p-4 border border-bookcare-border dark:border-bookcare-borderDark rounded-sm h-15 text-bookcare-text dark:text-bookcare-textDark bg-bookcare-surface dark:bg-bookcare-surfaceDark"         
                                    />
                                
                                <Text className="text-bookcare-muted dark:text-bookcare-mutedDark">Password should be atleast 8 characters</Text>
                                {fieldState.error && ( 
                                    <View className="flex-row items-center gap-1">
                                        <Ionicons name="alert-circle-outline" color={isDark ? colors.errorDark : colors.error} />
                                        <Text className="text-bookcare-error dark:text-bookcare-errorDark">{fieldState.error.message}</Text>
                                    </View>
                                )
                                }
                                <Button variant="link" className="self-end"><ButtonText className="text-bookcare-muted dark:text-bookcare-mutedDark">Forgot Password?</ButtonText></Button>
                            </View>
                        )
                    }}
                />
                <Button className="bg-bookcare-primary dark:bg-bookcare-primaryDark" size="xl" onPress={handleSubmit(({email, password}) => {logintoSupabase(email, password)})}>
                    {isLoggingIn ? <ButtonSpinner color={colors.whiteSoft} /> : <ButtonText size="xl" className="text-bookcare-whiteSoft">Login</ButtonText>}
                </Button>
                <Button onPress={() => router.push("/signup")} variant="link"><ButtonText className="text-bookcare-muted dark:text-bookcare-mutedDark">Don't have an account? Register</ButtonText></Button>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen