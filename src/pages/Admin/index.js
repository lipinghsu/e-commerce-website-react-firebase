import React, { useState, useEffect } from 'react';
import { firestore } from './../../firebase/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from '../../redux/Products/products.actions';

import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import Button from './../../components/forms/Button';
import FormSelect from './../../components/forms/FormSelect';
import LoadMore from './../../components/LoadMore';
import TextInput from '../../components/forms/TextInput';

import './styles.scss';

const mapState =  ({ productsData }) => ({
    products: productsData.products
});

const Admin = props => {
    const { products } = useSelector(mapState);
    const { data, queryDoc, isLastPage } = products;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        );

    }, []); // the empty array ensures that this only runs on the first initial render of the component    

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        );
    };

    const configLoadMore = {
        onLoadMoreEvent: handleLoadMore,
    };

    return (
        <div className="admin">

            <div className="manageProducts">
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>
                                Selling ({Array.isArray(data) ? data.length : null} active)
                            </th>
                        </tr>
                        <tr>
                            <table className='results' border="0" cellPadding="10" cellSpacing="0">
                                <tbody>
                                    <tr>
                                        <td>
                                            {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                                                const {
                                                    productName,
                                                    productThumbnail,
                                                    productPrice,
                                                    documentID
                                                } = product;
                                                return(
                                                    <tr key={index}>
                                                        <td className='td-thumbnail'>
                                                            <img className="thumb" src={productThumbnail} />
                                                        </td>
                                                        <td className='td-product-details'>
                                                            <div className='box-product-details'>
                                                                <div className='title'>{productName}</div>
                                                                <div className='price'>US${parseFloat(productPrice).toFixed(2)}</div>
                                                            </div>
                                                        </td>
                                                        <td className='td-button'>
                                                            <Button className="btn btn-delete" onClick={() => dispatch(deleteProductStart(documentID))}>
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </tr>

                        <tr className='empty-space'>
                            <td>

                            </td>
                        </tr>

                        <tr>
                            <td>
                            <table border="0" cellPadding="10px" cellSpacing="0">
                                <tr>
                                    <td>
                                        {!isLastPage && (
                                            <LoadMore {...configLoadMore} />
                                        )}
                                    </td>
                                </tr>
                            </table>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Admin;