import { openLibraryBaseUrl } from "../constants"
import { openLibraryFetch } from "../lib/openLibrary"
import { retrieveAuthorDetailsFromPayload, retrieveBookDetailsFromPayload, retrieveWorksFromPayloadForSubjects } from "../utils"

export const fetchBookDetails = async (olid: string) => {
    const url = `${openLibraryBaseUrl}/works/${olid}.json`

    const payload = await openLibraryFetch(url)

    return retrieveBookDetailsFromPayload(payload)
}

export const fetchBookAuthorDetails = async (authorKey: string) => {
    const formattedAuthorKey = authorKey.startsWith("/authors/") ? authorKey.replace("/authors/", "") : authorKey
    const url = `${openLibraryBaseUrl}/authors/${formattedAuthorKey}.json`
        
    const payload = await openLibraryFetch(url)

    return retrieveAuthorDetailsFromPayload(payload)
}

export const fetchBooksBySubjectFew = async (subject: string) => {
    const formattedSubject = subject.toLowerCase().replace(/ /g, '_')

    const url = `${openLibraryBaseUrl}/subjects/${formattedSubject}.json?limit=5&details=true`

    const payload = await openLibraryFetch(url)
    
    return retrieveWorksFromPayloadForSubjects(payload.works)
}