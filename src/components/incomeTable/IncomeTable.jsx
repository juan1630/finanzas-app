import { useEffect, useState } from "react";
import fetchData from "../../helpers/getCall/fetchData";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/login/loginSlice"
import "../components.css";

export function IncomeTable() {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const [incomesListState, setIncomesListState] = useState([]);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_URL_BACKEND}/income/${user}`, {
      token,
    }).then((data) => {
      if (data.length > 0) {
        setIncomesListState(data);
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
          {incomesListState.map(
            ({ amount, category, created_at, _id }, index) => (
              <tr key={_id}>
                <th scope="row"> {index + 1} </th>
                <td>$ {amount}.00</td>
                <td>{category}</td>
                <td>{new Date(created_at).toLocaleDateString("en-US")}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <h4>
          Total: $
          {incomesListState.reduce(
            (acum, currentAmount) =>  acum + currentAmount.amount,
            0
          )} .00
        </h4>
    </>
  );
}
