import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../component/Button';
import Filters from '../component/Filters';
import Loading from '../component/Loading';
import ProductCard from '../component/ProductCard';
import '../index.css';

function Home() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const res = await fetch('https://dummyjson.com/products?limit=90&skip=0');
            const { products } = await res.json();
            setProducts(products);
            setLoading(false);
        };
        getProducts();
    }, []);

    //Filtering 
    const isInStock = searchParams.get('status') === 'in stock';
    const priceRange = searchParams.get('priceRange');
    const category = searchParams.get('category');

    // Filter the products based on searchParams
    const filteredProducts = products.filter(product => {
        const inStockFilter = isInStock ? product.stock > 1 : true;
        const priceFilter = priceRange
            ? product.price >= parseFloat(priceRange.split('-')[0]) && product.price <= parseFloat(priceRange.split('-')[1])
            : true;
        const categoryFilter = category ? product.category === category : true;

        return inStockFilter && priceFilter && categoryFilter;
    });


    if (loading) {
        return <Loading />;
    }
    return (
        <div className='w-10/12 mx-auto my-12 text-white'>
            <div className='flex'>
                {/* Filters */}
                <div className='w-1/5'>
                    <h4 className='text-2xl font-semibold mb-5'>Filters</h4>
                    <Filters products={products} />
                </div>

                {/* Products */}
                <div className='w-4/5'>
                    <h3 className='text-xl font-semibold mb-5 border-l-4 border-blue-500 pl-2'>All Products</h3>
                    {
                        filteredProducts.length > 0 ? <div className='grid grid-cols-3 gap-5'>
                            {
                                filteredProducts.map(product => <ProductCard
                                    key={product.id}
                                    product={product}
                                />)
                            }
                        </div> : <div className='flex flex-col gap-5 items-center justify-center min-h-[60vh]'>
                            <h3 className='text-2xl font-semibold'>No Product Matched with Filter</h3>
                            <div onClick={() => setSearchParams('')}>
                                <Button title={'Reset Filter'} styles={'px-5'} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;