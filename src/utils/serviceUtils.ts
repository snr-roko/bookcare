import { AuthorDetailsResponse, BookDetailsResponse, CoverSizeType, OpenLibraryResponseBook } from "../types"

export const getBookCoverUrl = (coverId: number, size: CoverSizeType) => {
    if (!coverId || coverId === -1) return "https://openlibrary.org/images/icons/avatar_book-lg.png"
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

export const getAuthorCoverUrl = (coverId: string, size: CoverSizeType) => {
    if (!coverId || coverId === "-1") return "https://openlibrary.org/images/icons/avatar_author-lg.png"
    return `https://covers.openlibrary.org/a/id/${coverId}-${size}.jpg`
}

export const retrieveWorksFromPayload = (works: any[]) => {
    const data: OpenLibraryResponseBook[] = works.map((work) => {

        return {
            authorKey: work.author_key[0] ?? "",
            authorName: work.author_name[0] ?? "Unknown Author",
            coverId: work.cover_i ?? -1,
            title: work.title ?? "Untitled",
            yearFirstPublished: work.first_publish_year ?? 2000,
            workKey: work.key ?? "",
            editionCount: work.edition_count ?? 0
        }
})
    
    return data
}

export const retrieveWorksFromPayloadForSubjects = (works: any[]) => {
    const data: OpenLibraryResponseBook[] = works.map((work) => {

        return {
            authorKey: work.authors[0].key ?? "",
            authorName: work.authors[0].name ?? "Untitled Author",
            coverId: work.cover_id ?? -1,
            title: work.title ?? "Untitled",
            yearFirstPublished: work.first_publish_year ?? 2000,
            workKey: work.key ?? "",
            editionCount: work.edition_count ?? 0
        }
})
    
    return data
}

const getDescription = (description: any): string => {
  if (typeof description === 'string') return description
  if (typeof description === 'object' && description?.value) return description.value
  return 'No description available.'
}

export const retrieveBookDetailsFromPayload = (work: any): BookDetailsResponse => {
    
    const description = getDescription(work.description)

    return {
        title: work.title ?? "Untitled",
        description,
        subjects: work.subjects ?? []
    }
}

export const retrieveAuthorDetailsFromPayload = (author: any): AuthorDetailsResponse => {
    return {
        name: author.name ?? "Untitled Author",
        coverId: author.photos?.[0] ?? "-1",
        birthDate: author.birth_date ?? null
    }
}