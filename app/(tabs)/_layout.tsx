import CartBottomModal from "@/src/components/common/CartBottomModal"
import CartBottomSheet from "@/src/components/common/CartSheet"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { useColorScheme } from 'nativewind'

const TabLayout = () => {
    const { colorScheme } = useColorScheme()

    return (
        <>
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#2C1810' : '#FFFFFF',
                    borderTopColor: '#E8D5B7',
                    borderTopWidth: 1,
                    },
                tabBarActiveTintColor: '#5C3D2E',
                tabBarInactiveTintColor: '#8B6F5E',
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