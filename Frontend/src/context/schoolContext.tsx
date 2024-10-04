import { createContext, ReactNode, useContext, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { DetailSchool, School } from "./interface/school";


interface SchoolContextProps {
    getSchools: () => Promise<void>;
    getSchool: (id:number) => Promise<void>;
    schools: School[];
    school: DetailSchool[];
    loading: boolean;
    error: string[] | null;
}

export const SchoolContext = createContext<SchoolContextProps | undefined>(undefined)

export const useSchool = () => {
    const context = useContext(SchoolContext)
    if (!context) {
        throw new Error("schoolContext no esta dentro del contexto")
    }
    return context
}

interface SchoolProvider {
    children: ReactNode
}

export const SchoolProvider: React.FC<SchoolProvider> = ({ children }) => {

    const { fetchData, loading, error} = useAxios();

    const [schools, setSchools] = useState<School[]>([])

    const [school, setSchool] = useState<DetailSchool[]>([])

    const getSchools = async () => {
        setSchools([]);
        try {
            const res = await fetchData({
                url: '/institucion/schools',
                method: 'get',
            });
            setSchools(res);
        } catch (error) {
            console.error(error);
        }
    };

    const getSchool = async (id: number) => {
        setSchool([]);
        try {
            const res = await fetchData({
                url: `/institucion/school/${id}`,
                method: 'get',
            });
            setSchool(res);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SchoolContext.Provider value={{ getSchools, getSchool, schools, school, loading, error }}>
            {children}
        </SchoolContext.Provider>
    )
}