import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../main";
import { Card, Col, Row } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.brands.map((brand) => (
        <Col key={brand.id} xs="auto" className="mb-2">
          <Card
            className="py-2 px-4"
            style={{ cursor: "pointer" }}
            border={brand.id === device.selectedBrand.id ? "primary" : "light"}
            onClick={() => device.setSelectedBrand(brand)}
          >
            {brand.name}
          </Card>
        </Col>
      ))}
    </Row>
  );
});

export default BrandBar;
