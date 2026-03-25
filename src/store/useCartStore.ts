import { create } from "zustand";
import { CartItemType, CartStoreType } from "../types";
import {persist, createJSONStorage} from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCartStore = create<CartStoreType>()(
    persist((set, get) => ({
        cart: [],
        addToCart: (cartItem) => {
            set((state) => ({cart: [...state.cart, cartItem]}))
        },
        removeFromCart: (cartKey) => {
            set((state) => ({
                cart: state.cart.filter((cartItem) => cartItem.itemDetails.id !== cartKey)
            }))
        },
        decreaseCartItemQuantity: (cartKey) => {
            set((state) => ({
                cart: state.cart
                    .map((cartItem) => cartItem.itemDetails.id === cartKey
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                    )
                    .filter((cartItem) => cartItem.quantity > 0)
            }))
        },
        increaseCartItemQuantity: (cartKey) => {
            set((state) => ({
                cart: state.cart.map((cartItem) => cartItem.itemDetails.id === cartKey
                    ? { ...cartItem, quantity: Math.min(cartItem.quantity + 1, 20) }
                    : cartItem
                )
            }))
        },
        clearCart: () => {
            set({cart: []})
        }
    })
, {
    name: "cart",
    storage: createJSONStorage(() => AsyncStorage)
}
)
)