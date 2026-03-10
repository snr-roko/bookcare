export type CoverSizeType = 'S' | 'M' | 'L'

export type OpenLibraryResponseBook = {
    authorName: string
    authorKey: string
    coverId: string | null
    yearFirstPublished: number
    title: string
    subtitle: string | null
    workKey: string
    isbn: string | null
}