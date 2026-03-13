import { Button, ButtonText } from "@/components/ui/button"
import BookCard from "@/src/components/books/BookCard"
import SkeletonBookCard from "@/src/components/books/SkeletonBookCard"
import Skeleton from "@/src/components/common/skeleton"
import { CHAR_LIMIT, colors } from "@/src/constants"
import { useAuthorDetails, useBookDetails, useSearchBooksBySubjectFew } from "@/src/hooks"
import { OpenLibraryResponseBook } from "@/src/types"
import { getAuthorCoverUrl } from "@/src/utils"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const BookDetailsScreen = () => {
    const [expanded, setExpanded] = useState(false)
    const [quantity, setQuantity] = useState<number>(0)

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

    
    const {isLoading: isBookDetailsLoading, data: bookDetails} = useBookDetails(id)
    
    let isLong = false;
    if (!isBookDetailsLoading && bookDetails) isLong = bookDetails.description.length > 40
    

    const {isLoading: isAuthorDetailsLoading, data: authorDetails} = useAuthorDetails(authorKey)

    const {isLoading: isRelatedBooksLoading, data: relatedBooks} = useSearchBooksBySubjectFew(bookDetails?.subjects?.[0] ?? "")

    return (
        <SafeAreaView className="flex-1 pt-10 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <View className="flex-row gap-5 px-5 pb-5">
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
                contentContainerClassName="gap-5 pb-5 px-5"
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
                    <Text className="text-bookcare-primary font-semibold text-xl" >Related Boooks</Text>
                    <ScrollView
                        contentContainerClassName="gap-5"
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        >
                        {isRelatedBooksLoading ? 
                        [1, 2, 3, 4, 5].map((_, index) => (
                            <SkeletonBookCard key={index} />
                        )) : 
                        relatedBooks?.map((work: OpenLibraryResponseBook) => (
                            <BookCard key={work.workKey} work={work} />
                        ))
                    }
                    </ScrollView>
                </View>
            </ScrollView>
            <View 
                className="p-4 flex-row items-center justify-between"
                style={{
                    borderTopWidth: 2,
                    borderTopColor: colors.mid,
                    // shadowColor: colors.mid,
                    // shadowOffset: {width: 0, height: -3},
                    // shadowOpacity: 0.08,
                    // shadowRadius: 8,
                    // elevation: 1
                }}
                >
                <Text className="text-bookcare-textDark dark:text-bookcare-darkText font-bold text-xl">GHS {price}</Text>
                <View className="flex-row items-center gap-1">
                    <Button size="sm" className="rounded-full bg-bookcare-mid">
                        <ButtonText className="text-bookcare-primary font-bold">-</ButtonText>
                    </Button>
                    <Text className="text-bookcare-textDark dark:text-bookcare-darkText font-semibold text-lg">{quantity}</Text>
                    <Button size="sm" className="rounded-full bg-bookcare-mid">
                        <ButtonText className="text-bookcare-primary font-bold">+</ButtonText>
                    </Button>
                </View>
                <View className="flex-row items-center gap-3">
                    <Button className="bg-bookcare-primary rounded-xl px-6">
                        <ButtonText className="text-white font-semibold">
                            Add to Cart
                        </ButtonText>
                    </Button>
                    <Button className="bg-bookcare-primary rounded-xl px-6">
                        <Ionicons name="heart" color={"#fff"} size={22}/>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BookDetailsScreen