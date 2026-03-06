import {create} from "zustand"
import { AuthStoreType } from "../types"
import { supabase } from "../lib/supabase"

export const useAuthStore = create<AuthStoreType>((set, get) => (
    {
        isLoading: false,
        loadAuth: async () => {
            set({isLoading: true})
            const {data, error} = await supabase.auth.getSession()
            if (error) console.log(`Error happened during initialization: ${error}`)
            
            set({session: data?.session ?? null})
            set({isLoading: false})

            const {data: {subscription}} = supabase.auth.onAuthStateChange(
                async (_event, _session) => {
                    console.log(`Auth state changed: ${_event}`)
                    set({session: _session ?? null})
                }
            )

            return () => {subscription.unsubscribe()}
        },
        session: null
    }
))