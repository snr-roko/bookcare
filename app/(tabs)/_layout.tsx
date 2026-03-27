import CartBottomModal from "@/src/components/common/CartBottomModal"
import { colors } from "@/src/constants"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"

const TabLayout = () => {

    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    return (
        <>
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: isDark ? colors.surfaceDark : colors.surface,
                    borderTopColor: isDark ? colors.borderDark : colors.border,
                    borderTopWidth: 1
                    },
                    tabBarActiveTintColor: isDark ? colors.primaryDark : colors.primary,
                    tabBarInactiveTintColor: isDark ? colors.mutedDark : colors.muted,
            }}
            >
            <Tabs.Screen
                name="index"
                options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="home" size={24} color={color} />
                )
                }}
            />
            <Tabs.Screen
                name="wishlist"
                options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="heart" size={24} color={color} />
                )
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="receipt" size={24} color={color} />
                )
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="bag" size={24} color={color} />
                )
                }}
            />
        </Tabs>
        <CartBottomModal />
        </>
    )
}

export default TabLayout