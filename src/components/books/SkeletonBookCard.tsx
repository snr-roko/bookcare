import { View } from "react-native"
import Skeleton from "../common/skeleton"
import { colors } from "@/src/constants"
import { memo } from "react"
import { useColorScheme } from "react-native"

const SkeletonBookCard = memo(
    () => {

    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"    
    
    return (
        <View 
            style={{
                height: 270,
                width: 150,
                paddingBottom: 2,
                borderRadius: 1,
                shadowRadius: 1,
                elevation: 2,
                backgroundColor: isDark ? colors.surfaceDark : colors.surface
                }}
            >

            <Skeleton height={185} width={150} borderRadius={12} />

            <View style={{ height: 85, width: 150, paddingHorizontal: 4, paddingVertical: 6, justifyContent: "space-between"}}>
                <Skeleton width={100} height={10} />
                <Skeleton width={75} height={10} />
                <View>
                    <Skeleton width={50} height={10} />
                    <View className="flex-row justify-between mt-1 items-center">
                        <Skeleton width={50} height={10} />
                        <Skeleton width={50} height={10} />
                    </View>
                </View>
            </View>
        
        </View>)
}
)

export default SkeletonBookCard