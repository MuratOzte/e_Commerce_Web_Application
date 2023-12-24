import { useParams } from 'react-router-dom';

const Products = () => {
    const { id } = useParams();

    const baseUrl = 'http://localhost:3000/products/';

    const fetchedCategories = async () => {
        const response = await fetch(baseUrl + id);

        if (!response.ok) {
            throw new Error('Something Went Wrong !');
        }

        return response.json();
    };

    const fetchedData = fetchedCategories();
    console.log(fetchedData);

    return (
        <>
            <h1>{id}</h1>
        </>
    );
};

export default Products;
