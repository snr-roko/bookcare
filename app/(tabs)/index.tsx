import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { BOOK_QUOTES, CATEGORIES, colors } from "@/src/constants"
import { usePopularBooks, useSearchBooks, useSearchBooksBySubject, useTrendingNowBooks } from "@/src/hooks"
import { Ionicons } from "@expo/vector-icons"
import { ScrollView, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { OpenLibraryResponseBook } from "@/src/types"
import BookCard from "@/src/components/books/BookCard"
import SkeletonBookCard from "@/src/components/books/SkeletonBookCard"
import { useRef, useState } from "react"
import ProfileModal from "@/src/components/profile/ProfileModal"
import BookList from "@/src/components/common/BookList"
import { FlashList } from "@shopify/flash-list"
import { cn } from "@/src/utils"

const DiscoverScreen = () => {

    const [subject, setSubject] = useState<string>("")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [query, setQuery] = useState<string>("")

    const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false)

    const {data: popularBooks, isLoading: isPopularBooksLoading} = usePopularBooks()
    const {data: trendingNowBooks, isLoading: isTrendingNowBooksLoading} = useTrendingNowBooks()
    const {data: subjectSearchedBooks, isLoading: isSearchBySubjectLoading} = useSearchBooksBySubject(subject)
    const {data: searchedBooks, isLoading: isSearchLoading} = useSearchBooks(query)

    const quote = BOOK_QUOTES[Math.floor(Math.random() * BOOK_QUOTES.length)]

    const scrollRef = useRef<ScrollView>(null)
    const scrollToTop = () => {
        scrollRef.current?.scrollTo({y: 0, animated: true})
    }

    const searchForBooks = () => {
        setSubject("")
        setQuery(searchQuery)
    }

    const stopSearch = () => {
        setQuery("")
        setSearchQuery("")
    }

    return (
        <SafeAreaView className="flex-1 pt-10 px-5 gap-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <View className="flex-row justify-between">
                <Text className="text-bookcare-primary text-3xl" >Discover</Text>
                <Button variant="link" onPress={() => setIsProfileModalOpen(true)} size="xs">
                    <Ionicons name="person-circle" size={30} color={colors.primary} />
                </Button>
                <ProfileModal isOpen={isProfileModalOpen} setIsOpen={setIsProfileModalOpen} />
            </View>
            <View className="flex-row gap-3 items-center">
                <TextInput
                    inputMode="search"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    placeholder="type to search..."
                    placeholderTextColor={colors.textMuted}
                    className="p-4 flex-1 border border-bookcare-mid rounded-lg h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"         
                />
                <Button onPress={searchForBooks} variant="outline">
                    <Ionicons name="search" size={24} />
                </Button>
                {query.length > 0 && 
                    <Button onPress={stopSearch} variant="outline">
                        <Ionicons name="close" size={24} />
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
                            onPress={() => setSubject(category.value === "all" ? "" : category.value)}
                            variant="outline" 
                            key={category.value} 
                            size="sm" 
                            className={cn([
                                {"bg-bookcare-primary": subject === category.value}
                            ])}>
                            <ButtonText
                                className={cn([
                                "text-bookcare-primary font-semibold text-center",
                                {"text-bookcare-surface": subject === category.value}
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
                                    <Text className="text-bookcare-primary font-semibold text-xl mb-2">{query}</Text>

                                    <View className="items-center justify-center gap-3">
                                        <Text className="text-bookcare-textDark dark:text-bookcare-darkText font-bold text-2xl" >Sorry we do not have this book</Text>
                                        <Button onPress={() => stopSearch()} size="xl" className="bg-bookcare-primary rounded-xl">
                                            <ButtonText className="text-bookcare-surface">Try again Later</ButtonText>
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
            >
                <View className="gap-3">
                    <Text className="text-bookcare-primary font-semibold text-xl" >Popular</Text>
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
                    <Text className="text-bookcare-primary font-semibold text-xl" >Trending Now</Text>
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
                    className="rounded-2xl p-5 gap-2 bg-bookcare-surface dark:bg-bookcare-darkSurface"
                    style={{
                        shadowColor: colors.primary,
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        elevation: 3
                    }}
                    >
                        <View>
                            <Text className="text-bookcare-textDark dark:text-bookcare-darkText text-base italic leading-6">{quote.quote}</Text>
                            <Text className="text-bookcare-textMuted text-sm self-end">— {quote.author}</Text>
                        </View>
                        <View>
                            <View className="flex-row gap-2 items-center">
                                <Ionicons color={colors.primary} size={16} name="book" />
                                <Text className="text-bookcare-primary font-bold text-lg">Bookcare</Text>
                            </View>
                            <Text className="text-bookcare-textMuted text-base">Your Story begins here</Text>
                        </View>
                        <Text className="text-bookcare-textMuted text-sm font-bold mt-1">Get fast delivery anywhere across Ghana.</Text>
                        <Button onPress={scrollToTop} className="mt-4 bg-bookcare-primary rounded-xl w-full">
                            <ButtonText className="text-white font-semibold text-center">
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