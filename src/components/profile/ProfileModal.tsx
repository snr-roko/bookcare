import { Button, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { supabase } from "@/src/lib/supabase"
import { useAuthStore, useThemeStore } from "@/src/store"
import { ThemeMode } from "@/src/types"
import { cn } from "@/src/utils"
import { BlurView } from "expo-blur"
import React from "react"
import { Alert, Modal, Text, TextInput, View } from "react-native"

const ProfileModal = ({isOpen, setIsOpen}:{isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    
    const setTheme = useThemeStore(state => state.setMode)
    const mode = useThemeStore(state => state.mode)

    const name = useAuthStore(state => state.session?.user.user_metadata.full_name)

    const logoutUser = async() => {
        await supabase.auth.signOut()
    }

    const alertUserOfLogout = () => {
        Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
            { text: 'Cancel', style: 'cancel', isPreferred: true },
            { text: 'Logout', style: 'destructive', onPress: logoutUser},
            
  ])}

    const changeTheme = (mode: ThemeMode) => {
        setTheme(mode)
    }
    
    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="slide"
            onRequestClose={() => setIsOpen(false)}
            style={{backgroundColor: "transparent", flex: 1}}
        >
            <BlurView
                intensity={20}
                tint="regular"
                style={{ flex: 1 }}
                onTouchEnd={() => setIsOpen(false)}
            />

            <View 
                className="bg-bookcare-surface p-5 gap-5 pb-5"
                style={{
                    borderTopWidth: 2,
                    borderTopColor: colors.mid,
                    flex: 3
                }}
                >
                <Text className="text-2xl text-bookcare-primary font-bold text-center">Profile</Text>
                <View className="gap-5">
                    <View>

                    </View>
                    <View className="gap-3">
                        <Text className="font-semibold text-xl text-bookcare-textDark dark:text-bookcare-darkText">Full Name</Text>
                        <TextInput
                            inputMode="text"
                            value={name}
                            editable={false}
                            className="text-xl p-4 border border-bookcare-mid rounded-sm h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"         
                        />
                    </View>
                    <View className="gap-3">
                        <Text className="font-semibold text-xl text-bookcare-textDark dark:text-bookcare-darkText">Change Theme</Text>
                        <View className="flex-row justify-center gap-10">
                            <Button 
                                onPress={() => changeTheme("light")} 
                                size="lg"
                                className={cn([
                                    {
                                        "bg-bookcare-textMuted": mode !== "light",
                                        "bg-bookcare-primary": mode === "light"
                                    }
                                ])}
                                >
                                <ButtonText>Light</ButtonText>
                            </Button>
                            <Button 
                                onPress={() => changeTheme("dark")} 
                                size="lg"
                                className={cn([
                                    {
                                        "bg-bookcare-textMuted": mode !== "dark",
                                        "bg-bookcare-primary": mode === "dark"
                                    }
                                ])}
                                >
                                <ButtonText>Dark</ButtonText>
                            </Button>
                            <Button 
                                onPress={() => changeTheme("system")} 
                                size="lg"
                                className={cn([
                                    {
                                        "bg-bookcare-textMuted": mode !== "system",
                                        "bg-bookcare-primary": mode === "system"
                                    }
                                ])}
                                >
                                <ButtonText>System</ButtonText>
                            </Button>
                        </View>
                    </View>
                    <View>
                        <Button size="lg" className="bg-bookcare-error" onPress={alertUserOfLogout}>
                            <ButtonText className="text-bookcare-surface font-semibold text-xl">Logout</ButtonText>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ProfileModal