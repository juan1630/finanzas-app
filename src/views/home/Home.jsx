import { useState } from "react";
import { Outlet } from "react-router";
import { SideBar } from "../../components/sidebar/SideBar";
import ExpensesContext from "../../context/expensesContext";
import IncomeContext from "../../context/incomeContext";
import PprContext from "../../context/pprContext";

import "./home.css";

export const Home = () => {
  const [expensesState, setExpensesState] = useState(null);
  const [incomeState, setIncomeState] = useState(null);
  const [pprContext, setPprStateContext] = useState(null);
  return (
    <>
      <ExpensesContext.Provider value={{ expensesState, setExpensesState }}>
        <IncomeContext.Provider value={{ incomeState, setIncomeState }}>
          <PprContext.Provider value={{ pprContext, setPprStateContext }}>
            <div className="container-principal">
              <SideBar />
              <main>
                <Outlet />
              </main>
            </div>
          </PprContext.Provider>
        </IncomeContext.Provider>
      </ExpensesContext.Provider>
    </>
  );
};
