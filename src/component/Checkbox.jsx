import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Checkbox = ({ category }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleCategory = (category) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('category', category);
        setSearchParams(newParams);
    };
    const selectedCategory = searchParams.get('category');
    return (
        <div className='flex gap-2 mb-2'>
            <input
                key={category.slug}
                type="checkbox"
                id={category.slug}
                name={category.slug}
                value={category.slug}
                onClick={() => handleCategory(category.slug)}
                checked={category.slug === selectedCategory}
            />
            <label for={category.slug}>{category.name}</label>
        </div>
    );
};

export default Checkbox;