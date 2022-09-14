import { createSelector } from "reselect";

export const selectCartData = state => state.cartData;

export const selectCartItems = createSelector(
    [selectCartData],
    cartData => cartData.cartItems
);

// totalNumCartItems
export const selectCartItemsCount = createSelector(
    [selectCartItems], cartItems => cartItems.reduce
    ((quantity, cartItem) => quantity + cartItem.quantity, 0)    //default = 0  
)

// subtotal
export const selectCartTotal = createSelector(
    [selectCartItems], cartItems => cartItems.reduce(
        (quantity, cartItem) => parseFloat((
            parseFloat((quantity).toFixed(2)) + 
            parseFloat((cartItem.quantity * cartItem.productPrice).toFixed(2))
        ).toFixed(2)), 0)
)