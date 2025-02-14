import React, { useContext } from "react";
import { Context } from "../main";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = observer(() => {
  const { user } = useContext(Context);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "#fff" }} to={SHOP_ROUTE}>
          DeviceShop
        </NavLink>
        <Nav className="ml-auto">
          {user.isAuth ? (
            <div style={{ display: "flex", gap: "5px" }}>
              <Button onClick={() => user.setIsAuth(false)}>Выйти</Button>
              <Button>Админ панель</Button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "5px" }}>
              <Button onClick={() => user.setIsAuth(true)}>Авторизация</Button>
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
