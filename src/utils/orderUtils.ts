import { number } from "zod"
import { supabase } from "../lib/supabase"
import { OrderStatus } from "../types"
import { colors } from "../constants"

export const fetchOrders = async (userId: string) => {
    const {data, error} = await supabase.from("Order")
        .select()
        .eq("user_id", userId)
        .order("order_date", {ascending: false})
    
    if (error) throw new Error(error.message)
    
    return data
}

export const fetchOrderItemsOfAnOrder = async (orderId: number) => {
    const {data, error} = await supabase.from("OrderItem")
        .select()
        .eq("order_id", orderId)

    if (error) throw new Error(error.message)
    console.log(data)
    return data
}

export const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':    return colors.textMuted  
    case 'confirmed':  return colors.primary  
    case 'processing': return colors.accent  
    case 'shipped':    return `${colors.success}/10`  
    case 'delivered':  return colors.success 
    case 'cancelled':  return colors.error
  }
}

export const deriveOrderStatus = (orderDate: string, deliveryDate: string): OrderStatus => {
  const now = new Date()
  const placed = new Date(orderDate)
  const delivery = new Date(deliveryDate)
  
  const hoursSincePlaced = (now.getTime() - placed.getTime()) / (1000 * 60 * 60)
  
  if (now >= delivery) return 'delivered'
  if (hoursSincePlaced >= 24) return 'shipped'
  if (hoursSincePlaced >= 12) return 'processing'
  if (hoursSincePlaced >= 1) return 'confirmed'
  return 'pending'
}