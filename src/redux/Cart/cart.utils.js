export const existingCartItem = ({prevCartItems, nextCartItem}) => {

    return prevCartItems.find(
        cartItem => cartItem.documentID === nextCartItem.documentID && cartItem.size === nextCartItem.size
    );
};

export const handleAddToCart = ({prevCartItems, nextCartItemData}) => {
    const nextCartItem = nextCartItemData.nextCartItem;
    const quantityIncrement = nextCartItemData.quantity ? nextCartItemData.quantity : 1;
    const cartItemExists = existingCartItem({prevCartItems, nextCartItem});
    
    if(cartItemExists){
        // the item being added already exists in the cart -> find the item and inc quanitity
        return prevCartItems.map(
            cartItem => cartItem.documentID === nextCartItem.documentID  && cartItem.size === nextCartItem.size ? {
                ...cartItem,
                quantity: cartItem.quantity + quantityIncrement
            } : cartItem // already exist but not the one that we're trying to add (???)
        )
    }
    
    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            quantity: quantityIncrement
        }
    ];
};

export const handleRemoveCartItem = ({prevCartItems, cartItemToRemove}) => {
    return prevCartItems.filter(item => item.documentID !== cartItemToRemove.documentID || item.size !== cartItemToRemove.size);    
};


export const handleReduceCartItem = ({prevCartItems, cartItemToReduce}) => {
    const existingCartItem = prevCartItems.find(cartItem => cartItem.documentID === cartItemToReduce.documentID && cartItem.size === cartItemToReduce.size);
    
    if(existingCartItem.quantity === 1){
        return prevCartItems.map(
            cartItem => cartItem.documentID === existingCartItem.documentID && cartItem.size === existingCartItem.size ? {
                ...cartItem,
                quantity: cartItem.quantity
            } : cartItem
        )
        // remove item from cart
        // return prevCartItems.filter(
        //     cartItem => cartItem.documentID !== existingCartItem.documentID //only returning when this is ture
        // );
    }

    // reduce quantity
    return prevCartItems.map(
        cartItem => cartItem.documentID === existingCartItem.documentID && cartItem.size === existingCartItem.size? {
            ...cartItem,
            quantity: cartItem.quantity - 1
        } : cartItem
    )
}

export const handleUpdateCart = ({prevCartItems, cartItemToUpdateData}) => {
    const cartItemToUpdate = cartItemToUpdateData.cartItemToUpdate;
    const newQuantity = cartItemToUpdateData.quantity;
    
    if(newQuantity === 0){
        // remove item from cart
        return prevCartItems.filter(
            cartItem => (cartItem.documentID !== cartItemToUpdate.documentID  || cartItem.size !== cartItemToUpdate.size)//only returning when this is ture
        );
    }
    
    return prevCartItems.map(
        cartItem => cartItem.documentID === cartItemToUpdate.documentID && cartItem.size === cartItemToUpdate.size? {
            ...cartItem,
            quantity: newQuantity
        } : cartItem
    )
};