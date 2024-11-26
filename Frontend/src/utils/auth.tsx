import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authConext";

interface AuthGuardProps {
    children: ReactNode;
  }

export const AuthAuthenticated: React.FC<AuthGuardProps> = ({ children }) => {
    const { loading, isAuthenticated, user } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        const storedUsername = localStorage.getItem('session_username');

        if (!storedUsername || (!loading && (!isAuthenticated || !user))) {
            // Solo navega cuando los datos ya no están cargando y el usuario no está autenticado.
            navigate('/error');
        }
    }, [loading, isAuthenticated, user, navigate]);

    return <>{children}</>;
}

export const RolAuthenticated: React.FC<AuthGuardProps> = ({ children }) => {
    const { loading, isAuthenticated, user } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        const storedUsername = localStorage.getItem('session_username');

        if (!storedUsername || (!loading && (!isAuthenticated || !user))) {
            // Solo navega cuando los datos ya no están cargando y el usuario no está autenticado.
            navigate('/login');
        }
    }, [loading, isAuthenticated, user, navigate]);

    return <>{children}</>;
}