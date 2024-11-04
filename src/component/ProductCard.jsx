import React from 'react';
import Button from './Button';

const ProductCard = ({ product }) => {
    console.log(product);
    return (
        <div className='bg-gray-900 rounded-lg'>
            {/* Discount and Category */}
            <div className='flex items-center justify-between p-4'>
                <p className=' bg-gray-800 rounded-md px-2'>{Math.ceil(product.discountPercentage)}% OFF</p>
                <p className='capitalize bg-gray-800 rounded-md px-2'>{product.category}</p>
            </div>
            <img src={product.thumbnail} />
            <div className='p-4'>
                {/* Reviews and Stock */}
                <div className='flex items-center justify-between mb-2'>
                    <p className={`${product.stock < 1 ? 'text-red-500' : 'text-green-500'}`}>
                        {
                            product.stock < 1 ? 'Out of Stock' : `In Stock(${product.stock})`
                        }
                    </p>
                    <p className='text-amber-300'>Rating: {product.rating} ({product.reviews.length})</p>
                </div>
                {/* Product Name, Price and Add to Cart */}
                <h3 className='text-xl'>{product.title}</h3>
                <div className='flex items-center justify-between my-2'>
                    <h2 className='text-2xl font-semibold'>${product.price}</h2>
                    <Button title={'Add to Cart'} styles={'px-4'} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;