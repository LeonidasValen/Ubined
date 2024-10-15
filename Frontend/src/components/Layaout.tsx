import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";

export function Layaout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  )
}
