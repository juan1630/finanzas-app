import { useEffect, useState } from "react";
import {fetchEgresos} from "../../helpers/getCall/fetchEgresos";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/login/loginSlice"
import "../components.css";

export function ExpensesTable() {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const [expensesListState, setexpensesListState] = useState([]);

  useEffect(() => {
    fetchEgresos(`${import.meta.env.VITE_URL_BACKEND}/expenses/${user}`, {
      token,
    }).then((data) => {
      if (data.length > 0) {
        setexpensesListState(data);
      }
    }).catch(error => {
      console.log(error)
      if(error.message  == "invalid token") {
        dispatch(logout());
        localStorage.clear();
      }
    })
  }, []);
  return (
    <>
      <table className="table table-income">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Monto</th>
            <th scope="col">Categoria</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {expensesListState.map(
            ({ amount, category, created_at, _id }, index) => (
              <tr key={_id}>
                <th scope="row"> {index + 1} </th>
                <td>{amount}</td>
                <td>{category}</td>
                <td>{new Date(created_at).toLocaleDateString("en-US")}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <h4>
          Total: $
          {expensesListState.reduce(
            (acum, currentAmount) =>  acum + currentAmount.amount,
            0
          )} .00
        </h4>
    </>
  );
}
