import { Pressable, View, Text } from "react-native"
import {Image} from "expo-image"
import { OpenLibraryResponseBook } from "@/src/types"
import {derivePrice, deriveRating, getBookCoverUrl } from "@/src/utils"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "@/src/constants"
import { useColorScheme } from "nativewind"
import { useRouter } from "expo-router"

const BookCard = ({work}: {work: OpenLibraryResponseBook}) => {
    const {colorScheme} = useColorScheme()
    const router = useRouter()

    const imageUrl = getBookCoverUrl(work.coverId, "L")
    const bookPrice = derivePrice(work.coverId, work.yearFirstPublished)
    const bookRating = deriveRating(work.workKey, work.editionCount)

    const navigateToBookDetailsScreen = () => {
        router.push({
            pathname: "/book/[id]",
            params: {
                id: work.workKey.replace('/works/', ''),
                title: work.title,
                coverUrl: imageUrl,
                authorName: work.authorName,
                authorKey: work.authorKey,
                price: String(bookPrice),
                rating: String(bookRating),
                editionCount: String(work.editionCount ?? 1),
                yearFirstPublished: String(work.yearFirstPublished)
            }
        })
    }

    return (
        <Pressable
            onPress={navigateToBookDetailsScreen} 
            style={{
                height: 270,
                width: 150,
                padding: 2,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                borderRadius: 1,
                shadowRadius: 1,
                elevation: 2,
                backgroundColor: colorScheme === "dark" ? '#231208' : '#F5EDD8'
                }}
            >
  
            <View style={{ height: 185, width: 150, overflow: 'hidden', borderRadius: 12 }}>
                <Image
                    style={{ height: 185, width: 150 }}
                    source={{ uri: imageUrl }}
                    placeholder={colors.bookCardBlurHash}
                    transition={300}
                    contentFit="cover"
                />
            </View>

            <View style={{ height: 85, paddingHorizontal: 4, paddingVertical: 6, justifyContent: "space-between"}}>
                <View>
                    <Text numberOfLines={2} className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText">
                    {work.title}
                    </Text>
                </View>
                <View>
                    <Text numberOfLines={1} className="text-bookcare-textMuted text-xs">
                    {work.authorName}
                    </Text>
                    <View className="flex-row justify-between mt-1 items-center">
                    {[1, 2, 3, 4, 5].map(star => (
                        <Ionicons
                            key={star}
                            name={
                            star <= Math.floor(bookRating)
                                ? 'star'
                                : star - 0.5 <= bookRating
                                ? 'star-half'
                                : 'star-outline'
                            }
                            size={10}
                            color={colors.accent}
                        />
                        ))}
                    <Text className="font-bold text-bookcare-textDark dark:text-bookcare-darkText">GHS {bookPrice}</Text>
                </View>
                </View>
            </View>

        </Pressable>
    )
}

export default BookCard