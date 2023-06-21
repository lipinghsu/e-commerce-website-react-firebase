import React from "react";
import { Link } from "react-router-dom";

const addZeroes = num => Number(num).toFixed(Math.max(num.split('.')[1]?.length, 2) || 2)

const Product = (product) => {
    const { documentID, productThumbnail, productName, productPrice,  downloadUrls} = product;

    if(!documentID || !productThumbnail || !productName || typeof productPrice === 'undefined' || !downloadUrls){
        return null;
    }
    const hoverImage = (downloadUrls && downloadUrls.length > 1) ? downloadUrls[1] : productThumbnail;
    return (
        <div className="product">
            <div className="thumbnail">
                <Link to={`/product/${documentID}`}>
                    <img src={productThumbnail} alt={productName} 
                    onMouseOver={e => {(e.currentTarget.src = hoverImage)}}
                    onMouseOut={e => (e.currentTarget.src = productThumbnail)}/>
                </Link>
            </div>

            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            <Link to={`/product/${documentID}`}>
                                { productName }
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span className="price">
                            ${ addZeroes(productPrice.toString()) } USD
                        </span>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default Product;