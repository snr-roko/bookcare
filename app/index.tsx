import * as SplashScreen from "expo-splash-screen"
import { SafeAreaView } from "react-native-safe-area-context"

SplashScreen.hideAsync()

const Index = () => {
    return (
        <SafeAreaView className="bg-bookcare-cream dark:bg-bookcare-darkBg"></SafeAreaView>
    )
}

export default Index