import { useEffect, useState } from 'react';
import { SlEqualizer } from 'react-icons/sl';
import { useSearchParams } from 'react-router-dom';
import Button from '../component/Button';
import Filters from '../component/Filters';
import Loading from '../component/Loading';
import Pagination from '../component/Pagination';
import ProductCard from '../component/ProductCard';
import '../index.css';

function Home() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const res = await fetch('https://dummyjson.com/products?limit=0&skip=0');
            const { products } = await res.json();
            setProducts(products);
            setLoading(false);
        };
        getProducts();
    }, []);

    //Handle Search
    const handleSearch = (e) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('q', e.target.value);
        setSearchParams(newParams);
    };
    //Filtering 
    const isInStock = searchParams.get('inStock') === 'true';
    const priceRange = searchParams.get('priceRange');
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('q');

    // Filter the products based on searchParams
    const filteredProducts = products.filter(product => {
        const inStockFilter = isInStock ? product.stock > 1 : true;
        const priceFilter = priceRange
            ? product.price >= parseFloat(priceRange.split('-')[0]) && product.price <= parseFloat(priceRange.split('-')[1])
            : true;
        const categoryFilter = category ? product.category === category : true;

        const searchFilter = searchQuery ? product.title.toLowerCase().includes(searchQuery) : true;

        return inStockFilter && priceFilter && categoryFilter && searchFilter;
    });
    //Pagination Feature
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const itemsPerPage = 12;

    // Calculate total pages
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Get current page items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return <Loading />;
    }
    return (
        <div className='w-10/12 mx-auto my-12 text-white'>
            <div className='flex'>
                {/* Filters */}
                <div className='w-1/5'>
                    <div className='flex items-start justify-between mr-5'>
                        <h4 className='text-2xl font-semibold mb-5 flex items-center gap-2'>Filters <SlEqualizer className='h-6 w-5' /></h4>
                        <button
                            onClick={() => setSearchParams('')}
                            className='bg-blue-500 py-1 px-3 rounded-3xl'
                        >Reset</button>
                    </div>
                    <Filters />
                </div>

                {/* Products */}
                <div className='w-4/5'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-xl font-semibold mb-5 border-l-4 border-blue-500 pl-2'>All Products <span className='text-base'>({filteredProducts && filteredProducts.length})</span></h3>
                        <input
                            type="text"
                            className='bg-gray-900 text-white focus:outline-none rounded-3xl py-2 px-4'
                            placeholder='Search here...'
                            onChange={handleSearch}
                        />
                    </div>
                    {
                        filteredProducts.length > 0 ? <div className='grid grid-cols-3 gap-5'>
                            {
                                currentItems.map(product => <ProductCard
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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;