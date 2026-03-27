import { OpenLibraryResponseBook } from "@/src/types"
import { FlashList } from "@shopify/flash-list"
import BookCard from "../books/BookCard"
import { Text, View } from "react-native"

const BookList = ({books, heading}: {books: OpenLibraryResponseBook[], heading: string}) => {
    return (
        <FlashList
            data={books}
            renderItem={({item}) => (<BookCard work={item} />)}
            ListHeaderComponent={() => (<Text className="text-bookcare-subheading dark:text-bookcare-subheadingDark font-semibold text-xl mb-2">{heading}</Text>)}
            keyExtractor={(item) => item.workKey}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{ height: 16}} />}
        />
    )
}

export default BookList