import AsyncStorage from "@react-native-async-storage/async-storage"
import {createClient} from "@supabase/supabase-js"

const supabaseUrl = "https://msuagkmborpxluvyyhxx.supabase.co"
const supabaseKey = "sb_publishable_ItfAbvNU3Le7LHy1oJtg-Q_qh8pFq_a"

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true, 
        detectSessionInUrl: false
    }
})