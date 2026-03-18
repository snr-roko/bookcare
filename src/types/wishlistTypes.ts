export type WishlistItem = {
    id: string,
    title: string,
    coverId: string,
    coverUrl: string,
    authorName: string,
    authorKey: string,
    price: string,
    rating: string,
    editionCount: string,
    yearFirstPublished: string
}

export type WishlistStore = {
    items: WishlistItem[]
    addToWishlist: (item: WishlistItem) => void
    removeFromWishlist: (workKey: string) => void
    isInWishlist: (workKey: string) => boolean
}