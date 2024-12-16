import Link from 'next/link';
import React from 'react';

const RelatedTools = () => {
    const categories = [
        { name: "object Removal", link: "/tools/object-remover" },
        { name: "Products", link: "/products" },
        { name: "Animals", link: "/animals" },
        { name: "Cars", link: "/cars" },
        { name: "Graphics", link: "/graphics" },
    ];

    return (
        <div className='flex flex-col justify-center items-center my-20'> {/* Categories Filter */}
        <p className='text-center font-bold text-2xl'>You might also b interested in</p>
            <div className="w-full flex justify-center mt-4 flex-col items-center">
                <div className="flex gap-4 overflow-x-auto px-4 pb-3">
                    {categories.map((category) => (
                        <Link
                            href={category.link}
                            key={category.name}
                            className={`px-4 py-2 rounded-full bg-[#f7f9fc] hover:bg-black/10 text-black`}
                        >
                            {category.name} 
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedTools;
