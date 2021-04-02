import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
const Product = (props) => {
	const { name, weight, imageUrl, price, _id } = props.product;
	const history = useHistory();
	const handleBuyProduct = (id) => {
		const product = `/product/${id}`
		history.push(product)
	}
	return (
		<Card style={{ width: '18rem', height: 'fitContent' }}>
			<Card.Img variant="top" src={imageUrl} />
			<Card.Body>
				<Card.Title>{name} - {weight}</Card.Title>
				<p className="priceStyle">${price}</p>
				{/* <Link to={"/product/"+_id}> </Link> */}
				<Button variant="success" className="float-right" onClick={() => handleBuyProduct(_id)}>Buy Now</Button>
			</Card.Body>
		</Card>
	);
};

export default Product;
