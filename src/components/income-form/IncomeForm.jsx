import { useState } from "react";
import { incomesCategories } from "../../db/incomesCategory";
import Swal from "sweetalert2";
import {URL_API } from "../../settings/index"

const initialValue = { amount: 0, category: "nomina" };

export const IncomeForm = () => {
  const [formState, setFormState] = useState(initialValue);

  const onChange = (event) => {
    event.preventDefault();
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    event.preventDefault();

    if (isValidForm()) {
      fetch(`${URL_API}/income`, {
        body: JSON.stringify({
          ...formState,
          token,
          user,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((data) => {
          if (data.ok) {
            Swal.fire("gasto registrado", "", "success");
            setFormState(initialValue);
          }
        })
        .catch((error) => {
          Swal.fire("Ocurrio un error", "", "error");
          console.log(error);
        });
    }
  };

  const isValidForm = () => {
    if (formState.amount < 0) {
      Swal.fire("Monto no valido", "", "error");
      return false;
    }

    if (formState.category.length == 0 || formState.category.length < 2) {
      Swal.fire("Categoria no valida", "", "error");
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="container-income-form mb-4">
        <h2 className="text-center mt-5">Ingresos</h2>
        <form className="form-container">
          <div>
            <input
              type="number"
              className="form-control mt-4 amount-income"
              placeholder="Ingresa un monto $"
              name="amount"
              onChange={onChange}
              value={formState.amount}
            />
          </div>
          <div>
            <select
              style={{ width: "95%", margin: "0 auto" }}
              name="category"
              id="category"
              onChange={onChange}
              className="form-select mt-4 amount-categorie"
            >
              {incomesCategories.map((category) => (
                <option key={category.id} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div
            className="container-buttons mt-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              type="button"
              onClick={onSubmit}
              className="btn btn-primary"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
