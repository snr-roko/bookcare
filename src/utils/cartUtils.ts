import { CartItemType } from "../types";

export const calculateSubTotal = (cart: CartItemType[]) => {
    const subTotal: number = cart.reduce((sum, cartItem) => sum + parseInt(cartItem.itemDetails.price) * cartItem.quantity, 0) 
    return subTotal.toFixed(2)
}

export const calculateDeliveryFee = (subTotal: number) => {
    let deliveryFee: number
  
    if (subTotal >= 500) deliveryFee = 60 
    else if (subTotal >= 300) deliveryFee = 40  
    else if (subTotal >= 200) deliveryFee = 25
    else if (subTotal >= 100) deliveryFee = 10
    else if (subTotal >= 50) deliveryFee = 5.00    
    else deliveryFee = 0.00
    
    return deliveryFee.toFixed(2)
}

export const calculateTotalAmount = (subTotal: number, deliveryFee: number) => {
    return (subTotal + deliveryFee).toFixed(2)
}