import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 group">
            <img
                src={`http://localhost:3000/${product.product_image}`}
                alt={product.product_name}
                className="w-full h-48 object-cover"
            />
            <div className="flex justify-between items-center p-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {product.product_name}
                    </h3>
                    <p className="text-gray-500">Fiyat: {product.price} ₺</p>
                </div>
                <div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
