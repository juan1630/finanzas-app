import { Outlet } from "react-router";
import { SideBar } from "../../components/sidebar/SideBar";

import "./home.css";

export const Home = () => {
  return (
    <>
      <div className="container-principal">
        <SideBar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
