import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Checkbox from './Checkbox';
import FilterTitle from './FilterTitle';
import SmallSpinner from './SmallSpinner';

const Filters = ({ products }) => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const res = await fetch('https://dummyjson.com/products/categories');
            const data = await res.json();
            setCategories(data);
            setLoading(false);
        };
        getProducts();
    }, []);

    //Price Range array
    const priceRange = ['0.00-8.99', '8.99-19.99', '19.00-49.99', '49.00-99.99', '99.00-1999.99'];

    //Filtering features
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSetStatus = (status) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('inStock', status);
        setSearchParams(newParams);
    };

    const handlePriceRange = (price) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('priceRange', price);
        setSearchParams(newParams);
    };

    const selectedPriceRange = searchParams.get('priceRange');
    const isInStock = searchParams.get('inStock');

    //Loading spinner while load categories
    if (loading) {
        return <SmallSpinner />;
    }
    return (
        <div>
            {/* Filter By Availablity */}
            <FilterTitle title={'Availability'} />
            <div>
                <div className='flex items-center gap-2'>
                    <input
                        type="radio"
                        id="inStock"
                        name="availability"
                        value="In Stock"
                        onClick={() => handleSetStatus(true)}
                        checked={isInStock === 'true'}
                    />
                    <label for="inStock">In Stock</label>
                </div>
                <div className='flex items-center gap-2'>
                    <input
                        type="radio"
                        id="outOfStock"
                        name="availability"
                        value="Out of Stock"
                        onClick={() => handleSetStatus(false)}
                        checked={isInStock === 'false'}
                    />
                    <label htmlFor="outOfStock">Out of Stock</label>
                </div>
            </div>
            {/* Filter By Price Range */}
            <FilterTitle title={'Price Range'} />
            {
                priceRange.map(range => <div key={range} className='flex items-center gap-2'>
                    <input
                        type="radio"
                        id={range}
                        name="priceRange"
                        value={range}
                        onClick={() => handlePriceRange(range)}
                        checked={range === selectedPriceRange}
                    />
                    <label for={range}>$ {range}</label>
                </div>)
            }
            {/* Filter By Category */}
            <FilterTitle title={'Category'} />
            <div>
                {
                    categories.map(category => <Checkbox key={category.slug} category={category} />)
                }
            </div>
        </div>
    );
};

export default Filters;