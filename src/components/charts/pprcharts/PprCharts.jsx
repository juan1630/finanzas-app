import { useEffect, useState, useContext } from "react";
import { Chart } from "react-google-charts";
import { fetchEgresos } from "../../../helpers/getCall/fetchEgresos";
import { transformValidChart } from "../../../helpers/convert/transformValid";
import PprContext from "../../../context/pprContext";

const options = {
  title: "PPR",
};

export const PprCahrts = () => {
  const [pprState, setPprState] = useState([]);
  const {pprContext, setPprStateContext} = useContext(PprContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (pprContext == null) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      fetchEgresos(`${import.meta.env.VITE_URL_BACKEND}/ppr/${user}`, {
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

          const dataToChart2 = [["PPR", "Por mes "], ...dataToChart];
          setPprState(dataToChart2);
          setPprStateContext(dataToChart2);
        }
      });
    } else {
      setPprState(pprContext);
    }
  };

  return (
    <div className="card">
      <h3 className="text-center mt-4"> {options.title} </h3>
      <Chart
        chartType="SteppedAreaChart"
        width="100%"
        height="100%"
        data={pprState}
        options={options}
        legendToggle
      />
    </div>
  );
};
