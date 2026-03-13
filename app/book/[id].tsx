import { Button, ButtonText } from "@/components/ui/button"
import Skeleton from "@/src/components/common/skeleton"
import { CHAR_LIMIT, colors } from "@/src/constants"
import { useAuthorDetails, useBookDetails } from "@/src/hooks"
import { getAuthorCoverUrl } from "@/src/utils"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const BookDetailsScreen = () => {
    const [expanded, setExpanded] = useState(false)

    const {title, coverId, coverUrl, authorName, rating, price, editionCount, yearFirstPublished, id, authorKey} = useLocalSearchParams<{
        title: string,
        coverId: string,
        coverUrl: string, 
        authorName: string,
        rating: string,
        price: string,
        editionCount: string,
        yearFirstPublished: string,
        id: string,
        authorKey: string
    }>()

    
    const {isLoading: isBookDetailsLoading, data: bookDetails, isError, error} = useBookDetails(id)
    
    let isLong = false;
    if (!isBookDetailsLoading && bookDetails) isLong = bookDetails.description.length > 40

    if (isError) console.log(error)
    if(!isBookDetailsLoading && !isError) console.log(bookDetails)
    

    const {isLoading: isAuthorDetailsLoading, data: authorDetails} = useAuthorDetails(authorKey)

    return (
        <SafeAreaView className="flex-1 py-10 px-5 gap-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="gap-5"
            >
                {
                    isBookDetailsLoading ?
                    (<View className="gap-3">
                        <Skeleton height={10} width={250} />
                        <Skeleton height={10} width={250} />
                        <Skeleton height={10} width={100} />
                        <Skeleton height={10} width={100} />
                        <Skeleton height={10} width={100} />
                    </View>):
                    (<View className="gap-5">
                        <Text
                            className="text-bookcare-textDark dark:text-bookcare-darkText text-sm leading-6"
                        >
                            {expanded ? bookDetails?.description : bookDetails?.description.slice(0, CHAR_LIMIT) + (isLong ? '...' : '')}
                        </Text>
                        {isLong && (
                            <Text
                                onPress={() => setExpanded(!expanded)}
                                className="text-bookcare-primary font-semibold mt-1"
                            >
                                {expanded ? 'Show less ↑' : 'Read more ↓'}
                            </Text>
                        )}
                    </View>)
                }
                <View className="gap-3">
                    <Text className="text-bookcare-primary font-bold">About The Author</Text>
                    {
                        isAuthorDetailsLoading ?
                            (
                                <View className="flex-row gap-5">
                                    <Skeleton height={100} width={100} />
                                    <View className="gap-5">
                                        <View className="gap-3">
                                            <Skeleton height={10} width={140} />
                                            <Skeleton height={10} width={140} />
                                        </View>
                                        <Skeleton height={10} width={140} />
                                    </View>
                                </View>
                            ) : (
                                <View className="flex-row gap-5">
                                    <View style={{overflow: 'hidden', borderRadius: 8, elevation: 2 }}>
                                        {parseInt(coverId)  === -1 ? (
                                        <View style={{ height: 150, width: 100, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="person" size={48} color={colors.primary} />
                                        </View>
                                    ) : (
                                        <Image
                                            style={{ height: 100, width: 100}}
                                            source={{ uri: getAuthorCoverUrl(String(authorDetails?.coverId), "L") }}
                                            placeholder={colors.bookCardBlurHash}
                                            transition={300}
                                            contentFit="cover"
                                        />
                                    )}
                                    </View>
                                    <View className="gap-5">
                                        <View>
                                            <Text className="text-lg text-bookcare-textDark dark:text-bookcare-darkText">{authorDetails?.name}</Text>
                                            {
                                                authorDetails?.birthDate ?
                                                    <Text className="text-lg text-bookcare-textDark dark:text-bookcare-darkText">{authorDetails?.birthDate}</Text> :
                                                    null
                                            }
                                        </View>
                                        <Button className="bg-bookcare-primary">
                                            <ButtonText className="bg-bookcare-darkText">See Other Works</ButtonText>
                                        </Button>
                                    </View>
                                </View>)      
                    }
                </View>
                <View className="gap-3">
                    <Text className="text-bookcare-primary text-lg font-bold">Related Books</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookDetailsScreen