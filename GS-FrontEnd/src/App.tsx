import { Outlet } from "react-router-dom";
import Rodape from "./components/Rodape/Rodape";
import Header from "./components/Header/Header";

export default function App(){
  return(
    <div className="container">
      <Header />
      <Outlet />
      <Rodape />
    </div>
  );
}