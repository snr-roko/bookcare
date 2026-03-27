import { Button, ButtonText } from "@/components/ui/button"
import { BOOK_QUOTES, CATEGORIES, colors } from "@/src/constants"
import { usePopularBooks, useSearchBooks, useSearchBooksBySubject, useTrendingNowBooks } from "@/src/hooks"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { OpenLibraryResponseBook } from "@/src/types"
import BookCard from "@/src/components/books/BookCard"
import SkeletonBookCard from "@/src/components/books/SkeletonBookCard"
import { useCallback, useRef, useState } from "react"
import ProfileModal from "@/src/components/profile/ProfileModal"
import BookList from "@/src/components/common/BookList"
import { FlashList } from "@shopify/flash-list"
import { cn } from "@/src/utils"
import * as Haptics from "expo-haptics"
import { RefreshControl } from "react-native"
import { useAuthStore, useProfileStore } from "@/src/store"
import { Image } from "expo-image"
import { useColorScheme } from "react-native"

const DiscoverScreen = () => {

    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    const [subject, setSubject] = useState<string>("")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [query, setQuery] = useState<string>("")
    const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false)

    const {data: popularBooks, isLoading: isPopularBooksLoading, isRefetching: isPopularRefetching, refetch: refetchPopular} = usePopularBooks()
    const {data: trendingNowBooks, isLoading: isTrendingNowBooksLoading, isRefetching: isTrendingRefetching, refetch: refetchTrending} = useTrendingNowBooks()
    const {data: subjectSearchedBooks, isLoading: isSearchBySubjectLoading} = useSearchBooksBySubject(subject)
    const {data: searchedBooks, isLoading: isSearchLoading} = useSearchBooks(query)

    const profileImage = useProfileStore(state => state.profileImage)
    const name: string = useAuthStore(state => state.session?.user.user_metadata.full_name)

    const quote = BOOK_QUOTES[Math.floor(Math.random() * BOOK_QUOTES.length)]

    const scrollRef = useRef<ScrollView>(null)
    const scrollToTop = () => {
        scrollRef.current?.scrollTo({y: 0, animated: true})
    }

    const searchForBooks = () => {
        setSubject("")
        setQuery(searchQuery)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    }

    const stopSearch = () => {
        setQuery("")
        setSearchQuery("")
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    }

    const isRefetching = isPopularRefetching || isTrendingRefetching

    const handleRefetch = useCallback(() => {
        refetchPopular()
        refetchTrending()
    }, [])

    return (
        <SafeAreaView className="flex-1 pt-10 px-5 gap-5 bg-bookcare-bg dark:bg-bookcare-bgDark">
            <View className="flex-row justify-between">
                <Text className="text-bookcare-heading dark:text-bookcare-headingDark text-3xl" >Discover</Text>
                <Pressable 
                    onPress={() => {
                        setIsProfileModalOpen(true)
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                    }} 
                >
                    {profileImage ? (
                        <Image
                        source={{ uri: profileImage }}
                        style={{ width: 30, height: 30, borderRadius: 15 }}
                        contentFit="cover"
                        />
                    ) : (
                        <View style={{
                            width: 30,
                            height: 30,         
                            borderRadius: 15,
                            backgroundColor: isDark ? colors.primaryDark : colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{
                            color: colors.whiteSoft,
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>
                            {name.charAt(0).toUpperCase()}
                        </Text>
                        </View>
                    )}    
                </Pressable>
                <ProfileModal isOpen={isProfileModalOpen} setIsOpen={setIsProfileModalOpen} />
            </View>
            <View className="flex-row gap-3 items-center">
                <TextInput
                    inputMode="search"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    placeholder="type to search..."
                    placeholderTextColor={isDark ? colors.mutedDark : colors.muted}
                    className="p-4 flex-1 border border-bookcare-border dark:border-bookcare-borderDark rounded-lg h-15 text-bookcare-text dark:text-bookcare-textDark bg-bookcare-surface dark:bg-bookcare-surfaceDark"         
                />
                <Button className="border border-bookcare-border dark:border-bookcare-border" onPress={searchForBooks} variant="outline">
                    <Ionicons name="search" color={isDark ? colors.primaryDark : colors.primary} size={24} />
                </Button>
                {query.length > 0 && 
                    <Button className="border border-bookcare-border dark:border-bookcare-border" onPress={stopSearch} variant="outline">
                        <Ionicons name="close" color={isDark ? colors.primaryDark : colors.primary} size={24} />
                    </Button>
                }
            </View>
            <View>
                <ScrollView
                    horizontal
                    contentContainerClassName="flex-row gap-2"
                    showsHorizontalScrollIndicator={false}
                    >
                    {CATEGORIES.map((category) => (
                        <Button 
                            onPress={() => {
                                setSubject(category.value === "all" ? "" : category.value)
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                            }}
                            variant="outline" 
                            key={category.value} 
                            size="sm" 
                            className={cn([
                                {"bg-bookcare-primary dark:bg-bookcare-primaryDark": subject === category.value}
                            ])}>
                            <ButtonText
                                className={cn([
                                "text-bookcare-text dark:text-bookcare-textDark font-semibold text-center",
                                {"text-bookcare-whiteSoft": subject === category.value}
                            ])} 
                            >   
                                {category.label}
                            </ButtonText>
                        </Button>
                    ))}
                </ScrollView>
            </View>
            {
                subject || query.length > 0 ?
                    subject ?
                    isSearchBySubjectLoading ?
                        (
                            <FlashList
                                data={[1,2,3,4,5,6]}
                                renderItem={() => <SkeletonBookCard />}
                                numColumns={2}
                                ItemSeparatorComponent={() => <View style={{ height: 16}} />}
                            />
                        ) :
                    (<BookList 
                        heading={subject
                            .split('_')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')} 
                        books={subjectSearchedBooks!} />)
                    : isSearchLoading ?    
                        (
                            <FlashList
                                data={[1,2,3,4,5,6]}
                                renderItem={() => <SkeletonBookCard />}
                                numColumns={2}
                                ItemSeparatorComponent={() => <View style={{ height: 16}} />}
                            />
                        ) : 
                        
                            searchedBooks?.length === 0 ?
                            (
                                <View className="gap-10">
                                    <Text className="text-bookcare-subheading dark:text-bookcare-subheadingDark font-semibold text-xl mb-2">{query}</Text>

                                    <View className="items-center justify-center gap-3">
                                        <Text className="text-bookcare-text dark:text-bookcare-textDark font-bold text-2xl" >Sorry we do not have this book</Text>
                                        <Button onPress={() => stopSearch()} size="xl" className="bg-bookcare-primary dark:bg-bookcare-primaryDark rounded-xl">
                                            <ButtonText className="text-bookcare-whiteSoft">Try again Later</ButtonText>
                                        </Button>
                                    </View>
                                </View>
                            ):
                            (
                            <BookList
                                heading={query} 
                                books={searchedBooks!} />
                        ) :
                <ScrollView
                    contentContainerClassName="pb-5 gap-5"
                    showsVerticalScrollIndicator={false}
                    ref={scrollRef}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefetching}
                            onRefresh={handleRefetch}
                            tintColor={isDark ? colors.primaryDark : colors.primary}
                            colors={[isDark ? colors.primaryDark : colors.primary]}
                        />
                    }
            >
                <View className="gap-3">
                    <Text className="text-bookcare-subheading dark:text-bookcare-subheadingDark font-semibold text-xl" >Popular</Text>
                    <ScrollView
                        contentContainerClassName="gap-5"
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        >
                        {isPopularBooksLoading ? 
                        [1, 2, 3, 4, 5].map((_, index) => (
                            <SkeletonBookCard key={index} />
                        )) : 
                        popularBooks?.map((work: OpenLibraryResponseBook) => (
                            <BookCard key={work.workKey} work={work} />
                        ))
                    }
                    </ScrollView>
                </View>
                <View className="gap-3">
                    <Text className="text-bookcare-subheading dark:text-bookcare-subheadingDark font-semibold text-xl" >Trending Now</Text>
                    <ScrollView
                        contentContainerClassName="gap-5"
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        >
                        {isTrendingNowBooksLoading ?
                        [1, 2, 3, 4, 5].map((_, index) => (
                            <SkeletonBookCard key={index} />
                        ))    :
                        trendingNowBooks?.map((work: OpenLibraryResponseBook) => (
                            <BookCard key={work.workKey} work={work}/>
                        ))
                    }
                    </ScrollView>
                </View>
                <View 
                    className="rounded-2xl p-5 gap-2 bg-bookcare-surface dark:bg-bookcare-surfaceDark"
                    style={{
                        shadowColor: isDark ? colors.borderDark : colors.border,
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        elevation: 3
                    }}
                    >
                        <View>
                            <Text className="text-bookcare-text dark:text-bookcare-textDark text-base italic leading-6">{quote.quote}</Text>
                            <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-sm self-end">— {quote.author}</Text>
                        </View>
                        <View>
                            <View className="flex-row gap-2 items-center">
                                <Ionicons color={isDark ? colors.subheadingDark : colors.subheading} size={16} name="book" />
                                <Text className="text-bookcare-subheading dark:text-bookcare-subheadingDark font-bold text-lg">Bookcare</Text>
                            </View>
                            <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-base">Your Story begins here</Text>
                        </View>
                        <Text className="text-bookcare-muted dark:text-bookcare-mutedDark text-sm font-bold mt-1">Get fast delivery anywhere across Ghana.</Text>
                        <Button onPress={scrollToTop} className="mt-4 bg-bookcare-primary dark:bg-bookcare-primaryDark rounded-xl w-full">
                            <ButtonText className="text-bookcare-whiteSoft font-semibold text-center">
                                Browse & Order Now
                            </ButtonText>
                        </Button>
                </View>
            </ScrollView> 

            }
        </SafeAreaView>
    )
}

export default DiscoverScreen