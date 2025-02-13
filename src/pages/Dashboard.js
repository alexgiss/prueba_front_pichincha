import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { logout, isAuthenticated } from "../services/Auth";

export const LoginApi = async (inputs) => {
    try {
        const response = await axios.post(process.env.REACT_APP_LOGIN_URL, {
            nombre: inputs.nombre,
            contraseña: inputs.contraseña,
        });
        localStorage.setItem("token", response.data.token);
        return response;
    } catch (error) {
        console.error("Error en login", error);
        throw error;
    }
};

export default function DashboardPage() {
    const navigate = useNavigate();

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex h-screen">
            <aside className="w-1/4 bg-gray-100 p-4 border-r">
                <h2 className="text-lg font-bold mb-4">BANCO</h2>
                <ul className="space-y-2">
                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Clientes</li>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Cuentas</li>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Movimientos</li>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Reportes</li>
                </ul>
            </aside>
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Clientes</h3>
                    <button className="bg-yellow-400 px-4 py-2 rounded">Nuevo</button>
                </div>
                <input
                    type="text"
                    placeholder="Buscar"
                    className="border p-2 w-full mb-4"
                />
                <div className="border p-4 h-64 bg-white rounded shadow-sm">
                    <p className="text-gray-500">Lista de clientes</p>
                </div>
            </main>
        </div>
    );
}
