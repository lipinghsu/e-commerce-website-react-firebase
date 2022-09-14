import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import { useHistory, useParams } from "react-router-dom";
import Product from "./Product";
import FormSelect from "../forms/FormSelect";
import LoadMore from "../LoadMore";
import filterImage from "../../assets/filterImage.png"


import "./styles.scss"

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const ProductResults = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();
    const { products } = useSelector(mapState);
    
    const { data, queryDoc, isLastPage } = products;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        )
    }, [filterType]);
    

    if(!Array.isArray(data)){
        return null;
    }
    if(data.length < 1){
        return(
            <div className="produdcts">
                <p>
                    No results.
                </p>
            </div>
        );
    }

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    };

    const configFilters = {
        defaultValue: filterType,
        image: filterImage,
        options: [{
            name: 'Show All',
            value: ''
        }, {
            name: 'Mens',
            value: 'mens'
        },{
            name: 'Womens',
            value: 'womens'
        }],
        handleChange: handleFilter
    };

    const handleLoadMore = () =>{
        dispatch(
            fetchProductsStart({ 
                filterType, 
                startAfterDoc: queryDoc,
                persistProducts: data 
            })
        )
    };
    const configLoadMore = {
        onLoadMoreEvent: handleLoadMore,
    };

    return (
        <div className="products">
            {/* <h1 className="page-title">
                Shop
            </h1> */}

            {/* <FormSelect {...configFilters}/> */}

            <div className="productResults">
                {data.map((product, pos) =>{
                    const { productThumbnail, productName, productPrice, downloadUrls } = product;
                    if(!productThumbnail || !productName || typeof productPrice === 'undefined' || !downloadUrls){
                        return null;
                    }
                    const configProduct = {
                        ...product
                    };
                    return (
                        <Product {...configProduct}/> // render each loaded product
                    );
                })}
            </div>

            {!isLastPage && (
                <LoadMore {...configLoadMore} />
            )}
        </div>
    );
};

export default ProductResults;