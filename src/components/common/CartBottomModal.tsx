import { useCartBottomSheetStore } from "@/src/store"
import { Modal, Pressable, Text, View } from "react-native"
import {BlurView} from "expo-blur"
import { Image } from "expo-image"
import { colors } from "@/src/constants"
import { Button, ButtonText } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/src/utils"
import { CartItemType, WishlistItem } from "@/src/types"
import { useCartStore } from "@/src/store/useCartStore"

const CartBottomModal = () => {

    const [quantity, setQuantity] = useState<number>(0)

    const addToCart = useCartStore((state) => state.addToCart)

    const isOpen = useCartBottomSheetStore(state => state.isOpen)
    const item = useCartBottomSheetStore(state => state.cartItem)
    const closeSheet = useCartBottomSheetStore(state => state.closeSheet)
    console.log(isOpen)
    console.log("item: ", item)


    const increaseQuantity = () => {
        if (quantity === 20) return
        setQuantity(prev => prev + 1)
    }

    const decreaseQuantity = () => {
        if (quantity === 0) return
        setQuantity(prev => prev - 1)
    }

    const addCartItemToCart = () => {
        if (quantity === 0) return
        const book: WishlistItem = {
            id: item!.id,
            title: item!.title,
            coverId: item!.coverId,
            coverUrl: item!.coverUrl,
            authorName: item!.authorName,
            authorKey: item!.authorKey,
            price: item!.price,
            rating: item!.rating,
            editionCount: item!.editionCount,
            yearFirstPublished: item!.yearFirstPublished
        }

        const cartItemQuantity = quantity

        const cartItem: CartItemType = {
            itemDetails: book,
            quantity: cartItemQuantity
        }

        addToCart(cartItem)
        setQuantity(0)
        closeSheet()
    }

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="slide"
            onRequestClose={closeSheet}
            style={{backgroundColor: "transparent", flex: 1}}
        >
            <BlurView
                intensity={20}
                tint="regular"
                style={{ flex: 5 }}
                onTouchEnd={closeSheet}
            />
            {/* <Pressable
                onPress={closeSheet} 
                className="bg-transparent flex-1"
            /> */}

            <View 
                className="bg-bookcare-surface p-5 gap-5 pb-5 justify-center"
                style={{
                    borderTopWidth: 2,
                    borderTopColor: colors.mid,
                    flex: 2
                }}
                >
                <Text className="text-2xl text-bookcare-primary font-bold text-center">Add Book to cart</Text>
                <View
                    style={{
                        overflow: "hidden",
                        borderRadius: 8,
                        elevation: 2,
                    }}
                    className="flex-row p-3 gap-5 bg-white dark:bg-bookcare-darkCard">
                    <View className="items-center">
                        <Image
                            style={{ height: 130, width: 100}}
                            source={{ uri: item?.coverUrl }}
                            placeholder={colors.bookCardBlurHash}
                            transition={300}
                            contentFit="cover"
                        />
                    </View>
                    <View className="flex-1 justify-between">
                        <View>
                            <Text numberOfLines={2} className="text-lg flex-shrink font-semibold text-bookcare-textDark dark:text-bookcare-darkText">
                                {item?.title}
                            </Text>
                        </View>
                        <View>
                            <Text numberOfLines={1} className="text-bookcare-textMuted text-sm">
                                {item?.authorName}
                            </Text>
                            <Text className="text-lg font-bold text-bookcare-textDark dark:text-bookcare-darkText">GHS {item?.price}</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center gap-3">
                                <Button onPress={decreaseQuantity} size="md" className="rounded-xl bg-bookcare-mid">
                                    <ButtonText className="text-bookcare-primary font-bold text-2xl">-</ButtonText>
                                </Button>
                                <Text className="text-bookcare-textDark dark:text-bookcare-darkText font-semibold text-xl">{quantity}</Text>
                                <Button onPress={increaseQuantity} size="md" className="rounded-xl bg-bookcare-mid">
                                    <ButtonText className="text-bookcare-primary font-bold text-2xl">+</ButtonText>
                                </Button>
                            </View>
                            <View>
                                <Button
                                onPress={addCartItemToCart} 
                                disabled={quantity < 1}
                                className={cn([
                                    {"bg-bookcare-primary":  quantity > 0, "bg-bookcare-mid": quantity < 1},
                                    "rounded-xl", "px-5" 
                                ])}>
                                    <ButtonText className="text-white font-semibold">
                                        Add
                                    </ButtonText>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CartBottomModal