import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true

interface CustomAxiosRequest extends AxiosRequestConfig {
    url: string;
    method: 'post' | 'get' | 'put' | 'delete';
    data?: any;
    headers?: any;
}

export const useAxios = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string[]>([])

    const fetchData = async ({ url, method, data, headers }: CustomAxiosRequest) => {
        setLoading(true)
        setError([]);
        try {

            const response = await axios({
                url,
                method,
                data,
                headers,
            });

            return response.data
        } catch (error: any) {
            //console.log(error)
            console.error(error?.response?.data?.error || error?.response?.data?.message || ['Error en el envío de la petición'])
            setError(error?.response?.data?.error || error?.response?.data?.message || ['Error en el envío de la petición']); // Actualiza el estado de error
            throw (error?.response?.data?.error || error?.response?.data?.message || ['Error en el envío de la petición del servidor']);
        } finally {
            setLoading(false)
        }
    }
    return { fetchData, loading, error, setLoading };
}