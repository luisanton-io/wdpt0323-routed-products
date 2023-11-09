import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bearer } from "../../Bearer";
import { Alert, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import styles from "./styles.module.scss";
import { PencilSquare } from "react-bootstrap-icons";
import cn from "classnames";

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

  console.log("product detail style", styles.bgColor);

  return (
    <Container className="py-5">
      <Row>
        {error && <Alert variant="danger">Error: {error.message}</Alert>}
        {loading ? (
          <div className="d-flex mt-5">
            <Spinner animation="border" variant="primary" className="mx-auto" />
          </div>
        ) : (
          product && (
            <>
              <Col xs={12} md={6} className="position-relative">
                <Image
                  className={styles.mainImage}
                  src={product.imageUrl}
                  fluid
                />
                <Link
                  to={`/backoffice/${product._id}`}
                  className={styles.editBtn}
                >
                  <PencilSquare />
                </Link>
              </Col>

              <Col xs={12} md={6} className={styles.product}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>{product.brand}</p>
                <p>{product.price}</p>
              </Col>
            </>
          )
        )}
      </Row>
    </Container>
  );
}
