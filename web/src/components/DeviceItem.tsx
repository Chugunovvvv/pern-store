import { Card, Col, Image } from "react-bootstrap";
import { Devices } from "../types/types";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

interface IDeviceItem {
  device: Devices;
}

const DeviceItem = ({ device }: IDeviceItem) => {
  const navigate = useNavigate();
  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
    >
      <Card style={{ cursor: "pointer", padding: "20px" }}>
        <Image
          height={150}
          width={185}
          src={import.meta.env.VITE_API_URL + "/" + device.img}
        />
        <div className="mt-2 text-black-50 d-flex justify-content-between align-items-center">
          <div>Samsung</div>
          <div>
            <div className="d-flex align-items-center">
              {device.rating}
              <Image width={25} height={25} src="raiting-star.svg" />
            </div>
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
