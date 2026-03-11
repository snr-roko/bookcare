import { useQuery } from "@tanstack/react-query"
import { fetchPopularBooks, fetchTrendingNowBooks, searchForBook } from "../services"

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