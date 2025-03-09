import { Chart } from "react-google-charts";

const options = {
  title: "PPR",
};
export const PprCahrts = (props) => {
  const data = [
    ["Director (Year)", "Rotten Tomatoes", "IMDB"],
    ["Alfred Hitchcock (1935)", 8.4, 7.9],
    ["Ralph Thomas (1959)", 6.9, 6.5],
    ["Don Sharp (1978)", 6.5, 6.4],
    ["James Hawes (2008)", 4.4, 6.2],
  ];
  return (
    <div className="card">
       <h3 className="text-center mt-4" > { options.title } </h3>
      <Chart
        chartType="SteppedAreaChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
        legendToggle
      />
    </div>
  );
};
