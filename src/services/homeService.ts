import { OpenLibraryResponseBook } from "../types"
import { retrieveWorksFromPayload } from "../utils"
import { openLibraryBaseUrl } from "../constants"

export const fetchPopularBooks = async () => {
    const url = `${openLibraryBaseUrl}/trending/daily.json?limit=5`
    const response = await fetch(url, {
        method: "GET"
    })

    if (!response.ok) {
        throw new Error("Error fetching Popular books")
    }

    const payload = await response.json()    
    return retrieveWorksFromPayload(payload.works)
}

export const fetchTrendingNowBooks = async () => {
    const url = `${openLibraryBaseUrl}/trending/now.json?limit=5`
const response = await fetch(url, {
        method: "GET"
    })

    if (!response.ok) {
        throw new Error("Error fetching Popular books")
    }

    const payload = await response.json()
    
    return retrieveWorksFromPayload(payload.works)
}

export const fetchBooksBySubject = async (subject: string) => {
    const url = `${openLibraryBaseUrl}/subjects/${subject}.json?limit=20`
    const response = await fetch(url, {
        method: "GET"
    })

    if (!response.ok) {
        throw new Error("Error fetching Popular books")
    }

    const payload = await response.json()
    
    return retrieveWorksFromPayload(payload.works)
}

export const searchForBook = async (subject: string): Promise<OpenLibraryResponseBook[]> => {
    const formattedString = subject.replaceAll(" ", "+")
    const url = `${openLibraryBaseUrl}/search.json?q=${formattedString}&limit=10`
    const response = await fetch(url, {
        method: "GET"
    })

    if (!response.ok) {
        throw new Error("Error fetching Popular books")
    }

    const payload = await response.json()
    const works: any[] = payload.docs

    return works.map((work) => (
        {
            authorKey: work.author_key[0],
            authorName: work.author_name[0],
            coverId: work.cover_i,
            title: work.title,
            workKey: work.key,
            yearFirstPublished: work.first_publish_year,
            editionCount: work.edition_count
        }
    ))
    
    
}

