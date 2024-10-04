// import React, { createContext, ReactNode, useContext } from "react";
// import { useAxios } from "../hooks/useAxios";

// interface UserContextProps {

// }

// interface User {
//     id: number;
//     email: string;
//     photo: string | null;
//     rol: string;
//     title: string;
// }

// interface Profile {
//     id: number;
//     email: string;
//     photo: string | null;
//     username: string;
// }

// export const UserContext = createContext<UserContextProps | undefined>(undefined);

// //verifica que este el conetexto
// export const useUser = () => {
//     const context = useContext(UserContext)
//     if (!context) {
//         throw new Error("useAuth no esta dentro del contexto")
//     }
//     return context;
// }

// interface UserProviderProp {
//     children: ReactNode
// }

// export const UserProvider: React.FC<UserProviderProp> = ({ children }) => {

//     const { fetchData, loading, error } = useAxios();

//     return(
//      <UserContext.Provider value={{}}>
//         {children}
//      </UserContext.Provider>   
//     )
// }