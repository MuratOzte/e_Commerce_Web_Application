import Product from '../components/products/Product';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.login.token);

    const baseUrl = 'http://localhost:3000/products/';

    let data;

    useEffect(() => {
        const fetchedCategories = async () => {
            try {
                const response = await fetch(baseUrl + id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Something Went Wrong !');
                }

                data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchedCategories();
    }, [id, baseUrl]);


    return (
        <>
            
            <Product />
            <h1>{id}</h1>
        </>
    );
};

export default Products;
