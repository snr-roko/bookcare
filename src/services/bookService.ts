import { openLibraryBaseUrl } from "../constants"
import { retrieveAuthorDetailsFromPayload, retrieveBookDetailsFromPayload } from "../utils"

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
    const url = `${openLibraryBaseUrl}/authors/${authorKey}.json`
    const response = await fetch(url, {
            method: "GET"
        })
    
    if (!response.ok) throw new Error("Error fetching Book Details")
        
    const payload = await response.json()

    return retrieveAuthorDetailsFromPayload(payload)
}