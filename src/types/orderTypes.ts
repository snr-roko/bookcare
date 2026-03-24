export type OrderItemType = {
    id?: number
    title: string
    authorName: string
    coverUrl: string
    price: number
    quantity: number
    orderId: number
    paymentMethod: "card" | "mobileMoney"
}

export type Order = {
    id?: number
    numberOfBooks: number
    totalAmount: number
    orderDate?: string
    deliveryDate: string
    userId: number
}

export type SupabaseOrder = {
    id?: number
    number_of_books: number
    total_amount: number
    delivery_date: string
    user_id: number
}

export type SupabaseOrderItem = {
    id?: number
    author_name: string
    cover_url: string
    order_id: number
    price: number
    quantity: number
    title: string
    payment_method: "card" | "mobileMoney"
}