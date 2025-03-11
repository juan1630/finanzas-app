import { useState, useEffect, useContext } from "react";
import { Chart } from "react-google-charts";
import { fetchEgresos } from "../../../helpers/getCall/fetchEgresos";
import { transformValidChart } from "../../../helpers/convert/transformValid";
import ExpensesContext from '../../../context/expensesContext'

const options = {
  title: "Egresos",
};

export const ExpensesChart = () => {
  
  const { expensesState, setExpensesState} = useContext(ExpensesContext);
  const [dataState, setDataState] = useState([]);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if( expensesState == null ){
      fetchEgresos(`${import.meta.env.VITE_URL_BACKEND}/expenses/${user}`, { token }).then(
        (data) => {
          if (data) {
            const dataChart = data.map((expense) => ({
              amount: expense.amount,
              category: expense.category,
            }));
  
            const dataTranansform = transformValidChart(dataChart);
            const dataToChart = Object.keys(dataTranansform).map((key) => [
              key,
              dataTranansform[key],
            ]);
  
            const dataToChart2 = [["Egreso", "Por mes "], ...dataToChart];
            setDataState(dataToChart2);
            setExpensesState(dataToChart2);
          }
        }
      );
    } else {

      setDataState(expensesState)
    }
  };

  return (
    <>
      <div className="card">
      <h3 className="text-center mt-4" > { options.title } </h3>
        <Chart
          chartType="PieChart"
          data={dataState}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </>
  );
};
