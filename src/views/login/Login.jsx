import { Formik } from "formik";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { URL_API } from '../../settings/index'

import { loginSuccess } from "../../reducers/login/loginSlice";

import './login.css'

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="w-100 h-100">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email es requerido";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Email invalido";
          }

          if (!values.password) {
            errors.password = "Password es requerido";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post(`${import.meta.env.VITE_URL_BACKEND}/login`, { ...values })
            .then(({ data, status }) => {
              if (status == 200) {
                localStorage.setItem("token", data.token);
                localStorage.setItem('user', data.id);
                dispatch(loginSuccess({ auth: true, token: data.token }));
                navigate("/home/dashboard");
              }
            })
            .catch(({ response }) => {
              if (response.statusText == "Bad Request") {
                Swal.fire({
                  title: "Hubo un error",
                  icon: "error",
                  text: "Nombre de usuario o contraseña incorrectos",
                });
              }
            });
        }}
      >
        {({
          handleSubmit,
          touched,
          values,
          handleBlur,
          handleChange,
          errors,
        }) => (
          <form className="" onSubmit={handleSubmit}>
            <h2 className="text-white text-center text-3xl">Inicia sesion</h2>
            <div className="mt-4">
              <div className="mt-2">
              <label
                htmlFor="email"
              >
                Email
              </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="form-control"
                />
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div className="mt-4">
              <div className="mt-2">
              <label
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="form-control"
                />
              </div>
              {errors.password && touched.password && errors.password}
            </div>

            <div className="button-container mt-5">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
              >
                Sign in
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
