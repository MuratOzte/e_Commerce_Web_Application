import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const baseUrl = 'http://localhost:3000/auth/customerComments';

const UserComments = () => {
    const token = useSelector((state) => state.login.token);

    console.log(token);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Something Went Wrong !');
                }

                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, [token, baseUrl]);
    return <h1>Merhaba</h1>;
};

export default UserComments;
