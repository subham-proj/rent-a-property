import React from "react";
import Card from "react-bootstrap/Card";
import Bed from "../assets/bed.png";
import Bathroom from "../assets/bathroom.png";
import Area from "../assets/area.png";

export default function PropertyCard(props) {
  const { data } = props;

  return (
    <Card style={{ width: "20rem", marginBottom: "20px" }}>
      <img variant="top" src={data.image} alt="test" />
      <Card.Body>
        <Card.Title>
          <span className="card-price">${data.price}/month</span>
          <br />

          {data.name}
        </Card.Title>
        <Card.Text style={{ color: "grey" }}>{data.address}</Card.Text>

        <Card.Text className="card-footer">
          <div className="footer-each-item">
            <img src={Bed} width="20" height="20" alt="bed" />

            {data.details.rooms}
          </div>
          <div className="footer-each-item">
            <img src={Bathroom} width="20" height="20" alt="bed" />

            {data.details.bathrooms}
          </div>
          <div className="footer-each-item">
            <img src={Area} width="20" height="20" alt="bed" />
            {data.details.area} m<sup>2</sup>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
