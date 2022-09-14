import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import cartReducer from './Cart/cart.reducer';
import ordersReducer from './Orders/orders.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer,
    ordersData: ordersReducer
});

const configStorage = {
    key: 'root',
    storage,                        // imported local storage
    whitelist: ['cartData']         // all state that we want to persist
}

export default persistReducer(configStorage, rootReducer);