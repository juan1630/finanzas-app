import { useHandleData } from "../../hooks/useHandleData";

export const PprTable = () => {
  const user = localStorage.getItem("user");
  const { dataList, isLoading, hasError } = useHandleData(
    `${import.meta.env.VITE_URL_BACKEND}/ppr/${user}`
  );

  return (
    <>
      {hasError ? (
        <h2 className="mt-4" > Hubo un error </h2>
      ) : (
        <>
          <table className="table table-PPR">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Monto</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map(({ amount, created_at, _id }, index) => (
                <tr key={_id}>
                  <th scope="row"> {index + 1} </th>
                  <td>${amount}.00</td>
                  <td>{new Date(created_at).toLocaleDateString("en-US")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>
            Total: $
            {dataList.reduce(
              (acum, currentAmount) => acum + currentAmount.amount,
              0
            )}
            .00
          </h4>
        </>
      )}
    </>
  );
};
