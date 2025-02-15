import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownItem,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Context } from "../../../main";

interface Props {
  show: boolean;
  onHide: () => void;
}

const initialInfo = [
  {
    title: "",
    description: "",
    number: Date.now(),
  },
];

const CreateDevice: React.FC<Props> = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState(initialInfo);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Выберите тип
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {device.types.map((type) => (
                  <DropdownItem key={type.id}>{type.name}</DropdownItem>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Выберите бренд
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {device.brands.map((brand) => (
                  <DropdownItem key={brand.id}>{brand.name}</DropdownItem>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Form.Control
            className="mt-2"
            placeholder="Введите название устройства"
          ></Form.Control>
          <Form.Control
            type="number"
            className="mt-2"
            placeholder="Введите стоимость устройства"
          ></Form.Control>
          <Form.Control className="mt-2" type="file"></Form.Control>
          <Button className="mt-2" onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row key={i.number} className="mt-4">
              <Col md={4}>
                <Form.Control placeholder="Введите название"></Form.Control>
              </Col>
              <Col md={4}>
                <Form.Control placeholder="Введите описание"></Form.Control>
              </Col>
              <Col md={4}>
                <Button variant="danger" onClick={() => removeInfo(i.number)}>
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="danger">
          Закрыть
        </Button>
        <Button onClick={onHide} variant="success">
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
