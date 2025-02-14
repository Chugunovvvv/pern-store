import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/routes/AppRouter";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
