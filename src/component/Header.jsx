import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const Header = () => {
    return (
        <div className='w-full py-2 border-b border-gray-500 sticky top-0 bg-[#242424]'>
            <div className='w-10/12 mx-auto flex items-center justify-between text-white font-semibold'>
                <div className='flex gap-5'>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/product'>Product</NavLink>
                </div>
                <Button title={'Login'} styles={'px-10'} />
            </div>
        </div>
    );
};

export default Header;