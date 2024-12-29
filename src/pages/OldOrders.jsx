import React from 'react';

const DUMMY = [
    {
        id: 'o1',
        items: [
            { id: 'i1', name: 'Burger', price: 50, quantity: 2 },
            { id: 'i2', name: 'Pizza', price: 100, quantity: 1 },
        ],
        carrier: 'FedEx',
        address: '123 Main St, City, Country',
        totalAmount: 200,
        date: new Date(2021, 7, 12),
    },
    {
        id: 'o2',
        items: [{ id: 'i3', name: 'Coffee', price: 30, quantity: 1 }],
        carrier: 'UPS',
        address: '123 Main St, City, Country',
        totalAmount: 30,
        date: new Date(2021, 7, 14),
    },
];

const OldOrders = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Geçmiş Siparişler</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DUMMY.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
                    >
                        <div className="mb-4">
                            <p className="text-gray-500 text-sm">
                                {order.date.toLocaleDateString()}
                            </p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-700 mb-2">
                                Ürünler
                            </h3>
                            <ul className="space-y-2">
                                {order.items.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex justify-between text-sm"
                                    >
                                        <span className="font-medium text-gray-600">
                                            {item.name}
                                        </span>
                                        <span className="text-gray-500">
                                            {item.quantity} x ${item.price}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-sm text-gray-600">
                            <p>
                                <span className="font-medium">Carrier: </span>
                                {order.carrier}
                            </p>
                            <p>
                                <span className="font-medium">Address: </span>
                                {order.address}
                            </p>
                            <p className="font-semibold text-gray-800 mt-2">
                                Total: ${order.totalAmount}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OldOrders;
