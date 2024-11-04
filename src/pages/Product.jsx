import { useSearchParams } from 'react-router-dom';
import tshirt from '../assets/tshirt.jpg';
import Button from '../component/Button';
import '../index.css';

function Product() {
    const colors = ['black', 'white', 'blue'];
    const sizes = ['xs', 'sm', 'm', 'l', 'xl'];

    const [searchParams, setSearchParams] = useSearchParams({ color: 'black', size: 'm' });

    const selectedColor = searchParams.get('color');
    const selectedSize = searchParams.get('size');

    const handleColorChange = (color) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('color', color);
        setSearchParams(newParams);
    };

    const handleSizeChange = (size) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('size', size);
        setSearchParams(newParams);
    };

    // alternative method

    // const handleColorChangeAlt = (color) => {
    //     setSearchParams(prev => {
    //         prev.set("color", color);
    //         return prev;
    //     });
    // };
    // const handleSizeChangeAlt = (size) => {
    //     setSearchParams(prev => {
    //         prev.set("size", size);
    //         return prev;
    //     });
    // };

    return (
        <div className='w-10/12 mx-auto my-12 text-white'>
            <h3 className='text-lg font-semibold mb-5 border-l-4 border-blue-500 pl-2'>Product Page</h3>
            <div className='flex items-start gap-10'>
                <img src={tshirt} alt='Tshirt' height={400} width={400} className='rounded-lg' />
                {/* Product Details */}
                <div className='flex flex-col gap-4'>
                    <h3 className='text-lg font-semibold'>This Brain High Quality T-Shirt</h3>
                    <h1 className='text-2xl font-semibold'>$9.49</h1>

                    {/* Color */}
                    <>
                        <h5 className='font-semibold mb-1'>Select Color:</h5>
                        <div className='flex items-center gap-3'>
                            {colors.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleColorChange(color)}
                                    className={`bg-gray-900 border-2 rounded-3xl py-1 px-6 capitalize ${selectedColor === color ? 'border-blue-500' : 'border-gray-900'}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </>

                    {/* Size */}
                    <>
                        <h5 className='font-semibold mb-1'>Select Size:</h5>
                        <div className='flex items-center gap-3'>
                            {sizes.map((size, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSizeChange(size)}
                                    className={`bg-gray-900 border-2 rounded-3xl py-1 px-6 uppercase ${selectedSize === size ? 'border-blue-500' : 'border-gray-900'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </>
                    <Button title={'Add To Cart'} />
                </div>
            </div>
        </div>
    );
}

export default Product;