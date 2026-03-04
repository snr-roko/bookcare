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

const LoginScreen = () => {

    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [errorLoggingIn, setErrorLoggingIn] = useState<string | null>(null)

    const {control, handleSubmit, reset} = useForm<LoginFormType>({
        defaultValues: {
            "email": "",
            "password": ""
        },
        mode: "onSubmit",
        resolver: zodResolver(LoginSchema)
    })

    const logintoSupabase = async (email: string, password: string) => {
        try{
            setIsLoggingIn(true)
            const response = await supabase.auth.signInWithPassword({email, password})
            console.log(response)
            const {data: {session}} = response
            if (!session) {
                setErrorLoggingIn("Username or Password is incorrect")
                setTimeout(() => {
                    setErrorLoggingIn(null)
                }, 3000)
            }
        } catch(error) {
            console.log(error)
        } finally {
            setIsLoggingIn(false)
            reset()
        }
    }

    return (
        <SafeAreaView className="flex-1 py-20 px-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <KeyboardAvoidingView className="gap-10 flex-1" behavior="height">
                <View>
                    <Text className="text-bookcare-textMuted text-2xl ">Welcome Back</Text>
                    <Text className="text-bookcare-primary text-3xl">Login to Bookcare</Text>
                </View>
                {errorLoggingIn && (
                    <View className="flex-row gap-2 items-center p-3 bg-bookcare-error">
                        <Ionicons name="alert-circle-sharp" color={colors.darkText} />
                        <Text className="text-bookcare-darkText">{errorLoggingIn}</Text>
                    </View>
                )}
                <Controller
                    name="email"
                    control={control}
                    render={({field, fieldState}) => {
                        return (
                            <View className="gap-2">
                                <Text className="text-xl text-bookcare-textDark dark:text-bookcare-darkText" >Email</Text>
                                <TextInput
                                        inputMode="email"
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        placeholder="john.doe@bookcare.com"
                                        placeholderTextColor={colors.textMuted}
                                        className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText"         
                                    />
                                
                                <Text className="text-bookcare-textMuted">A valid email should have @ and .com/.org</Text>
                                {fieldState.error && ( 
                                    <View className="flex-row items-center gap-1">
                                        <Ionicons name="alert-circle-outline" color={colors.error} />
                                        <Text className="text-bookcare-error">{fieldState.error.message}</Text>
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
                                <Text className="text-xl text-bookcare-textDark dark:text-bookcare-darkText" >Password</Text>
                                <TextInput
                                        secureTextEntry={true}                                        
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        placeholder="********************"
                                        placeholderTextColor={colors.textMuted}
                                        className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText"         
                                    />
                                
                                <Text className="text-bookcare-textMuted">Password should be atleast 8 characters</Text>
                                {fieldState.error && ( 
                                    <View className="flex-row items-center gap-1">
                                        <Ionicons name="alert-circle-outline" color={colors.error} />
                                        <Text className="text-bookcare-error">{fieldState.error.message}</Text>
                                    </View>
                                )
                                }
                                <Button variant="link" className="self-end"><ButtonText className="text-bookcare-textMuted">Forgot Password?</ButtonText></Button>
                            </View>
                        )
                    }}
                />
                <Button className="bg-bookcare-primary" size="xl" onPress={handleSubmit(({email, password}) => {logintoSupabase(email, password)})}>
                    {isLoggingIn ? <ButtonSpinner color={colors.darkText} /> : <ButtonText size="xl" className="text-bookcare-darkText">Login</ButtonText>}
                </Button>
                <Button variant="link"><ButtonText className="text-bookcare-textMuted">Don't have an account? Register</ButtonText></Button>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen