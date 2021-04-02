import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { UserContext } from '../../App';

const ProductDetail = () => {
	const { productKey } = useParams()
	const [product, setProduct] = useState({});
	const { name, price } = product;
	useEffect(() => {
		fetch('https://guarded-tundra-16536.herokuapp.com/products/' + productKey)
			.then(res => res.json())
			.then(data => {
				setProduct(data);
			})
	}, [productKey])
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const handlePlaceOrder = () => {
		const orderDetails = {
			...loggedInUser, ...product, quantity: 1, orderTime: new Date()
		}
		fetch('https://guarded-tundra-16536.herokuapp.com/addOrder',{
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(orderDetails)
		})
		.then(res => res.json())
		.then(data => {
			if (data){
				alert('Your order place successfully')
			}
		})
	}
	return (
		<div>
			<h2 className="mt-4">Checkout</h2>
			<Table striped bordered hover className="mt-4">
				<thead>
					<tr>
						<th>Description</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{name}</td>
						<td>1</td>
						<td>{price}</td>
					</tr>
				</tbody>
			</Table>
			<button className="btn btn-primary float-right mt-5" onClick={handlePlaceOrder}>Checkout</button>
		</div>
	);
};

export default ProductDetail;
