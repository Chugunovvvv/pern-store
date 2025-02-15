import React, { useContext } from "react";
import { Context } from "../main";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "#fff" }} to={SHOP_ROUTE}>
          DeviceShop
        </NavLink>
        <Nav className="ml-auto">
          {user.isAuth ? (
            <div style={{ display: "flex", gap: "5px" }}>
              <Button onClick={() => logOut()}>Выйти</Button>
              <Button onClick={() => navigate(ADMIN_ROUTE)}>
                Админ панель
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "5px" }}>
              <Button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
