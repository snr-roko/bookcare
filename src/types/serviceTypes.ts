export type CoverSizeType = 'S' | 'M' | 'L'

export type OpenLibraryResponseBook = {
    authorName: string
    authorKey: string
    coverId: number
    yearFirstPublished: number
    title: string
    workKey: string
    editionCount: number
}

export type BookDetailsResponse = {
    title: string
    description: string
    subjects: string[]
}

export type AuthorDetailsResponse = {
    name: string
    coverId?: number
    birthDate?: string
}