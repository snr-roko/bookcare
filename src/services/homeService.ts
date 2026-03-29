import { OpenLibraryResponseBook } from "../types"
import { retrieveWorksFromPayload, retrieveWorksFromPayloadForSubjects } from "../utils"
import { openLibraryBaseUrl } from "../constants"
import { openLibraryFetch } from "../lib/openLibrary"

export const fetchPopularBooks = async () => {
    const url = `${openLibraryBaseUrl}/trending/daily.json?limit=5`

    const payload = await openLibraryFetch(url)    
    return retrieveWorksFromPayload(payload.works)
}

export const fetchTrendingNowBooks = async () => {
    const url = `${openLibraryBaseUrl}/trending/now.json?limit=5`

    const payload = await openLibraryFetch(url)
    
    return retrieveWorksFromPayload(payload.works)
}

export const fetchBooksBySubject = async (subject: string) => {
    const url = `${openLibraryBaseUrl}/subjects/${subject}.json?details=true`

    const payload = await openLibraryFetch(url)
    
    return retrieveWorksFromPayloadForSubjects(payload.works)
}

export const searchForBook = async (subject: string): Promise<OpenLibraryResponseBook[]> => {
    const formattedString = subject.replaceAll(" ", "+")
    const url = `${openLibraryBaseUrl}/search.json?q=${formattedString}&limit=10`

    const payload = await openLibraryFetch(url)

    const works: any[] = payload.docs ?? [];

    const books = works
        .filter((work) => work?.title && work?.key)
        .map((work) => ({
            authorKey: work.author_key?.[0] ?? "",
            authorName: work.author_name?.[0] ?? "Unknown Author",
            coverId: work.cover_i ?? -1,
            title: work.title ?? "Untitled",
            workKey: work.key ?? "",
            yearFirstPublished: work.first_publish_year ?? null,
            editionCount: work.edition_count ?? 0,
    }));

  return books;

}

