import * as React from 'react';
import MediaCard from '../Home/MediaCards';

const Product = (props) => {
    return (
        <>
            <MediaCard
                url={props.url}
                title={props.title}
                price={props.price}
                codeId={props.codeId}
            />
        </>
    );
};

export default Product;
