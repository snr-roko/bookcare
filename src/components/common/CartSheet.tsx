import { useCartBottomSheetStore } from "@/src/store"
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet"
import { useEffect, useRef, useState } from "react"
import { Text } from "react-native"

const CartBottomSheet = () => {
    const bottomSheetRef = useRef<BottomSheet>(null)

    const closeSheet = useCartBottomSheetStore(state => state.closeSheet)
    const isOpen = useCartBottomSheetStore(state => state.isOpen)
    const item = useCartBottomSheetStore(state => state.cartItem)
    console.log(isOpen)
    console.log("item: ", item)
    console.log(bottomSheetRef)

    const [quantity, setQuantity] = useState<number>(0)

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={isOpen ? 0 : -1} 
            snapPoints={['25%']}
            enablePanDownToClose
            onClose={closeSheet}
            style={{ zIndex: 999 }}
            backgroundStyle={{ backgroundColor: '#FFFFFF' }}
            handleIndicatorStyle={{ backgroundColor: '#E8D5B7' }}
>
            <Text>Add to Cart</Text>

        </BottomSheet>
    )
}

export default CartBottomSheet