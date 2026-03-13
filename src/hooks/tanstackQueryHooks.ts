import { useQuery } from "@tanstack/react-query"
import { fetchPopularBooks, fetchTrendingNowBooks, searchForBook } from "../services"
import { fetchBookAuthorDetails, fetchBookDetails } from "../services/bookService"

export const usePopularBooks = () => {
    return useQuery({
        queryKey: ["trending"],
        queryFn: fetchPopularBooks,
        staleTime: 1000 * 60 * 60
    })
}

export const useTrendingNowBooks = () => {
    return useQuery({
        queryKey: ["new"],
        queryFn: fetchTrendingNowBooks,
        staleTime: 1000 * 60 * 5
    })
}

export const useSearchBooks = (query: string) => {
    return useQuery({
        queryKey: ["search", "query", query],
        queryFn: () => searchForBook(query),
        enabled: query.length >= 2,
        staleTime: 1000 * 60 * 2
    })
}

export const useBookDetails = (olid: string) => {
    return useQuery({
        queryKey: ["book", olid],
        queryFn: () => fetchBookDetails(olid),
        staleTime: 1000 * 60 * 60
    })
}

export const useAuthorDetails = (key: string) => {
    return useQuery({
        queryKey: ["author", key],
        queryFn: () => fetchBookAuthorDetails(key),
        staleTime: 1000 * 60 * 60
    })
}

