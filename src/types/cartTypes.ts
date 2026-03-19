import { WishlistItem } from "./wishlistTypes";

export type CartItemType = {
    itemDetails: WishlistItem
    quantity: number
}

export type CartStoreType = {
    cart: CartItemType[]
    addToCart: (cartItem: CartItemType) => void
    removeFromCart: (cartKey: string) => void
    increaseCartItemQuantity: (cartKey: string) => void
    decreateCartItemQuantity: (cartKey: string) => void
}