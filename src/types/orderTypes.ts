export type OrderItemType = {
    id?: number
    title: string
    authorName: string
    coverUrl: string
    authorKey: string
    yearFirstPublished: string
    price: number
    editionCount: number
    quantity: number
    orderId: number
    workKey: string
}

export type Order = {
    id?: number
    numberOfBooks: number
    totalAmount: number
    orderDate?: string
    deliveryDate: string
    userId: number
    PaymentMethod: "card" | "mobileMoney"
}

export type SupabaseOrder = {
    id?: number
    number_of_books: number
    total_amount: number
    delivery_date: string
    order_date: string
    user_id: number
    payment_method: "card" | "mobileMoney"
}

export type SupabaseOrderItem = {
    id?: number
    author_name: string
    cover_url: string
    author_key: string
    year_first_published: string
    edition_count: number
    order_id: number
    price: number
    quantity: number
    title: string
    work_key: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'