import { Button, Container } from "react-bootstrap";
import CreateType from "../components/ui/Modals/CreateType";
import CreateBrand from "../components/ui/Modals/CreateBrand";
import CreateDevice from "../components/ui/Modals/CreateDevice";
import { useState } from "react";

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState<boolean>(false);
  const [typeVisible, setTypeVisible] = useState<boolean>(false);
  const [deviceVisible, setDeviceVisible] = useState<boolean>(false);
  return (
    <Container className="d-flex flex-column">
      <Button onClick={() => setTypeVisible(true)} className="mt-3 p-2">
        Добавить тип
      </Button>
      <Button onClick={() => setBrandVisible(true)} className="mt-3 p-2">
        Добавить бренд
      </Button>
      <Button onClick={() => setDeviceVisible(true)} className="mt-3 p-2">
        Добавить устройство
      </Button>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
    </Container>
  );
};

export default Admin;
