import { Card, Col, Image } from "react-bootstrap";
import { Devices } from "../types/types";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { useState } from "react";
import { deleteDevice } from "../http/deviceAPI";

interface IDeviceItem {
  device: Devices;
}

const DeviceItem = ({ device }: IDeviceItem) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Останавливаем всплытие события
    try {
      await deleteDevice(device.id); // Вызываем функцию удаления
    } catch (error) {
      console.error("Ошибка при удалении устройства:", error);
    }
  };
  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative" }}
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
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "20px",
            cursor: "pointer",
            fontSize: "40px",
            color: "red",
          }}
          onClick={handleDelete}
        >
          ×
        </div>
      )}
    </Col>
  );
};

export default DeviceItem;
