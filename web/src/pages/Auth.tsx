import { Alert, Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const Auth = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const { user } = useContext(Context);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onAuth = async () => {
    try {
      setError(null);
      let data;
      if (isLogin) {
        data = await login(formData.email, formData.password);
      } else {
        data = await registration(formData.email, formData.password);
      }
      user.setUser(user);

      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (error: any) {
      console.error("Ошибка авторизации:", error);
      setError(error.response?.data?.message || "Ошибка авторизации");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Row className="mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Нет аккаунта?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
              </div>
            ) : (
              <div>
                Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
              </div>
            )}
            <Button className="mt-4" onClick={onAuth}>
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
