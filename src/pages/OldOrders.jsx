import React, { useEffect, useState } from 'react';

const OldOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/getPayments',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const data = await response.json();
                setOrders(data.payments); // Veriyi doğrudan alıyoruz
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    if (!orders.length) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Geçmiş Siparişler
                </h1>
                <p className="text-center">Yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">
                Geçmiş Siparişler
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <div
                        key={order.order_id}
                        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Sipariş ID: {order.order_id}
                            </h3>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">
                                    Kargo Şirketi:{' '}
                                </span>
                                {order.carrier_id}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Adres: </span>
                                {order.shipping_address}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold text-gray-800 mb-2">
                                Ürünler:
                            </h4>
                            <ul className="space-y-2">
                                {order.items.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between text-sm"
                                    >
                                        <span className="font-medium text-gray-600">
                                            {item.product_name}
                                        </span>
                                        <span className="text-gray-500">
                                            {item.quantity} x {item.price} TL
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OldOrders;
