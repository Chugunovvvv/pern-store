import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";
import { SHOP_ROUTE } from "../../utils/consts";

const AppRouter = () => {
  const isAuth = false;

  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
