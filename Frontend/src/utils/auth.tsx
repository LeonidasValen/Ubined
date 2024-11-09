import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authConext";

export const Auth = () => {
    const { loading, isAuthenticated, user } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        const storedUsername = localStorage.getItem('session_username');

        if (!storedUsername || !loading && (!isAuthenticated || !user)) {
            // Solo navega cuando los datos ya no están cargando y el usuario no está autenticado.
            navigate('/');
        }
    }, [loading, isAuthenticated, user, navigate]);

}