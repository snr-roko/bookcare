import { Button, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { supabase } from "@/src/lib/supabase"
import { useAuthStore, useProfileStore, useThemeStore } from "@/src/store"
import { ThemeMode } from "@/src/types"
import { cn } from "@/src/utils"
import { BlurView } from "expo-blur"
import React, { useEffect, useState } from "react"
import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { useColorScheme } from "react-native"

const ProfileModal = ({isOpen, setIsOpen}:{isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    
    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"
    

    const setTheme = useThemeStore(state => state.setMode)
    const mode = useThemeStore(state => state.mode)

    const profileImage = useProfileStore(state => state.profileImage) 
    const setProfileImage = useProfileStore(state => state.setProfileImage)
    const name: string = useAuthStore(state => state.session?.user.user_metadata.full_name)

    const logoutUser = async() => {
        await supabase.auth.signOut()
    }

    const alertUserOfLogout = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
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
    

    const pickImage = async () => {
        const imagePickerPermission = ImagePicker.PermissionStatus
        if (!imagePickerPermission.GRANTED) {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing : true,
            aspect: [1, 1],
            quality: 0.5
        })

        if (!result.canceled) {
            const uri = result.assets[0].uri
            setProfileImage(uri)
            await AsyncStorage.setItem("profile-image", uri)
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('profile-image').then(uri => {
            if (uri) setProfileImage(uri)
        })
    }, [])

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
                className="bg-bookcare-surface dark:bg-bookcare-surfaceDark p-5 gap-5 pb-5"
                style={{
                    borderTopWidth: 2,
                    borderTopColor: isDark ? colors.borderDark : colors.border,
                    flex: 3
                }}
                >
                <Text className="text-2xl text-bookcare-heading dark:text-bookcare-headingDark font-bold text-center">Profile</Text>
                <View className="gap-8">
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        
                        <View style={{ position: 'relative' }}>
                            <Pressable onPress={pickImage}>
                            {profileImage ? (
                                <Image
                                source={{ uri: profileImage }}
                                style={{ width: 120, height: 120, borderRadius: 60 }}
                                contentFit="cover"
                                />
                            ) : (
                                <View style={{
                                width: 120,
                                height: 120,         
                                borderRadius: 60,
                                backgroundColor: isDark ? colors.primaryDark : colors.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                }}>
                                <Text style={{
                                    color: colors.whiteSoft,
                                    fontSize: 56,
                                    fontWeight: 'bold',
                                }}>
                                    {name.charAt(0).toUpperCase()}
                                </Text>
                                </View>
                            )}
                            </Pressable>

                            <Pressable
                            onPress={pickImage}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                backgroundColor: isDark ? colors.primaryDark : colors.primary,
                                borderRadius: 12,
                                padding: 4,
                            }}
                            >
                            <Ionicons name="camera" size={14} color={colors.whiteSoft} />
                            </Pressable>
                        </View>

                        {profileImage && (
                            <Pressable
                            onPress={async () => {
                                setProfileImage(null)
                                await AsyncStorage.removeItem('profile-image')
                            }}
                            className="mt-2"
                            >
                            <Text className="text-bookcare-error dark:text-bookcare-errorDark text-xs">Remove photo</Text>
                            </Pressable>
                        )}

                        </View>
                    <View className="gap-3">
                        <Text className="font-semibold text-xl text-bookcare-text dark:text-bookcare-textDark">Full Name</Text>
                        <TextInput
                            inputMode="text"
                            value={name}
                            editable={false}
                            className="text-xl p-4 border border-bookcare-border dark:border-bookcare-borderDark rounded-sm h-15 text-bookcare-text dark:text-bookcare-textDark bg-bookcare-surface dark:bg-bookcare-surfaceDark"         
                        />
                    </View>
                    <View className="gap-3">
                        <Text className="font-semibold text-xl text-bookcare-text dark:text-bookcare-textDark">Change Theme</Text>
                        <View className="flex-row justify-center gap-10">
                            <Button 
                                onPress={() => changeTheme("light")} 
                                size="lg"
                                className={cn([
                                    {
                                        "bg-bookcare-primary/60 dark:bg-bookcare-primaryDark/60": mode !== "light",
                                        "bg-bookcare-primary dark:bg-bookcare-primaryDark": mode === "light"
                                    }
                                ])}
                                >
                                <ButtonText className="text-bookcare-whiteSoft">Light</ButtonText>
                            </Button>
                            <Button 
                                onPress={() => changeTheme("dark")} 
                                size="lg"
                                className={cn([
                                    {
                                        "bg-bookcare-primary/60 dark:bg-bookcare-primaryDark/60": mode !== "dark",
                                        "bg-bookcare-primary dark:bg-bookcare-primaryDark": mode === "dark"
                                    }
                                ])}
                                >
                                <ButtonText className="text-bookcare-whiteSoft">Dark</ButtonText>
                            </Button>
                            <Button 
                                onPress={() => changeTheme("system")} 
                                size="lg"
                                className={cn([
                                    {
                                        "bg-bookcare-primary/60 dark:bg-bookcare-primaryDark/60": mode !== "system",
                                        "bg-bookcare-primary dark:bg-bookcare-primaryDark": mode === "system"
                                    }
                                ])}
                                >
                                <ButtonText className="text-bookcare-whiteSoft">System</ButtonText>
                            </Button>
                        </View>
                    </View>
                    <View>
                        <Button size="lg" className="bg-bookcare-error dark:bg-bookcare-errorDark" onPress={alertUserOfLogout}>
                            <ButtonText className="text-bookcare-whiteSoft font-semibold text-xl">Logout</ButtonText>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ProfileModal