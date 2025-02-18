import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../../http/deviceAPI";

interface Props {
  show: boolean;
  onHide: () => void;
}

const CreateType: React.FC<Props> = ({ show, onHide }) => {
  const [value, setValue] = useState<string>();

  const addType = () => {
    createType({
      name: value,
    }).then((data) => setValue(""));
    onHide();
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
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите название типа"
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="danger">
          Закрыть
        </Button>
        <Button onClick={addType} variant="success">
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
