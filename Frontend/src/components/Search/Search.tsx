import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IconArrowDown, IconSearch } from "@/assets/Icons";
import { useAxios } from "../../hooks/useAxios";
import './search.css'

export interface Provincia {
    id: number;
    provincia: string;
}

export interface Localidad {
    id: number;
    localidad: string;
    id_provincia: number;
}

export function Search() {

    const { fetchData } = useAxios();
    const navigate = useNavigate();
    const menuDrop = useRef<HTMLDivElement | null>(null)

    //estado del input de busqueda
    const [search, setSearch] = useState<string>(''); // Estado del input de busqueda
    const [searchParams] = useSearchParams(); // Obtener los parametros de la URL

    //modales de provincia y localidad
    const [modalProv, setModalProv] = useState<boolean>(false);
    const [modalLoc, setModalLoc] = useState<boolean>(false);

    const [provincias, setProvincia] = useState<Provincia[]>([]);
    const [localidades, setLocalidad] = useState<Localidad[]>([]);
    const [selectedProvincia, setSelectedProvincia] = useState<Provincia | null>(null);
    const [selectedLocalidad, setSelectedLocalidad] = useState<Localidad | null>(null);

    // Cierra el modal si se hace clic fuera de él
    const handleClickOutside = (event: MouseEvent) => {
        if (menuDrop.current && !menuDrop.current.contains(event.target as Node)) {
            setModalProv(false)
            setModalLoc(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Obtiene la lista de provincias y las localidades de cada provincia
    useEffect(() => {
        const getProvincias = async () => {
            try {
                const resPro = await fetchData({
                    url: '/institucion/provincias',
                    method: 'get',
                });
                setProvincia(resPro);
            } catch (error) {
                console.log(error);
            }
        };
        getProvincias();
    }, []);

    const getLocalidades = async (id: number, localidadName?: string) => {
        try {
            const resLoc = await fetchData({
                url: `/institucion/localidades/${id}`,
                method: 'get',
            });

            setLocalidad(resLoc);
            if (localidadName) {
                const loc = resLoc.find((l: Localidad) => l.localidad === localidadName) || null;
                setSelectedLocalidad(loc);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateQuery = (key: string, value?: string) => { // actualiza la URL con el valor de la provincia y localidad
        const queryParams = new URLSearchParams(location.search);

        if (value) {
            queryParams.set(key, value);
        } else {
            queryParams.delete(key);
        }

        navigate(`/schools/?${queryParams.toString()}`, { replace: true });
    };

    const handleProvincia = (prov: Provincia | null) => { // maneja la seleccion de provincia
        if (prov) {
            setSelectedProvincia(prov);
            setSelectedLocalidad(null); // resetea localidad
            setLocalidad([]);
            updateQuery('provincia', prov.provincia);
            getLocalidades(prov.id);
            setModalProv(false);
        } else {
            setSelectedProvincia(null);
            setSelectedLocalidad(null);
            setLocalidad([]);
            updateQuery('provincia');
            updateQuery('localidad');
        }
    };

    const handleLocalidad = (loc: Localidad | null) => {
        if (loc) {
            setSelectedLocalidad(loc);
            updateQuery('localidad', loc.localidad);
            setModalLoc(false);
        } else {
            setSelectedLocalidad(null);
            updateQuery('localidad');
        }
    };

    // Obtiene el valor de 'search, provincia y localidad' de la URL y lo almacena en el estado
    useEffect(() => {
        const provinciaName = searchParams.get('provincia');
        const localidadName = searchParams.get('localidad');
        const searchFromUrl = searchParams.get('search') || '';

        setSearch(searchFromUrl);

        if (provinciaName && provincias.length > 0) { // si provincia es valida
            const prov = provincias.find(p => p.provincia === provinciaName) || null; // busca en la lista de provincias
            setSelectedProvincia(prov);
            if (prov) { // si provincia es valida y existe
                getLocalidades(prov.id).then(() => { // obtiene las localidades de la id_provincia
                    if (localidadName && localidades.length > 0) {
                        const loc = localidades.find(l => l.localidad === localidadName) || null;
                        setSelectedLocalidad(loc);
                    }
                });
            }
        } else {
            setSelectedProvincia(null);
            setSelectedLocalidad(null);
            setLocalidad([]);
        }
    }, [searchParams, provincias]);

    useEffect(() => { // obtiene el valor de localidad de la URL
        const localidadName = searchParams.get('localidad');
        if (localidadName && localidades.length > 0) {
            const loc = localidades.find(l => l.localidad === localidadName) || null;
            setSelectedLocalidad(loc);
        }
    }, [localidades, searchParams]);

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
                    <button className="options" onClick={() => setModalProv(!modalProv)}>
                        {selectedProvincia?.provincia || 'Provincia'}
                        {
                            selectedProvincia ? (
                                <p onClick={() => handleProvincia(null)} className="provIcon deleteUbi">X</p>)
                                : (
                                    <p className="provIcon"><IconArrowDown /></p>)
                        }

                    </button>
                    {
                        modalProv &&
                        <div className="modalProv" ref={menuDrop}>
                            {provincias.map((prov) => (
                                <div key={prov.id} className="optionUbi" onClick={() => handleProvincia(prov)}>
                                    <p>{prov.provincia}</p>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div className="sUbicacion" onClick={() => setModalLoc(!modalLoc)}>
                    <button className="options">
                        {selectedLocalidad?.localidad || 'Localidad'}
                        {selectedLocalidad ? <p onClick={() => handleLocalidad(null)} className="provIcon deleteUbi">X</p> : <p className="provIcon"><IconArrowDown /></p>}
                    </button>
                    {
                        modalLoc &&
                        <div className="modalProv" ref={menuDrop}>
                            {!selectedProvincia && <p onClick={() => setModalProv(true)} className="optionUbi">Selecciona una provincia</p>}
                            {localidades.map((loc) => (
                                <div key={loc.id} className="optionUbi" onClick={() => handleLocalidad(loc)}>
                                    <p>{loc.localidad}</p>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
