import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const ManageProduct = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		fetch('https://guarded-tundra-16536.herokuapp.com/products')
			.then(res => res.json())
			.then(data => {
				setProducts(data);
			})
	}, [])
	const deleteProduct = (id, event) => {
		fetch(`https://guarded-tundra-16536.herokuapp.com/delete/${id}`, {
			method: 'DELETE',
		})
			.then(response => response.json())
			.then(result => {
				console.log('deleted successfully', result);
				if (result) {
					event.target.parentNode.style.display = 'none';
				}
			})
			.catch(err => {
				console.log("somvob na");
			})
	}
	return (
		<div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Product Name</th>
						<th>Weight</th>
						<th>Price</th>
						<th>Action</th>
					</tr>
				</thead>
				{
					products.map(product => <tbody>
						<tr>
							<td>{product.name}</td>
							<td>{product.weight}</td>
							<td>{product.price}</td>
							<td> <Button variant="danger" onClick={() => deleteProduct(product._id)}>Delete</Button></td>
						</tr>
					</tbody>)
				}
			</Table>
		</div>
	);
};

export default ManageProduct;
