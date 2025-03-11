import { useState } from 'react';
import { Outlet } from "react-router";
import { SideBar } from "../../components/sidebar/SideBar";
import ExpensesContext from "../../context/expensesContext";

import "./home.css";

export const Home = () => {
  const [expensesState, setExpensesState] = useState(null);
  return (
    <>
      <ExpensesContext.Provider value={{ expensesState, setExpensesState }} >
        <div className="container-principal">
          <SideBar />
          <main>
            <Outlet />
          </main>
        </div>
      </ExpensesContext.Provider>
    </>
  );
};
