import ordersTypes from './orders.types';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleSaveOrder, handleGetUserOrderHistory, handleGetOrder } from './orders.helpers';
import { auth } from '../../firebase/utils';
import { clearCart } from '../Cart/cart.actions';
import { setUserOrderHistory, setOrderDetails } from './orders.actions'


export function* getUserOrderHistory({ payload }) {
    try{
        const history = yield handleGetUserOrderHistory(payload);       //payload is uid
        yield put(
            setUserOrderHistory(history)
        );

    } catch(error){
        console.log(error);
    }
}

export function* onGetUserOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
};


export function* saveOrder({ payload }){
    try{
        const timestamps = new Date();
        const userID = !auth.currentUser ? "Guest" : auth.currentUser.uid;
        yield handleSaveOrder({
            ...payload,
            orderUserID: userID,
            orderCreatedDate: timestamps
        });
        yield put(
            // (!)redirect user to a payment successful page here, then clearCart.
            
            clearCart()// -> cart item < 1     ->  will redirect to home
        )

    } catch(error){
        console.log(error);
    }
};

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};


export function* getOrderDetails({ payload }){
    try{
        const order = yield handleGetOrder(payload);
        yield put(
            setOrderDetails(order)
        )
    } catch (error){
        console.log(error)
    }
}

export function* onGetOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
};




export default function* ordersSagas(){
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart),
        call(onGetOrderDetailsStart),
    ])
}