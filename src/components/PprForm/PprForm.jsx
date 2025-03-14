import { useState } from "react";
import Swal from "sweetalert2";

export const PprForm = () => {
  const [formState, setFormState] = useState({});

  const onChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (formState.amount > 0) {
      fetch(`${import.meta.env.VITE_URL_BACKEND}/ppr`, {
        body: JSON.stringify({ ...formState, token, user }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((data) => {
          if (data.ok) {
            Swal.fire("Abono al PPR", "", "success");
            setFormState({})
          }
        })
        .catch((error) => {
          Swal.fire("Hubo un error", "", "error");
          console.error(error);
        });
    }
  };
  return (
    <>
      <h2> Agregar PPR</h2>
      <form className="mt-4">
        <div className="w-90 mx-auto">
          <input
            type="number"
            className="form-control mb-3 w-100"
            onChange={onChange}
            name="amount"
            placeholder="Ingresa una cantidad"
            value={formState.amount}
          />
        </div>
        <div className="w-90 mx-auto">
          <button
            onClick={onSubmit}
            type="button"
            className="w-100 btn btn-primary"
          >
            {" "}
            Agregar{" "}
          </button>
        </div>
      </form>
    </>
  );
};
