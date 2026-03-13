import { openLibraryBaseUrl } from "../constants"
import { retrieveAuthorDetailsFromPayload, retrieveBookDetailsFromPayload, retrieveWorksFromPayloadForSubjects } from "../utils"

export const fetchBookDetails = async (olid: string) => {
    const url = `${openLibraryBaseUrl}/works/${olid}.json`
    const response = await fetch(url, {
        method: "GET"
    })

    if (!response.ok) {
        throw new Error("Error fetching Book Details")
    }

    const payload = await response.json()

    return retrieveBookDetailsFromPayload(payload)
}

export const fetchBookAuthorDetails = async (authorKey: string) => {
    const formattedAuthorKey = authorKey.startsWith("/authors/") ? authorKey.replace("/authors/", "") : authorKey
    const url = `${openLibraryBaseUrl}/authors/${formattedAuthorKey}.json`
    const response = await fetch(url, {
            method: "GET"
        })
    
    if (!response.ok) throw new Error("Error fetching Book Details")
        
    const payload = await response.json()

    return retrieveAuthorDetailsFromPayload(payload)
}

export const fetchBooksBySubjectFew = async (subject: string) => {
    const url = `${openLibraryBaseUrl}/subjects/${subject}.json?limit=5&details=true`
    const response = await fetch(url, {
        method: "GET"
    })

    if (!response.ok) {
        throw new Error("Error fetching Popular books")
    }

    const payload = await response.json()
    
    return retrieveWorksFromPayloadForSubjects(payload.works)
}
