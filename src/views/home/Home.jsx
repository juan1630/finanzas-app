import { useState } from 'react';
import { Outlet } from "react-router";
import { SideBar } from "../../components/sidebar/SideBar";
import ExpensesContext from "../../context/expensesContext";
import IncomeContext, { } from '../../context/incomeContext'

import "./home.css";

export const Home = () => {
  const [expensesState, setExpensesState] = useState(null);
  const [ incomeState, setIncomeState ] = useState(null);
  return (
    <>
      <ExpensesContext.Provider value={{ expensesState, setExpensesState }} >
        <IncomeContext.Provider value={{ incomeState, setIncomeState }}>
        <div className="container-principal">
          <SideBar />
          <main>
            <Outlet />
          </main>
        </div>
        </IncomeContext.Provider>
      </ExpensesContext.Provider>
    </>
  );
};
