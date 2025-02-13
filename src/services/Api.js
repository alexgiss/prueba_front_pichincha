import axios from "axios"
import { getUserData} from './Storage'

axios.defaults.baseURL = "http://localhost:8080";
const API_KEY = "%YOUR_FIREBASE_API_KEY%"
const REGISTER_URL = `/cliente`;
const LOGIN_URL = `/login`;
const USER_DETAILS_URL = `/accounts:lookup?key=${API_KEY}`;

export const RegisterApi = (inputs) => {
    let data = {
        nombre: inputs.nombre,
        genero: inputs.genero,
        edad: inputs.edad,
        identificacion: inputs.identificacion,
        direccion: inputs.direccion,
        telefono: inputs.telefono,
        contraseña: inputs.contraseña,
        estado: inputs.estado
    };
    console.log("datos",data)
    return axios.post(REGISTER_URL, data)
    .then(response => response.data)
    .catch(error => {
        console.error("Error registering user:", error.response?.data);
        throw error;
    });
};
export const LoginApi = (inputs)=>{
    let data  = {nombre:inputs.nombre,contraseña:inputs.contraseña }
    console.log("datos",data)
    return axios.post(LOGIN_URL,data)
}
export const UserDetailsApi = ()=>{
    let data = {idToken:getUserData()}
    return axios.post(USER_DETAILS_URL,data)
}