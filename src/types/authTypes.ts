import { Session} from "@supabase/supabase-js"

export type AuthStoreType = {
    isLoading: boolean
    loadAuth: () => Promise<() => void>
    session: Session | null
}