import { useQuery } from "@tanstack/react-query"
import { fetchPopularBooks, fetchTrendingNowBooks, searchForBook } from "../services"
import { fetchBookAuthorDetails, fetchBookDetails, fetchBooksBySubject, fetchBooksBySubjectFew } from "../services/bookService"
import { fetchOrderItemsOfAnOrder, fetchOrders } from "../utils"

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

export const useSearchBooksBySubject = (subject: string) => {
    return useQuery({
        queryKey: ["search", "subject", subject],
        queryFn: () => fetchBooksBySubject(subject),
        staleTime: 1000 * 60 * 60,
        enabled: !!subject
    })
}

export const useSearchBooksBySubjectFew = (subject: string) => {
    return useQuery({
        queryKey: ["search", "subject", subject],
        queryFn: () => fetchBooksBySubjectFew(subject),
        staleTime: 1000 * 60 * 60,
        enabled: !!subject
    })
}

export const useFetchOrders = (userId: string) => {
    return useQuery({
        queryKey: ["orders", "user", userId],
        queryFn: () => fetchOrders(userId),
        staleTime: 1000 * 60 * 60
    })
}

export const useFetchOrderDetails = (orderId: number) => {
    return useQuery({
        queryKey: ["order", "details", orderId],
        queryFn: () => fetchOrderItemsOfAnOrder(orderId),
        staleTime: 1000 * 60 * 60
    })
}

