import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { supabase } from "@/src/lib/supabase"
import { SignUpSchema } from "@/src/schemas"
import { SignUpFormType } from "@/src/types"
import { Ionicons } from "@expo/vector-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { View, Text, TextInput, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useColorScheme } from "react-native"

const SignUpScreen = () => {

    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    const router = useRouter()

    const [isSigningUp, setIsSigningUp] = useState<boolean>(false)
    const [errorSigningUp, setErrorSigningUp] = useState<string | null>(null)

    const {control, reset, handleSubmit} = useForm<SignUpFormType>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        mode: "onSubmit",
        resolver: zodResolver(SignUpSchema)
    })

    const signUpUserToSupabase = async (signUpData: SignUpFormType) => {
        setIsSigningUp(true)
        try{
            const {data, error} = await supabase.auth.signUp(
            {email: signUpData.email, password: signUpData.password, options: {
                data: {
                    "full_name": signUpData.fullName
                }
            }}
        )
            console.log("data: ", data)
            if (error) {
                    console.log("error: ", error?.message)
                    setErrorSigningUp(error?.message ?? "SignUp Failed")
                    setTimeout(() => {
                        setErrorSigningUp(null)
                    }, 3000)
                    return
                }
            
            router.push({
                pathname: "/confirmsignup",
                params: {"email": signUpData.email}
            })
    } catch(error) {console.log(error)}
    finally {
        setIsSigningUp(false)
        reset()
    }
    }

    return (
        <SafeAreaView className="flex-1 py-20 px-5 bg-bookcare-bg dark:bg-bookcare-bgDark">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-5" >
                    <View>
                        <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-xl ">Your Story begins here</Text>
                        <Text className="text-bookcare-heading dark:text-bookcare-headingDark text-4xl">Join Bookcare</Text>
                    </View>
                    {errorSigningUp && (
                    <View className="flex-row gap-2 items-center p-3 bg-bookcare-error dark:bg-bookcare-errorDark">
                        <Ionicons name="warning-outline" color={isDark ? colors.textDark : colors.text} />
                        <Text className="text-bookcare-text dark:text-bookcare-textDark">{errorSigningUp}</Text>
                    </View>
                )}
                    <Controller
                        name="fullName"
                        control={control}
                        render={({field, fieldState}) => {
                            return (
                                <View className="gap-2">
                                    <Text className="text-xl text-bookcare-text dark:text-bookcare-textDark" >Full Name</Text>
                                    <TextInput
                                            inputMode="text"
                                            onChangeText={field.onChange}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            placeholder="John Doe"
                                            placeholderTextColor={isDark ? colors.mutedDark : colors.muted}
                                            className="p-4 border border-bookcare-border dark:border-bookcare-borderDark rounded-sm h-15 text-bookcare-text dark:text-bookcare-textDark bg-bookcare-surface dark:bg-bookcare-surfaceDark"
                                        />
                    
                                    <Text className="text-bookcare-muted dark:text-bookcare-mutedDark">Please enter your real full name</Text>
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
                                </View>
                            )
                        }}
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({field, fieldState}) => {
                            return (
                                <View className="gap-2">
                                    <Text className="text-xl text-bookcare-text dark:text-bookcare-textDark" >Confirm Password</Text>
                                    <TextInput
                                            secureTextEntry={true}
                                            onChangeText={field.onChange}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            placeholder="********************"
                                            placeholderTextColor={isDark ? colors.mutedDark : colors.muted}
                                            className="p-4 border-bookcare-border dark:border-bookcare-borderDark rounded-sm h-15 text-bookcare-text dark:text-bookcare-textDark bg-bookcare-surface dark:bg-bookcare-surfaceDark"
                                        />
                    
                                    <Text className="text-bookcare-muted dark:text-bookcare-mutedDark">Passwords should match</Text>
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
                    <Button className="bg-bookcare-primary dark:bg-bookcare-primaryDark" size="xl" onPress={handleSubmit((credentials) => {signUpUserToSupabase(credentials)})}>
                        {isSigningUp ? <ButtonSpinner color={colors.whiteSoft} /> : <ButtonText size="xl" className="text-bookcare-whiteSoft">Sign Up</ButtonText>}
                    </Button>
                    <Button onPress={() => router.back()} variant="link"><ButtonText className="text-bookcare-muted dark:text-bookcare-mutedDark">Already A Bookcare User? Sign In</ButtonText></Button>
                </ScrollView>
            </SafeAreaView>
    )
}

export default SignUpScreen