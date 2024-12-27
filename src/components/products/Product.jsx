import * as React from 'react';
import MediaCard from '../Home/MediaCards';
import ProductCard from '../Home/ProductCard';

const Product = (props) => {
    return (
        <>
            <ProductCard product={props.product} />
        </>
    );
};

export default Product;
