import {useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IconArrowDown, IconSearch } from "../../assets/Icons";
import './search.css'

export function Search() {

    const [search, setSearch] = useState<string>(''); // Estado del input de búsqueda
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // Obtener los parámetros de la URL

    // Obtiene el valor de 'search' de la URL y lo almacena en el estado
    useEffect(() => {
        const searchFromUrl = searchParams.get('search'); 
        if (searchFromUrl) {
            setSearch(searchFromUrl);
        } else {
            setSearch('');
        }
    }, [searchParams]);

    //al hacer clic en el boton buscar
    const handleSearch = () => {
        if (search.trim()) { 
            const newSearchParams = new URLSearchParams(searchParams.toString()); 
            newSearchParams.set('search', search);
            navigate(`/schools/?${newSearchParams.toString()}`, { replace: true }); // Navega a la nueva URL sin reemplazar los filtros existentes
        } else {
            // Si el campo está vacio, eliminamos 'search' de los parametros
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('search');
            navigate(`/schools/?${newSearchParams.toString()}`, { replace: true });
        }
    };

    // maneja la busqueda al presionar Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(); // llama la busqueda
        }
    };

    return (
        <div className="searchSchool">
            <div className="sIntitucion">
                <button onClick={handleSearch} aria-label="Search"><IconSearch /></button>
                <input type="text" placeholder="Buscar institucion" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
            </div>
            <div className="select">
                <div className="sUbicacion">
                    <button className="options">
                        Provincia
                        <IconArrowDown />
                    </button>
                </div>
                <div className="sUbicacion">
                    <button className="options">
                        Localidad
                        <IconArrowDown />
                    </button>
                </div>
            </div>
        </div>
    )
}
