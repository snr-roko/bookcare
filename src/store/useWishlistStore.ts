import { create } from "zustand"
import { WishlistStore } from "../types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {persist, createJSONStorage} from "zustand/middleware"

export const useWhishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addToWishlist: (item) => {
                set(state => ({items: [...state.items, item]}))
            },
            removeFromWishlist: (workKey) => {
                set(state => ({items: state.items.filter(item => item.id !== workKey)}))
            }
        }),
        {
            name: "bookcare-wishlist",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)