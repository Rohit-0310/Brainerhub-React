import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart/Cart";
import DashBoard from "./components/dashboard/DashBoard";
import Login from "./components/logIn/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/DashBoard"} element={<DashBoard />} />
        <Route path={"/cart"} element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
