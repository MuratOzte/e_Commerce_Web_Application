import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    {
        src: 'https://productimages.hepsiburada.net/s/777/300-400/110000811235714.jpg/format:webp',
        title: 'Kiyafetler',
        to: '/products/1',
    },
    {
        src: 'https://productimages.hepsiburada.net/s/446/300-400/110000480198022.jpg/format:webp',
        title: 'Ayakkabilar',
        to: '/products/2',
    },
    {
        src: 'https://productimages.hepsiburada.net/s/777/300-400/110000820630583.jpg/format:webp',
        title: 'Aksesuarlar',
        to: '/products/3',
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStONG7zUYkoVwnxCTHnQUNyx1WnEB7k9LApA&usqp=CAU',
        title: 'Spor Giyim',
        to: '/products/4',
    },
    {
        src: 'https://productimages.hepsiburada.net/s/777/300-400/110000769204458.jpg/format:webp',
        title: 'Çanta',
        to: '/products/5',
    },
    {
        src: 'https://static.ticimax.cloud/cdn-cgi/image/width=540,quality=85/8423/uploads/urunresimleri/buyuk/duz-indirim-donkarti-kenarsiz-kare-cift--30d6.jpg',
        title: 'İndirimli Ürünler',
        to: '/discountProducts',
    },
];

const Categories = () => {
    return (
        <div className="w-full mx-auto p-4">
            <div className="flex flex-wrap justify-evenly gap-6">
                {categories.map((category, index) => (
                    <Link
                        to={category.to}
                        key={index+'link'}
                        className="relative group w-48 bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ring-2 ring-gray-200"
                    >
                        <img
                            src={category.src}
                            alt={category.title}
                            className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                        <div className="absolute flex justify-center w-full bottom-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-lg font-bold">
                                {category.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
