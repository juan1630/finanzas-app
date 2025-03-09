import { useForm } from "../../hooks/useForm";
import { postDataFetch } from "../../helpers/api/postDataFetch";
import { expensesCategories } from "../../db/expensesCategory";
import { URL_API } from "../../settings/index"
import Swal from "sweetalert2";

export const Expenses = () => {
  const { onChange, onReset, amount, category, formState } = useForm({
    amount: 0,
    category: "",
  });

  const onSubmit = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    postDataFetch(`${URL_API}/expenses`, {
      ...formState,
      token,
      user,
    }).then((data) => {
      if (data) {
        Swal.fire("Egreso agregado", "", "success");
        onReset();
      } else {
        Swal.fire("Hubo un error", "", "error");
      }
    });
  };
  return (
    <>
      <div className="container  mb-4">
        <div className="conrainer-form">
          <form className="mt-4">
            <h2 className="text-center">Egresos</h2>
            <input
              type="number"
              className="form-control mt-4 amount-expenses"
              placeholder="Ingresa un monto $"
              name="amount"
              onChange={onChange}
              value={amount}
            />

            <select
            style={{ width:"95%", margin:'0 auto' }}
              name="category"
              id="category"
              className="form-select mt-3"
              onChange={onChange}
            >
              {expensesCategories.map((category) => (
                <option key={category.id} value={category.label}>{category.label}</option>
              ))}
            </select>
            <div
              style={{ width: "95%" }}
              className="container-button mt-4 mx-auto w-95"
            >
              <button
                type="button"
                className="btn btn-primary w-100 mx-auto"
                onClick={onSubmit}
              >
                Agergar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
