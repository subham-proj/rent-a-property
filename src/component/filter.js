import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Calendar from "../assets/calendar.png";
import Down from "../assets/down.png";
import { cities } from "../utils/formatting";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const initialState = {
  location: "",
  startDate: new Date(),
  endDate: new Date().addDays(365),
  startPrice: 500,
  endPrice: 5000,
  type: "",
};

export default function Filter(props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("");

  const [filterData, setFilterData] = useState(initialState);

  const applyFilters = () => {
    const temp = props.persistData.filter((e) => {
      if (filterData.location === "" && filterData.type === "") {
        if (
          Number(e.price) >= filterData.startPrice &&
          Number(e.price) <= filterData.endPrice &&
          new Date(e.moveIn) >= filterData.startDate &&
          new Date(e.moveIn) <= filterData.endDate
        ) {
          return e;
        }
      } else if (filterData.location !== "" && filterData.type === "") {
        if (
          e.city.toLowerCase() === filterData.location.toLowerCase() &&
          Number(e.price) >= filterData.startPrice &&
          Number(e.price) <= filterData.endPrice &&
          new Date(e.moveIn) >= filterData.startDate &&
          new Date(e.moveIn) <= filterData.endDate
        ) {
          return e;
        }
      } else if (filterData.location === "" && filterData.type !== "") {
        if (
          e.type.toLowerCase() === filterData.type.toLowerCase() &&
          Number(e.price) >= filterData.startPrice &&
          Number(e.price) <= filterData.endPrice &&
          new Date(e.moveIn) >= filterData.startDate &&
          new Date(e.moveIn) <= filterData.endDate
        ) {
          return e;
        }
      } else {
        if (
          e.city.toLowerCase() === filterData.location.toLowerCase() &&
          e.type.toLowerCase() === filterData.type.toLowerCase() &&
          Number(e.price) >= filterData.startPrice &&
          Number(e.price) <= filterData.endPrice &&
          new Date(e.moveIn) >= filterData.startDate &&
          new Date(e.moveIn) <= filterData.endDate
        ) {
          return e;
        }
      }
    });

    if (temp.length === 0) {
      props.setError(true);
    } else {
      props.setError(false);
      props.setProperties(temp);
    }
  };

  const clearFilter = () => {
    setFilterData(initialState);
    props.setError(false);
    props.setProperties(props.persistData);
  };
  return (
    <div>
      <Card>
        <Card.Body>
          <Row className="labels">
            <Col className="filter-item">
              <p>Location</p>
              <Form.Select
                aria-label=""
                onChange={(e) =>
                  setFilterData({ ...filterData, location: e.target.value })
                }
              >
                <option value="">Select Location</option>
                {cities.map((e, idx) => (
                  <option value={e} key={idx}>
                    {e}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col className="filter-item">
              <p>
                When{" "}
                <img
                  src={Calendar}
                  width="20"
                  height="20"
                  alt="date"
                  onClick={() => {
                    setModalShow(true);
                    setModalType("date");
                  }}
                />
                <DialogBox
                  show={modalShow}
                  filterData={filterData}
                  setFilterData={setFilterData}
                  onHide={() => setModalShow(false)}
                  type={modalType}
                />
              </p>
              <h6>
                {moment(filterData.startDate).format("DD/MM/YYYY")} -{" "}
                {moment(filterData.endDate).format("DD/MM/YYYY")}
              </h6>
            </Col>
            <Col className="filter-item">
              <p>
                Price{" "}
                <img
                  src={Down}
                  width="20"
                  height="20"
                  alt="price"
                  onClick={() => {
                    setModalShow(true);
                    setModalType("price");
                  }}
                />
              </p>
              <h6>
                ${filterData.startPrice} - ${filterData.endPrice}
              </h6>
            </Col>
            <Col className="filter-item">
              <p>Property Type</p>
              <Form.Select
                aria-label=""
                onChange={(e) =>
                  setFilterData({ ...filterData, type: e.target.value })
                }
              >
                <option value="">Select property type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="studio_apartment">Studio Apartment</option>
                <option value="villa">Villa</option>
              </Form.Select>
            </Col>
            <Col classname="filter-item-last">
              <Button onClick={applyFilters}>Search</Button>&nbsp;&nbsp;&nbsp;
              <Button onClick={clearFilter}>Clear</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

function DialogBox(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Date
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="date-select">
        <Row className="mb-2">
          <Col>From</Col>
          <Col xs={10}>
            {props.type === "date" ? (
              <DatePicker
                selected={props.filterData.startDate}
                value={props.filterData.startDate}
                onChange={(date) =>
                  props.setFilterData({ ...props.filterData, startDate: date })
                }
                minDate={new Date()}
              />
            ) : (
              props.type === "price" && (
                <Form.Control
                  size="sm"
                  type="number"
                  min={500}
                  value={props.filterData.startPrice}
                  onChange={(e) =>
                    props.setFilterData({
                      ...props.filterData,
                      startPrice: e.target.value,
                    })
                  }
                />
              )
            )}
          </Col>
        </Row>
        <Row>
          <Col>To</Col>
          <Col xs={10}>
            {props.type === "date" ? (
              <DatePicker
                selected={props.filterData.endDate}
                onChange={(date) =>
                  props.setFilterData({ ...props.filterData, endDate: date })
                }
                minDate={new Date()}
              />
            ) : (
              props.type === "price" && (
                <Form.Control
                  size="sm"
                  type="number"
                  min={500}
                  value={props.filterData.endPrice}
                  onChange={(e) =>
                    props.setFilterData({
                      ...props.filterData,
                      endPrice: e.target.value,
                    })
                  }
                />
              )
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Set</Button>
      </Modal.Footer>
    </Modal>
  );
}
