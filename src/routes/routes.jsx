import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "../views/login/Login";
import { Home } from "../views/home/Home";

import { ExpensesView } from "../views/expenses/ExpensesView";
import { ProtectedRoutes } from "./protectedRoutes";
import { Dashboard } from '../views/Dashboard';
import { PprView } from "../views/ppr/PprView"
import { Income } from "../views/incomeView/Income"

export const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<ProtectedRoutes />} path="/" />
          <Route path="/home" element={<Home />}  >
          <Route element={<Income />} path="ingresos" />
          <Route element={<ExpensesView />} path="egresos" />
          <Route element={ <Dashboard />} path="dashboard" />
          <Route element={<PprView />} path="ppr" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
