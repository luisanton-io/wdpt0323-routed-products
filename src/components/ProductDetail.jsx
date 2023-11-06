import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bearer } from "../Bearer";
import { Alert, Col, Container, Image, Row, Spinner } from "react-bootstrap";

export default function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
      headers: {
        Authorization: Bearer,
      },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Errore nella richiesta");
        return r.json();
      })
      .then(setProduct)
      .then(() => {
        setError(null);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Container>
      <Row>
        {error && <Alert variant="danger">Error: {error.message}</Alert>}
        {loading ? (
          <div className="d-flex mt-5">
            <Spinner animation="border" variant="primary" className="mx-auto" />
          </div>
        ) : (
          product && (
            <>
              <Col xs={12} md={6}>
                <Image src={product.imageUrl} fluid />
              </Col>

              <Col xs={12} md={6}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>{product.brand}</p>
                <p>{product.price}</p>
              </Col>
              <Link to={`/backoffice/${product._id}`}>Edit</Link>
            </>
          )
        )}
      </Row>
    </Container>
  );
}
