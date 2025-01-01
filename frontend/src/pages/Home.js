import { Fragment, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);  // Define cartItems state here
    const [searchParams, setSearchParams] = useSearchParams();  // Use searchParams to fetch products

    // Load cart from localStorage on initial load (if available)
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Fetch products based on searchParams
    useEffect(() => {
        const keyword = searchParams.get('keyword');

        if (!keyword) {
            fetch(`${process.env.REACT_APP_API_URL}/products`)
                .then(res => res.json())
                .then(res => setProducts(res.products));
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/products?keyword=${keyword}`)
                .then(res => res.json())
                .then(res => setProducts(res.products));
        }
    }, [searchParams]);

    // Persist cartItems in localStorage when it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCard 
                                key={product._id}
                                product={product}
                            />
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </section>
        </Fragment>
    );
}
