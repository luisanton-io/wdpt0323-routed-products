import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Bearer } from "../../Bearer";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./styles.module.scss";
// Product schema:
// {
//     "_id": "6540f076b181630014c8ff03",
//     "name": "3311 callphone",
//     "description": "icon2",
//     "brand": "Nokia2",
//     "imageUrl": "http://bith.ly_3CExjRa",
//     "price": 200,
//     "userId": "6538162f77cdaa00146df393",
//     "createdAt": "2023-10-31T12:17:58.941Z",
//     "updatedAt": "2023-10-31T12:17:58.941Z",
//     "__v": 0
// }

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: {
        Authorization: Bearer,
      },
    })
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  console.log("AllProducts style", styles.bgColor);

  // use bootstrap cards:
  return (
    <Container>
      {/* <Row className={styles.bgColor} className="row-gap-2"> */}
      {/* <Row className={`${Math.random() > 0.5 && styles.bgColor} row-gap-2`}> */}
      {/* <Row className={cn(Math.random() > 0.5 && styles.bgColor, "row-gap-2")}> */}
      <Row className="row-gap-2">
        {products.map((p) => (
          <Col xs={12} md={6} lg={3} key={p._id} className="d-flex">
            <Card className="flex-grow-1">
              <Link to={`/products/${p._id}`}>
                <Card.Img
                  src={p.imageUrl}
                  alt="..."
                  className={styles.cardImage}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text">{p.brand}</p>
                <p className="card-text">{p.price}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
