import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { useAxios } from "@hooks/useAxios";
import { DetailSchool, School } from "./interface/school";


interface SchoolContextProps {
    getSchools: (filter: string) => Promise<void>;
    getSchool: (id: number) => Promise<void>;
    postSchool: (formData: FormData) => Promise<void>;
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

    const { fetchData, loading, error } = useAxios();

    const [schools, setSchools] = useState<School[]>([])

    const [school, setSchool] = useState<DetailSchool[]>([])

    const getSchools = useCallback(async (filter: string) => { //listado de escuelas
        setSchools([]);
        try {
            const res = await fetchData({
                url: `/institucion/schools/?${filter}`,
                method: 'get',
            });
            setSchools(res);
        } catch (error) {
            console.error(error);
        }
    }, [fetchData]);

    const getSchool = useCallback(async (id: number) => { //detalle de escuela
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
    }, [fetchData]);

    const postSchool = useCallback(async (formData: FormData) => {
        try {
            const res = await fetchData({
                url: '/institucion/school',
                method: 'post',
                data: formData,
            });
            setSchool(res);
        } catch (error) {
            console.error(error);
        }
    }, [fetchData]);

    return (
        <SchoolContext.Provider value={{ getSchools, getSchool, postSchool,schools, school, loading, error }}>
            {children}
        </SchoolContext.Provider>
    )
}