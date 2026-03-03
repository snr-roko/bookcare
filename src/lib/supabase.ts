import {createClient} from "@supabase/supabase-js"
import * as SecureStore from "expo-secure-store"

const supabaseUrl = "https://msuagkmborpxluvyyhxx.supabase.co"
const supabaseKey = "sb_publishable_ItfAbvNU3Le7LHy1oJtg-Q_qh8pFq_a"

const SupabaseSecureStoreAdapter = {
    getItem: (key: string) => SecureStore.getItemAsync(key),
    setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
    removeItem: (key: string) => SecureStore.deleteItemAsync(key)
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: SupabaseSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true, 
        detectSessionInUrl: false
    }
})