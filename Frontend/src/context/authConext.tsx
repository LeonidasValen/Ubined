import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

interface AuthContextProps {
    signUp: (user: Partial<User>) => Promise<void>;
    signIn: (user: Partial<User>) => Promise<void>;
    logout: () => Promise<void>;
    checkLogin: () => Promise<void>;
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string[] | null;
}

interface User {
    id: number;
    profile: string | null;
    title: string;
    email: string;
    rol: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

//verifica que este dentro del contexto
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth no esta dentro del contexto")
    }
    return context;
}

interface AuthProviderProp {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProp> = ({ children }) => {

    const { fetchData, loading, error, setLoading } = useAxios();

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null)

    //const [userProfile, setUserProfile] = useState<Profile | null>(null)

    // <-- AUTH -->

    //register
    const signUp = useCallback(async (user: Partial<User>) => {
        await fetchData({
            url: '/auth/register',
            method: 'post',
            data: user,
        });
    }, [fetchData]);

    const signIn = useCallback(async (user: Partial<User>) => {
        const res = await fetchData({
            url: '/auth/login',
            method: 'post',
            data: user,
        });
        setUser(res);
        localStorage.setItem('session_username', res.title);
        setAuthenticated(true);
    }, [fetchData]);

    const logout = useCallback(async () => {
        await fetchData({
            url: '/auth/logout',
            method: 'post',
        });
        setUser(null);
        localStorage.removeItem('session_username');
        setAuthenticated(false);
    }, [fetchData]);

    // <-- USER -->

    const checkLogin = useCallback(async () => {
        const storedUsername = localStorage.getItem('session_username');
        if (storedUsername) {
            try {
                const res = await fetchData({
                    url: '/user/user',
                    method: 'get',
                });
                if (!res) {
                    setAuthenticated(false);
                    localStorage.removeItem('session_username');
                    logout();
                } else {
                    setAuthenticated(true);
                    setUser(res.user);
                }
            } catch (error) {
                setAuthenticated(false);
                setUser(null);
                localStorage.removeItem('session_username');
                logout();
                setLoading(false);
            }
        } else {
            setAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
    }, [fetchData, logout, setLoading]);

    //trae los datos del usuario
    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ loading, error, user, isAuthenticated, signUp, signIn, logout, checkLogin }}>
            {children}
        </AuthContext.Provider>
    )
}