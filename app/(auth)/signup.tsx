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

const SignUpScreen = () => {

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
            const {data: {session}, error} = await supabase.auth.signUp(
            {email: signUpData.email, password: signUpData.password, options: {
                data: {
                    "full_name": signUpData.fullName
                }
            }}
        )
        if (!session) {
                console.log("error: ", error?.message)
                setErrorSigningUp(error?.message ?? "SignUp Failed")
                setTimeout(() => {
                    setErrorSigningUp(null)
                }, 3000)
                return
            }
    } catch(error) {console.log(error)}
    finally {
        setIsSigningUp(false)
        reset()
    }
    }

    return (
        <SafeAreaView className="flex-1 py-20 px-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-5" >
                    <View>
                        <Text className="text-bookcare-textMuted text-xl ">Your Story starts here</Text>
                        <Text className="text-bookcare-primary text-4xl">Join Bookcare</Text>
                    </View>
                    {errorSigningUp && (
                    <View className="flex-row gap-2 items-center p-3 bg-bookcare-error">
                        <Ionicons name="warning-outline" color={colors.darkText} />
                        <Text className="text-bookcare-darkText">{errorSigningUp}</Text>
                    </View>
                )}
                    <Controller
                        name="fullName"
                        control={control}
                        render={({field, fieldState}) => {
                            return (
                                <View className="gap-2">
                                    <Text className="text-xl text-bookcare-textDark dark:text-bookcare-darkText" >Full Name</Text>
                                    <TextInput
                                            inputMode="text"
                                            onChangeText={field.onChange}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            placeholder="John Doe"
                                            placeholderTextColor={colors.textMuted}
                                            className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"
                                        />
                    
                                    <Text className="text-bookcare-textMuted">Please enter your real full name</Text>
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
                                            className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"
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
                                            className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"
                                        />
                    
                                    <Text className="text-bookcare-textMuted">Password should be atleast 8 characters</Text>
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
                        name="confirmPassword"
                        control={control}
                        render={({field, fieldState}) => {
                            return (
                                <View className="gap-2">
                                    <Text className="text-xl text-bookcare-textDark dark:text-bookcare-darkText" >Confirm Password</Text>
                                    <TextInput
                                            secureTextEntry={true}
                                            onChangeText={field.onChange}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            placeholder="********************"
                                            placeholderTextColor={colors.textMuted}
                                            className="p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"
                                        />
                    
                                    <Text className="text-bookcare-textMuted">Passwords should match</Text>
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
                    <Button className="bg-bookcare-primary" size="xl" onPress={handleSubmit((credentials) => {signUpUserToSupabase(credentials)})}>
                        {isSigningUp ? <ButtonSpinner color={colors.darkText} /> : <ButtonText size="xl" className="text-bookcare-darkText">Sign Up</ButtonText>}
                    </Button>
                    <Button onPress={() => router.back()} variant="link"><ButtonText className="text-bookcare-textMuted">Already A Bookcare User? Sign In</ButtonText></Button>
                </ScrollView>
            </SafeAreaView>
    )
}

export default SignUpScreen