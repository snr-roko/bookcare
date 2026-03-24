import { supabase } from "../lib/supabase"

export const fetchOrders = async (userId: string) => {
    const {data, error} = await supabase.from("Order")
        .select()
        .eq("user_id", userId)
        .order("order_date", {ascending: false})
    
    if (error) throw new Error(error.message)
    
    return data
}