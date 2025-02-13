import "./LoginPage.css";
import { useState } from "react";
import { LoginApi } from "../services/Api";
import { storeUserData } from "../services/Storage";
import { isAuthenticated } from "../services/Auth";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function LoginPage() {
  const initialStateErrors = {
    nombre: { required: false },
    contraseña: { required: false },
    custom_error: null,
  };
  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    nombre: "",
    contraseña: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = { ...initialStateErrors };
    let hasError = false;

    if (inputs.nombre.trim() === "") {
      errors.nombre.required = true;
      hasError = true;
    }
    if (inputs.contraseña.trim() === "") {
      errors.contraseña.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      LoginApi(inputs)
        .then((response) => {
          if (response.data && response.data.idToken) {
            storeUserData(response.data.idToken);
            setLoggedIn(true); // Cambiar el estado a logueado
          }
        })
        .catch((err) => {
          if (err.code === "ERR_BAD_REQUEST") {
            setErrors({ ...errors, custom_error: "Credenciales inválidas." });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...errors });
  };

  if (isAuthenticated() || loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <NavBar />
      <section className="login-block">
        <div className="container">
          <div className="">
            <div className="login-sec">
              <h2 className="text-center">Iniciar sesión</h2>
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="nombre" className="text-uppercase">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleInput}
                    name="nombre"
                    placeholder="Ingrese su nombre"
                  />
                  {errors.nombre.required && (
                    <span className="text-danger">El nombre es requerido.</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="contraseña" className="text-uppercase">
                    Contraseña
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    onChange={handleInput}
                    name="contraseña"
                    placeholder="Ingrese su contraseña"
                  />
                  {errors.contraseña.required && (
                    <span className="text-danger">
                      La contraseña es requerida.
                    </span>
                  )}
                </div>
                {loading && (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Cargando...</span>
                    </div>
                  </div>
                )}
                <span className="text-danger">
                  {errors.custom_error && <p>{errors.custom_error}</p>}
                </span>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    disabled={loading}
                    value="Iniciar sesión"
                  />
                </div>
                <div className="form-group">
                  ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
