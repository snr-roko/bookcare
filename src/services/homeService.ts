import { OpenLibraryResponseBook } from "../types"
import { retrieveWorksFromPayload } from "../utils"

const baseUrl = "https://www.openlibrary.org"

export const fetchPopularBooks = async () => {
    const url = `${baseUrl}/trending/daily.json?limit=5`
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
    const url = `${baseUrl}/trending/now.json?limit=5`
const response = await fetch(url, {
        method: "GET"
    })

    if (!response.ok) {
        throw new Error("Error fetching Popular books")
    }

    const payload = await response.json()
    
    return retrieveWorksFromPayload(payload.works)
}

export const fetchBooksBySubjectFew = async (subject: string) => {
    const url = `${baseUrl}/subjects/${subject}.json?limit=5`
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
    const url = `${baseUrl}/subjects/${subject}.json?limit=20`
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
    const url = `${baseUrl}/search.json?q=${formattedString}&limit=10`
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
            isbn: work.isbn ?? null,
            subtitle: work.subtitle ?? null,
            title: work.title,
            workKey: work.key,
            yearFirstPublished: work.first_publish_year
        }
    ))
    
    
}

