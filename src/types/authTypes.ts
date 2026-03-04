import { Session} from "@supabase/supabase-js"
import { infer as zodInfer } from "zod"
import { LoginSchema } from "../schemas"

export type AuthStoreType = {
    isLoading: boolean
    loadAuth: () => Promise<() => void>
    session: Session | null
}

export type LoginFormType = zodInfer<typeof LoginSchema>