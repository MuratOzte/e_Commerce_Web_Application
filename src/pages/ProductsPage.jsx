import Product from '../components/products/Product';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.login.token);
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState(null);

    const baseUrl = 'http://localhost:3000/products/';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl + id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Something Went Wrong !');
                }

                const assd = await response.json();
                setResult(assd);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, baseUrl, token]);

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
                result &&
                result.products.map((e) => (
                    <>
                        <Product
                            key={e.product_id}
                            price={e.price}
                            codeId={e.code_id}
                            url={e.product_image}
                            title={e.product_name}
                        />
                    </>
                ))}
            <h1>{id}</h1>
        </>
    );
};

export default Products;
