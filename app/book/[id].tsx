import { Button } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const BookDetailsScreen = () => {

    const {title, coverId, coverUrl, authorName, rating, price, editionCount, yearFirstPublished} = useLocalSearchParams<{
        title: string,
        coverId: string,
        coverUrl: string, 
        authorName: string,
        rating: string,
        price: string,
        editionCount: string,
        yearFirstPublished: string
    }>()

    return (
        <SafeAreaView className="flex-1 py-10 px-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <View className="flex-row gap-5">
                <View style={{overflow: 'hidden', borderRadius: 12, elevation: 2 }}>
                    {parseInt(coverId)  === -1 ? (
                    <View style={{ height: 180, width: 140, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="book" size={48} color={colors.primary} />
                    </View>
                    ) : (
                    <Image
                        style={{ height: 180, width: 140}}
                        source={{ uri: coverUrl }}
                        placeholder={colors.bookCardBlurHash}
                        transition={300}
                        contentFit="cover"
                    />
                    )}
                </View>
                <View className="flex-1 justify-between">
                    <View>
                        <Text numberOfLines={2} className="text-xl flex-shrink font-semibold text-bookcare-textDark dark:text-bookcare-darkText">
                            {title}
                        </Text>
                        <Text numberOfLines={1} className="text-bookcare-textMuted text-lg">
                                {authorName}
                        </Text>
                    </View>
                    <View className="gap-2">
                        <Text className="text-bookcare-textDark dark:text-bookcare-darkText">{`${yearFirstPublished} (${editionCount})`}</Text>
                        <View className="flex-row gap-2 items-center">
                            <View className="flex-row">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Ionicons
                                        key={star}
                                        name={
                                        star <= Math.floor(parseFloat(rating))
                                            ? 'star'
                                            : star - 0.5 <= (parseFloat(rating))
                                            ? 'star-half'
                                            : 'star-outline'
                                        }
                                        size={16}
                                        color={colors.accent}
                                    />
                                    ))}
                            </View>
                            <Text className="text-bookcare-textDark dark:text-bookcare-darkText">{rating}</Text>
                        </View>
                        <Text className="text-2xl font-bold text-bookcare-textDark dark:text-bookcare-darkText">GHS {parseInt(price)}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BookDetailsScreen