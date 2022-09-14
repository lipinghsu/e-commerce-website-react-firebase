import cartTypes from "./cart.types";

export const addProduct = (nextCartItem, quantity) => ({
    type: cartTypes.ADD_TO_CART,
    payload: {nextCartItem, quantity}
});

export const removeCartItem = (cartItem) => ({
    type: cartTypes.REMOVE_CART_ITEM,
    payload: cartItem
})

export const updateCart = (cartItemToUpdate, quantity) => ({
    type: cartTypes.UPDATE_CART,
    payload: {cartItemToUpdate, quantity}
});

export const reduceCartItem = (cartItem) => ({
    type: cartTypes.REDUCE_CART_ITEM,
    payload: cartItem
})

export const clearCart = () => ({
    type: cartTypes.CLEAR_CART
})
