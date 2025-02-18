import React, { useContext, useEffect, useState } from "react";
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
import { createDevice, fetchBrands, fetchTypes } from "../../../http/deviceAPI";
import { observer } from "mobx-react-lite";

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

const CreateDevice: React.FC<Props> = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState(initialInfo);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchTypes().then((data) => {
      console.log("Fetched types:", data);
      device.setTypes(data);
    });
    fetchBrands().then((data) => {
      device.setBrands(data);
      console.log("Fetched brands:", data);
    });
  }, []);
  const selectedFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("info", JSON.stringify(info));

    createDevice(formData)
      .then((data) => {
        console.log("Device created response:", data);
        onHide();
      })
      .catch((e) => console.error(e));
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
              <Dropdown.Toggle
                name="type"
                variant="success"
                id="dropdown-basic"
              >
                {device.selectedType.name || "Выберите тип"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {device.types.map((type) => (
                  <DropdownItem
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                  >
                    {type.name}
                  </DropdownItem>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                name="brand"
                variant="success"
                id="dropdown-basic"
              >
                {device.selectedBrand.name || "Выберите бренд"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {device.brands.map((brand) => (
                  <DropdownItem
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                  >
                    {brand.name}
                  </DropdownItem>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Form.Control
            className="mt-2"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название устройства"
          ></Form.Control>
          <Form.Control
            type="number"
            name="price"
            className="mt-2"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Введите стоимость устройства"
          ></Form.Control>
          <Form.Control
            onChange={selectedFile}
            className="mt-2"
            type="file"
          ></Form.Control>
          <Button className="mt-2" onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row key={i.number} className="mt-4">
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Введите название"
                ></Form.Control>
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите описание"
                ></Form.Control>
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
        <Button onClick={addDevice} variant="success">
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
