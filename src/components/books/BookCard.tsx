import { Pressable, View, Text } from "react-native"
import {Image} from "expo-image"
import { OpenLibraryResponseBook } from "@/src/types"
import {getBookCoverUrl } from "@/src/utils"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "@/src/constants"
import { useColorScheme } from "nativewind"

const BookCard = ({work}: {work: OpenLibraryResponseBook}) => {
    const {colorScheme} = useColorScheme()

    const imageUrl = getBookCoverUrl(work.coverId, "L")

    return (
        <Pressable 
            style={{
                height: 270,
                width: 150,
                padding: 2,
                shadowColor: '#5C3D2E',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 5,
                backgroundColor: colorScheme === "dark" ? '#231208' : '#F5EDD8'
                }}
            >
  
            <View style={{ height: 190, width: 150, overflow: 'hidden', borderRadius: 12 }}>
                {work.coverId === -1 ? (
                <View style={{ height: 190, width: 150, backgroundColor: '#E8D5B7', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="book" size={48} color="#5C3D2E" />
                </View>
                ) : (
                <Image
                    style={{ height: 190, width: 150 }}
                    source={{ uri: imageUrl }}
                    placeholder={colors.bookCardBlurHash}
                    transition={300}
                    contentFit="cover"
                />
                )}
            </View>

            <View style={{ height: 80, paddingHorizontal: 4, paddingTop: 6, justifyContent: "space-between"}}>
                <View>
                    <Text numberOfLines={2} className="font-semibold text-bookcare-textDark dark:text-bookcare-darkText">
                    {work.title}
                    </Text>
                </View>
                <View>
                    <Text numberOfLines={1} className="text-bookcare-textMuted text-xs">
                    {work.authorName}
                    </Text>
                    <View className="flex-row justify-between mt-1">
                    <Text className="text-bookcare-accent text-xs">★★★★☆</Text>
                    <Text className="font-bold text-bookcare-textDark dark:text-bookcare-darkText">GHS 59</Text>
                </View>
                </View>
            </View>

        </Pressable>
    )
}

export default BookCard