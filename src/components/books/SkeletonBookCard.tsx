import { View } from "react-native"
import Skeleton from "../common/skeleton"
import { colors } from "@/src/constants"
import { useColorScheme } from "nativewind"

const SkeletonBookCard = () => {

    const {colorScheme} = useColorScheme()
    return (
        <View 
            style={{
                height: 270,
                width: 150,
                padding: 2,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 5,
                backgroundColor: colorScheme === "dark" ? '#231208' : '#F5EDD8'
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

export default SkeletonBookCard