import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Bearer } from "../Bearer";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

//     "name": "3311 callphone",
//     "description": "icon2",
//     "brand": "Nokia2",
//     "imageUrl": "http://bith.ly_3CExjRa",
//     "price": 200,

export default function BackOffice() {
  const { id } = useParams();

  const navigate = useNavigate();

  console.table({ id });

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [brand, setBrand] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    if (id) {
      fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        headers: {
          Authorization: Bearer,
        },
      })
        .then((r) => r.json())
        .then((product) => {
          setName(product.name);
          setDescription(product.description);
          setBrand(product.brand);
          setImageUrl(product.imageUrl);
          setPrice(product.price);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({
      name,
      description,
      brand,
      imageUrl,
      price,
    });

    const url = id
      ? "https://striveschool-api.herokuapp.com/api/product/" + id
      : "https://striveschool-api.herokuapp.com/api/product/";

    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify({
        name,
        description,
        brand,
        imageUrl,
        price,
      }),
      headers: {
        Authorization: Bearer,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success(
        id ? "Product updated successfully" : "Product created successfully"
      );

      const { _id } = await response.json();

      navigate(`/products/${_id}`);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={4} className="mx-auto">
          <h1>Backoffice</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <div className="d-flex">
              <Button className="mt-4 ms-auto" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
