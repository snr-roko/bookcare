import { create } from "zustand";
import { CartBottomSheetStoreType, WishlistItem } from "../types";

export const useCartBottomSheetStore = create<CartBottomSheetStoreType>((set, get) => ({
    cartItem: null,
    isOpen: false,
    openSheet: (item: WishlistItem) => set({cartItem: item, isOpen: true}),
    closeSheet: () => set({isOpen: false, cartItem: null})
}))