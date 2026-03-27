import { Button, ButtonText } from "@/components/ui/button"
import BookCard from "@/src/components/books/BookCard"
import SkeletonBookCard from "@/src/components/books/SkeletonBookCard"
import Skeleton from "@/src/components/common/skeleton"
import { CHAR_LIMIT, colors } from "@/src/constants"
import { useAuthorDetails, useBookDetails, useSearchBooksBySubjectFew} from "@/src/hooks"
import { useCartStore } from "@/src/store/useCartStore"
import { useWhishlistStore } from "@/src/store/useWishlistStore"
import { CartItemType, OpenLibraryResponseBook, WishlistItem } from "@/src/types"
import { cn, getAuthorCoverUrl } from "@/src/utils"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Haptics from "expo-haptics"
import {toast} from "sonner-native"
import { useColorScheme } from "react-native"

const BookDetailsScreen = () => {

    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark" 
    
    const {title, coverUrl, authorName, rating, price, editionCount, yearFirstPublished, id, authorKey} = useLocalSearchParams<{
        title: string,
        coverUrl: string, 
        authorName: string,
        rating: string,
        price: string,
        editionCount: string,
        yearFirstPublished: string,
        id: string,
        authorKey: string
    }>()

    const [expanded, setExpanded] = useState(false)
    const [quantity, setQuantity] = useState<number>(0)

    const addTowishlist = useWhishlistStore((state) => state.addToWishlist)
    const removeFromWishlist = useWhishlistStore(state => state.removeFromWishlist)
    const isWishlisted = useWhishlistStore(state => state.items.some(item => item.id === id))
    

    const addToCart = useCartStore((state) => state.addToCart)
    const isInCart = useCartStore(state => state.cart.some(cartItem => cartItem.itemDetails.id === id))
    const cartItemQuantity = useCartStore(state => state.cart.reduce((prev, currCartItem) => prev + (currCartItem.itemDetails.id === id ? currCartItem.quantity : 0), 0))
    const increaseCartQuantity = useCartStore(state => state.increaseCartItemQuantity)
    const decreaseCartQuantity = useCartStore(state => state.decreaseCartItemQuantity)

    const {isLoading: isBookDetailsLoading, data: bookDetails} = useBookDetails(id)
    
    let isLong = false;
    if (!isBookDetailsLoading && bookDetails) isLong = bookDetails.description.length > 40
    

    const {isLoading: isAuthorDetailsLoading, data: authorDetails} = useAuthorDetails(authorKey)

    const {isLoading: isRelatedBooksLoading, data: relatedBooks} = useSearchBooksBySubjectFew(bookDetails?.subjects?.[0] ?? "")

    const wishlistBook = () => {
        const book: WishlistItem = {
            id,
            title,
            coverUrl,
            authorName,
            authorKey,
            price,
            rating,
            editionCount,
            yearFirstPublished
        }
        addTowishlist(book)
    }

    const RemoveBookFromwishlist = () => {
        removeFromWishlist(id)
    }

    const increaseQuantity = () => {
        if (quantity === 20) return
        setQuantity(prev => prev + 1)
    }

    const decreaseQuantity = () => {
        if (quantity === 0) return
        setQuantity(prev => prev - 1)
    }

    const addCartItemToCart = () => {
        if (quantity === 0) return
        const book: WishlistItem = {
            id,
            title,
            coverUrl,
            authorName,
            authorKey,
            price,
            rating,
            editionCount,
            yearFirstPublished
        }

        const cartItemQuantity = quantity

        const cartItem: CartItemType = {
            itemDetails: book,
            quantity: cartItemQuantity
        }

        addToCart(cartItem)
        setQuantity(0)

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        toast.success("Added to cart")
    }

    return (
        <SafeAreaView className="flex-1 pt-10 bg-bookcare-bg dark:bg-bookcare-bgDark">
            <View className="flex-row gap-5 px-5 pb-5">
                <View style={{overflow: 'hidden', borderRadius: 1, shadowRadius: 1, elevation: 2}}>
                    <Image
                        style={{ height: 180, width: 140}}
                        source={{ uri: coverUrl }}
                        placeholder={colors.bookCardBlurHash}
                        transition={300}
                        contentFit="cover"
                    />
                </View>
                <View className="flex-1 justify-between">
                    <View>
                        <Text numberOfLines={2} className="text-xl flex-shrink font-semibold text-bookcare-text dark:text-bookcare-textDark">
                            {title}
                        </Text>
                        <Text numberOfLines={1} className="text-bookcare-muted dark:text-bookcare-mutedDark text-lg">
                                {authorName}
                        </Text>
                    </View>
                    <View className="gap-2">
                        <Text className="text-bookcare-text dark:text-bookcare-textDark">{`${yearFirstPublished} (${editionCount})`}</Text>
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
                                        color={isDark ? colors.accent : colors.accentDark}
                                    />
                                    ))}
                            </View>
                            <Text className="text-bookcare-text dark:text-bookcare-textDark">{rating}</Text>
                        </View>
                        <Text className="text-2xl font-bold text-bookcare-text dark:text-bookcare-textDark">GHS {parseInt(price)}</Text>
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
                            className="text-bookcare-text dark:text-bookcare-textDark text-sm leading-6"
                        >
                            {expanded ? bookDetails?.description : bookDetails?.description.slice(0, CHAR_LIMIT) + (isLong ? '...' : '')}
                        </Text>
                        {isLong && (
                            <Text
                                onPress={() => setExpanded(!expanded)}
                                className="text-bookcare-primary dark:text-bookcare-primaryDark font-semibold mt-1"
                            >
                                {expanded ? 'Show less ↑' : 'Read more ↓'}
                            </Text>
                        )}
                    </View>)
                }
                <View className="gap-3">
                    <Text className="text-bookcare-subheading dark:text-bookcare-subheadingDark font-bold">About The Author</Text>
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
                                    <View style={{overflow: 'hidden', borderRadius: 1, shadowRadius: 1, elevation: 2, }}>
                                        <Image
                                            style={{ height: 100, width: 100}}
                                            source={{ uri: getAuthorCoverUrl(String(authorDetails?.coverId), "L") }}
                                            placeholder={colors.bookCardBlurHash}
                                            transition={300}
                                            contentFit="cover"
                                        />
                                    </View>
                                    <View className="gap-5">
                                        <View>
                                            <Text className="text-lg text-bookcare-text dark:text-bookcare-textDark">{authorDetails?.name}</Text>
                                            {
                                                authorDetails?.birthDate ?
                                                    <Text className="text-lg text-bookcare-text dark:text-bookcare-textDark">{authorDetails?.birthDate}</Text> :
                                                    null
                                            }
                                        </View>
                                    </View>
                                </View>)      
                    }
                </View>
                <View className="gap-3">
                    <Text className="text-bookcare-subheading dark:text-bookcare-subheadingDark font-semibold text-xl" >Related Boooks</Text>
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
                className="p-3 flex-row items-center justify-between"
                style={{
                    borderTopWidth: 2,
                    borderTopColor: isDark ? colors.borderDark : colors.border
                }}
                >
                <Text className="text-bookcare-text dark:text-bookcare-textDark font-bold text-xl">GHS {price}</Text>
                <View className="flex-row items-center gap-2">
                    <Button onPress={() => isInCart ? decreaseCartQuantity(id) : decreaseQuantity()} size="sm" className="rounded-xl bg-bookcare-primary dark:bg-bookcare-primaryDark">
                        <ButtonText className="text-bookcare-whiteSoft font-bold text-2xl">-</ButtonText>
                    </Button>
                    <Text className="text-bookcare-text dark:text-bookcare-textDark font-semibold text-lg">{isInCart ? cartItemQuantity: quantity}</Text>
                    <Button onPress={() => isInCart ? increaseCartQuantity(id) : increaseQuantity()} size="sm" className="rounded-xl bg-bookcare-primary dark:bg-bookcare-primaryDark">
                        <ButtonText className="text-bookcare-whiteSoft font-bold text-2xl">+</ButtonText>
                    </Button>
                </View>
                <View className="flex-row items-center gap-3">
                    <Button disabled={isInCart || quantity < 1} onPress={addCartItemToCart} className={cn([
                        {"bg-bookcare-primary dark:bg-bookcare-primaryDark": !isInCart && quantity > 0, "bg-bookcare-primary/60 dark:bg-bookcare-primaryDark/60": isInCart || quantity < 1},
                        "rounded-xl", "px-5" 
                    ])}>
                        <ButtonText className="text-bookcare-whiteSoft font-semibold">
                            Add to Cart
                        </ButtonText>
                    </Button>
                    <Button onPress={isWishlisted ? RemoveBookFromwishlist : wishlistBook}  className="bg-bookcare-primary/25 rounded-xl px-6">
                        <Ionicons name="heart" color={isWishlisted ? colors.error : colors.whiteSoft} size={28}/>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BookDetailsScreen