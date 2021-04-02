import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Row, Col, Form } from 'react-bootstrap';
const axios = require('axios');

const AddProducts = () => {
	const { register, handleSubmit, watch, errors } = useForm();
	const [imageUrl, setImage] = useState(null)
	const onSubmit = data => {
		const eventData = {
			name: data.name,
			weight: data.weight,
			price: data.price,
			imageUrl: imageUrl
		}
		fetch('https://guarded-tundra-16536.herokuapp.com/addProduct', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(eventData)
		})
	};
	const handleImageChange = (e) => {
		const imageData = new FormData();
		imageData.set('key', '867e70f288682920eb5ea080ee834a72')
		imageData.append('image', e.target.files[0])

		axios.post('https://api.imgbb.com/1/upload', imageData)
			.then(function (response) {
				setImage(response.data.data.display_url)
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="formStyle">
				<Row>
					<Col>
						<Form.Label>Product Name</Form.Label>
						<input name="name" placeholder="Enter Name" className="form-control" ref={register}/>
					</Col>
					<Col>
						<Form.Label>Weight</Form.Label>
						<input name="weight" placeholder="Enter Weight" className="form-control" ref={register}/>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col>
						<Form.Label>Add Price</Form.Label>
						<input name="price" placeholder="Enter Price" className="form-control"ref={register} />
					</Col>
					<Col>
						<Form.Label>Add Photo</Form.Label>
						<input name="test" type="file" onChange={handleImageChange} className="form-control" ref={register}/>
					</Col>

				</Row>
				<input type="submit" className="btn btn-primary mt-4 mr-5 float-right"/>
			</form>

		</div>
	);
};

export default AddProducts;
