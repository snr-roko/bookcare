import {View} from "react-native"
import { colors } from "@/src/constants"
import Animated, {useSharedValue, withRepeat, withTiming, useAnimatedStyle} from "react-native-reanimated"
import { useEffect } from "react"

const Skeleton = ({
    width, 
    height,
    borderRadius = 8
}: {width: number, height: number, borderRadius?: number}) => {
    const opacity = useSharedValue(1)

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(0.3, {duration: 800}),
            -1,
            true
        )
    }, [])

     const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
     }))

     return (
        <Animated.View 
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: colors.mid
                },
                animatedStyle
            ]}
        />
     )
}

export default Skeleton