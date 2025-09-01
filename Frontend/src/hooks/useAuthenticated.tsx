import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/authConext"

export function useAuthenticated() {

    const { isAuthenticated, user, loading } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        // Only run this logic when 'loading' is false
        if (!loading) {
            if (!isAuthenticated && !user) {
                // Redirect to an error page or login page
                navigate('/login');
            }
        }
    }, [isAuthenticated, user, loading, navigate]);
}
