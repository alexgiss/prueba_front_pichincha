import { Link } from "react-router-dom";
import { isAuthenticated } from "../services/Auth";

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Banco Pichincha</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    {!isAuthenticated() && <li className="nav-item"><Link className="nav-link" to="/registro">Registrar</Link></li>}
                    {!isAuthenticated() && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
                    {isAuthenticated() && <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>}
                    {isAuthenticated() && (
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

function handleLogout() {
    console.log("Cerrando sesión...");
}
