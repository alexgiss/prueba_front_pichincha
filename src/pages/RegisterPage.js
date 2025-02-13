import { useState } from "react";
import { RegisterApi } from "../services/Api";
import {storeUserData } from '../services/Storage'
import { isAuthenticated } from "../services/Auth";
import "./RegisterPage.css";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function RegisterPage() {
  const initialStateErrors = {
    nombre: { required: false },
    contraseña: { required: false },
    genero: { required: false },
    edad: { required: false },
    identificacion: { required: false },
    direccion: { required: false },
    telefono: { required: false },
    estado: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    nombre: "",
    contraseña: "",
    genero: "",
    edad: "",
    identificacion: "",
    direccion: "",
    telefono: "",
    estado: "Activo",
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;

    for (const key in inputs) {
      if (inputs[key] === "") {
        errors[key] = { required: true };
        hasError = true;
      }
    }

    if (!hasError) {
      setLoading(true);
      RegisterApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if ((err.code = "ERR_BAD_REQUEST")) {
            setErrors({ ...errors, custom_error: "USUARIO REGISTRADO." });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...errors });
  };

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <NavBar />
      <section className="register-block">
        <div className="container">
          <div className="row">
            <div className="col register-sec">
              <h2 className="text-center">Registrate</h2>
              <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="nombre" className="text-uppercase">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInput}
                      name="nombre"
                      id="nombre"
                    />
                    {errors.nombre.required ? (
                      <span className="text-danger">Nombre es requerido.</span>
                    ) : null}
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="contraseña" className="text-uppercase">
                      Contraseña
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      onChange={handleInput}
                      name="contraseña"
                      id="contraseña"
                    />
                    {errors.contraseña.required ? (
                      <span className="text-danger">Contraseña es requerido.</span>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="genero" className="text-uppercase">
                      Genero
                    </label>
                    <select
                      className="form-control"
                      onChange={handleInput}
                      name="genero"
                      id="genero"
                      value={inputs.genero}
                    >
                      <option value="">Seleccione...</option>
                      <option value="m">Masculino</option>
                      <option value="f">Femenino</option>
                    </select>
                    {errors.genero.required ? (
                      <span className="text-danger">Genero es requerido.</span>
                    ) : null}
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="edad" className="text-uppercase">
                      Edad
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={handleInput}
                      name="edad"
                      id="edad"
                    />
                    {errors.edad.required ? (
                      <span className="text-danger">Edad es requerido.</span>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="identificacion" className="text-uppercase">
                      Identificacion
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInput}
                      name="identificacion"
                      id="identificacion"
                    />
                    {errors.identificacion.required ? (
                      <span className="text-danger">
                        Identificacion es requerido.
                      </span>
                    ) : null}
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="direccion" className="text-uppercase">
                      Direccion
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInput}
                      name="direccion"
                      id="direccion"
                    />
                    {errors.direccion.required ? (
                      <span className="text-danger">
                        Direccion es requerido.
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="telefono" className="text-uppercase">
                      Telefono
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInput}
                      name="telefono"
                      id="telefono"
                    />
                    {errors.telefono.required ? (
                      <span className="text-danger">Telefono es requerido.</span>
                    ) : null}
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="estado" className="text-uppercase">
                      Estado
                    </label>
                    <select
                      className="form-control"
                      onChange={handleInput}
                      name="estado"
                      id="estado"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                    {errors.estado.required ? (
                      <span className="text-danger">Estado es requerido.</span>
                    ) : null}
                  </div>
                </div>

                <div className="form-group">
                  <span className="text-danger">
                    {errors.custom_error ? <p>{errors.custom_error}</p> : null}
                  </span>
                  {loading ? (
                    <div className="text-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    disabled={loading}
                    value="Registrar"
                  />
                </div>

                <div className="clearfix"></div>
                <div className="form-group">
                  Ya tienes cuenta ?  <Link to="/login">Ingresa</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
