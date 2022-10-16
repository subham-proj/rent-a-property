import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import Filter from "./component/filter";
import Header from "./component/navbar";
import PropertyCard from "./component/propertyCard";
import { properties } from "./utils/data";

function App() {
  const [propertiesData, setPropertiesData] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    setPropertiesData(properties);
  }, []);

  const searchByName = (event) => {
    if (event.target.value === "") {
      setPropertiesData(properties);
    } else {
      const temp = propertiesData.filter((e) => {
        if (e.name.toLowerCase().includes(event.target.value.toLowerCase())) {
          return e;
        }
      });

      setPropertiesData(temp);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <div className="search-container">
          <h1>Search properties to rent</h1>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Search property"
              onChange={searchByName}
            />
          </Form.Group>
        </div>
        <div className="filters">
          <Filter
            properties={propertiesData}
            setProperties={setPropertiesData}
            persistData={properties}
            setError={setError}
          />
        </div>
        {error ? (
          <h6 className="error-msg">No properties found!</h6>
        ) : (
          <div className="listing">
            {propertiesData.map((e, idx) => (
              <div key={idx}>
                <PropertyCard data={e} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
