import { useEffect, useState } from "react";
import fetchData from "../../helpers/getCall/fetchData";
import '../components.css'

export function IncomeTable() {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const [incomesListState, setIncomesListState] = useState([]);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_URL_BACKEND}/income/${user}`, { token }).then(
      (data) => {
        if (data.length > 0) {
          setIncomesListState(data);
        }
      }
    );
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
              <tr key={_id} >
                <th scope="row"> {index + 1} </th>
                <td>{amount}</td>
                <td>{category}</td>
                <td>{ new Date(created_at).toLocaleDateString('en-US')}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
