import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { colors } from "@/src/constants"
import { usePopularBooks, useTrendingNowBooks } from "@/src/hooks"
import { supabase } from "@/src/lib/supabase"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { OpenLibraryResponseBook } from "@/src/types"
import BookCard from "@/src/components/books/BookCard"

const DiscoverScreen = () => {
    const logoutUser = async() => {
        await supabase.auth.signOut()
    }

    const {data: popularBooks, isLoading: isPopularBooksLoading} = usePopularBooks()
    const {data: trendingNowBooks, isLoading: isTrendingNowBooksLoading} = useTrendingNowBooks()

    return (
        <SafeAreaView className="flex-1 pt-10 px-5 gap-5 bg-bookcare-cream dark:bg-bookcare-darkBg">
            <View className="flex-row justify-between">
                <Text className="text-bookcare-primary text-3xl" >Discover</Text>
                <Button size="xs" className="bg-transparent">
                    <Ionicons name="person-circle" size={28} color={colors.primary} />
                </Button>
            </View>
            <View>
                <TextInput
                    inputMode="search"
                    placeholder="type to search..."
                    placeholderTextColor={colors.textMuted}
                    className="p-4 border border-bookcare-mid rounded-lg h-15 text-bookcare-textDark dark:text-bookcare-darkText bg-bookcare-surface dark:bg-bookcare-darkSurface"         
                />
            </View>
            <ScrollView
                contentContainerClassName="pb-5 gap-5"
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-3">
                    <Text className="text-bookcare-primary font-semibold text-xl" >Popular</Text>
                    {isPopularBooksLoading ?
                    <ButtonSpinner /> :
                    <ScrollView
                        contentContainerClassName="gap-5"
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        >
                        {popularBooks?.map((work: OpenLibraryResponseBook) => (
                            <BookCard key={work.workKey} work={work}/>
                        ))}
                    </ScrollView>}
                </View>
                <View className="gap-3">
                    <Text className="text-bookcare-primary font-semibold text-xl" >Trending Now</Text>
                    {isTrendingNowBooksLoading ?
                    <ButtonSpinner /> :
                    <ScrollView
                        contentContainerClassName="gap-5"
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        >
                        {trendingNowBooks?.map((work: OpenLibraryResponseBook) => (
                            <BookCard key={work.workKey} work={work}/>
                        ))}
                    </ScrollView>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DiscoverScreen