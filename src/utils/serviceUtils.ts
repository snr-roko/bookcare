import { CoverSizeType, OpenLibraryResponseBook } from "../types"

export const getBookCoverUrl = (coverId: number, size: CoverSizeType) => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

export const getBookCoverByOLID = (olid: string, size: CoverSizeType) => {
    return `https://covers.openlibrary.org/b/olid/${olid}-${size}.jpg`
} 

export const getAuthorCoverByOLID = (authorOlid: string, size: CoverSizeType) => {
    return `https://covers.openlibrary.org/a/olid/${authorOlid}-${size}.jpg`
}

export const retrieveWorksFromPayload = (works: any[]) => {
    const data: OpenLibraryResponseBook[] = works.map((work) => (
        {
            authorKey: work.author_key[0],
            authorName: work.author_name[0],
            coverId: work.docs[0].cover_i,
            isbn: work.docs[0].availability.isbn,
            subtitle: work.docs[0].subtitle ?? null,
            title: work.docs[0].title,
            yearFirstPublished: work.first_publish_year,
            workKey: work.docs[0].key
        }
    ))
    
    return data
}


/* 
authorKey: payload.works[0].author_key[0],
        authorName: payload.works[0].author_name[0],
        coverId: payload.works[0].docs[0].cover_i,
        isbn: payload.works[0].docs[0].availability.isbn,
        subtitle: payload.works[0].docs[0].subtitle ?? null,
        title: payload.works[0].docs[0].title,
        yearFirstPublished: payload.works[0].first_publish_year,
        workKey: payload.works[0].docs[0].key
        */