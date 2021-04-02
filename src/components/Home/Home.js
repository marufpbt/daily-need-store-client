import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { Spinner } from 'react-bootstrap';
const Home = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetch('https://guarded-tundra-16536.herokuapp.com/products')
			.then(res => res.json())
			.then(data => {
				setProducts(data);
				setLoading(false);
			})
	},[])
	return (
		<div className="productStyle">
			{ loading ?  <div class="d-flex justify-content-center align-items-center"><Spinner animation="border" variant="primary" /></div> :
				products.map(product => <Product product={product}></Product>)
			}
		</div>
	);
};

export default Home;
