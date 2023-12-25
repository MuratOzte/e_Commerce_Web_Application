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

                const fetchedData = await response.json();
                setResult(fetchedData);
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
                result.products.reduce((acc, product, index) => {
                    const rowIndex = Math.floor(index / 3);

                    if (!acc[rowIndex]) {
                        acc[rowIndex] = [];
                    }

                    acc[rowIndex].push(product);

                    return acc;
                }, []).map((rowProducts, rowIndex) => (
                    <div
                        key={rowIndex}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {rowProducts.map((product) => (
                            <Product
                                key={product.product_id}
                                price={product.price}
                                codeId={product.code_id}
                                url={product.product_image}
                                title={product.product_name}
                            />
                        ))}
                    </div>
                ))}
            <h1>{id}</h1>
        </>
    );
};

export default Products;