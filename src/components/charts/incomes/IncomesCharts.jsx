import { useState, useEffect, useContext } from "react";
import { Chart } from "react-google-charts";
import fetchData from "../../../helpers/getCall/fetchData";
import { transformValidChart } from "../../../helpers/convert/transformValid";
import IncomeContext from "../../../context/incomeContext";

const options = {
  title: "Ingresos",
};

export const IncomesCharts = () => {
  const [dataState, setDataState] = useState([]);
  const {incomeState, setIncomeState} = useContext(IncomeContext);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDataIngresos();
  }, []);

  const fetchDataIngresos = () => {
    if( incomeState == null ){
      fetchData(`${import.meta.env.VITE_URL_BACKEND}/income/${user}`, {
        token,
      }).then((data) => {
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
  
          const dataToChart2 = [["Ingreso", "por mes "], ...dataToChart];
          setIncomeState(dataToChart2);
        }
      });
    }else {
      setDataState(incomeState)
    }
  };
  return (
    <div className="card">
      <h3 className="text-center mt-4"> {options.title} </h3>
      <Chart
        chartType="PieChart"
        width="100%"
        height="100%"
        data={incomeState}
        options={options}
        legendToggle
      />
    </div>
  );
};
