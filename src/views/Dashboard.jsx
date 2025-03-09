import { ExpensesChart } from "../components/charts/expenses/ExpensesChart";
import { IncomesCharts } from "../components/charts/incomes/IncomesCharts";
import { PprCahrts } from "../components/charts/pprcharts/PprCharts";

export const Dashboard = () => {
  return (
    <>
      <section className="charts-section">
        <ExpensesChart />
        <PprCahrts />
        <IncomesCharts />
      </section>
    </>
  );
};
