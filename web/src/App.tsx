import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/routes/AppRouter";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
