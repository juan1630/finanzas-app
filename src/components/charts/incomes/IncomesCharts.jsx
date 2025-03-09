import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import fetchData from '../../../helpers/getCall/fetchData'
import { transformValidChart } from "../../../helpers/convert/transformValid";
import { URL_API } from "../../../settings/index"


const options = {
    title: "Ingresos",
  };
export const IncomesCharts = () => {
  const [dataState, setDataState] = useState([]);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDataIngresos();
  }, []);

  const fetchDataIngresos = () => {
    fetchData(`${URL_API}/income/${user}`, { token }).then(
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

          const dataToChart2 = [["Ingreso", "por mes "], ...dataToChart];
          setDataState(dataToChart2);
        }
      }
    );
  };
  return (
    <div className="card">
        <h3 className="text-center mt-4" > { options.title } </h3>
      <Chart
        chartType="PieChart"
        width="100%"
        height="100%"
        data={dataState}
        options={options}
        legendToggle
      />
    </div>
  );
};
