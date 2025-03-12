import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "../views/login/Login";
import { Home } from "../views/home/Home";
import { IncomeForm } from "../components/income-form/IncomeForm";
import { Expenses } from "../components/expenses/Expenses";
import { ProtectedRoutes } from "./protectedRoutes";
import { Dashboard } from '../views/Dashboard';
import {PprForm} from "../components/PprForm/PprForm"

export const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<ProtectedRoutes />} path="/" />
          <Route path="/home" element={<Home />}  >
          <Route element={<IncomeForm />} path="ingresos" />
          <Route element={<Expenses />} path="egresos" />
          <Route element={ <Dashboard />} path="dashboard" />
          <Route element={<PprForm />} path="ppr" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
