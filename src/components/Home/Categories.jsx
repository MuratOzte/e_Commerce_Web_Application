import React from 'react';

const categories = [
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLrx3Ue_THqzqhCmXJ6rJtv0UGgt1RZRFA2Q&usqp=CAU',
        title: 'Kiyafetler',
        to: '/products/1',
    },
    {
        src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
        title: 'Ayakkabilar',
        to: '/products/2',
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmidBRRnkPFw4iWkpdTocBNlgcBSU11GLrIg&usqp=CAU',
        title: 'Aksesuarlar',
        to: '/products/3',
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStONG7zUYkoVwnxCTHnQUNyx1WnEB7k9LApA&usqp=CAU',
        title: 'Spor Giyim',
        to: '/products/4',
    },
    {
        src: 'https://img2-hotic.mncdn.com/Content/Images/Thumbs/3483917_acik-mavi-kadin-canta-176886.jpeg',
        title: 'Çanta',
        to: '/products/5',
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXkl4ibH72dbNjpf3shlJUGi9wIGBDe8fwEg&usqp=CAU',
        title: 'İndirimli Ürünler',
        to: '/discountProducts',
    },
];

const Categories = () => {
    return (
        <div className="w-full mx-auto p-4">
            <div className="flex flex-wrap justify-evenly gap-6">
                {categories.map((category, index) => (
                    <a
                        href={category.to}
                        key={index}
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
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Categories;
