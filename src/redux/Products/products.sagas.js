import { takeLatest, put, all, call } from 'redux-saga/effects';
import productsTypes from './products.types';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct, handleFetchProduct } from './products.helpers';
import { fetchProductsStart, setProducts, setProduct } from './products.actions';
import { auth } from '../../firebase/utils';


export function* addProduct({ payload }){
    try{
        const timestamp = new Date();
        yield handleAddProduct({
            ...payload,
            productAdminUserUID: auth.currentUser.uid,       //current user id of the LOGGED IN user
            createdDate: timestamp,
            
        });

        // fetch to product
        yield put(
            fetchProductsStart()
        );
        
    } catch (error){

        console.log(error);
    }

}

export function* onAddProductStart(){
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
    try{
        const products = yield handleFetchProducts(payload);
        yield put(
            setProducts(products)
        );
    } catch(error){
        console.log(error);
    }
}

export function* onFetchProductsStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }){
    try{
        yield handleDeleteProduct(payload);
        yield put(
            fetchProductsStart()
        );

    } catch(error){
        console.log(error);
    }
}

export function* onDeleteProductStart(){
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}



export function* fetchProduct({ payload }){
    try{
        const product = yield handleFetchProduct(payload);
        yield put(
            setProduct(product),
        )
        
    } catch(error){
        console.log(error)
    }
}

export function* onFetchProductStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START,fetchProduct);
}







export default function* productsSagas(){
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onFetchProductStart),
    ])
}