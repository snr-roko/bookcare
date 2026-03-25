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
    decreaseCartItemQuantity: (cartKey: string) => void
    clearCart: () => void
}

export type CartBottomSheetStoreType = {
    cartItem: WishlistItem | null
    isOpen: boolean
    openSheet: (item: WishlistItem) => void
    closeSheet: () => void
}