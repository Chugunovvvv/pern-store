import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Context } from "../main";

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <ListGroup>
      {device.types.map((type) => (
        <ListGroupItem
          style={{ cursor: "pointer" }}
          key={type.id}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
        >
          {type.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
