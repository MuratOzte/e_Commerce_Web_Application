import ProductCard from '../components/Home/ProductCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Products = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

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
                    throw new Error('Something Went Wrong!');
                }

                const fetchedData = await response.json();
                setProducts(fetchedData.products || []);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, baseUrl, token]);

    return (
        <div className="container mx-auto p-4">
            {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="flex flex-wrap gap-6 justify-center">
                    {products.map((product) => (
                        <ProductCard
                            key={product.product_id}
                            product={{
                                product_id: product.product_id,
                                product_name: product.product_name,
                                price: product.price,
                                product_image: product.product_image,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
