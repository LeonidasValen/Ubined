import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconArrowDown, IconCheck } from '../../../../assets/Icons';
import { useSchool } from '../../../../context/schoolContext';
import './filter.css';

interface Subfilter {
  name: string;
  link: string;
}

interface FilterItem {
  title: string;
  subfilters: Subfilter[];
  type: 'tipo' | 'nivel' | 'horario';
}

const filters: FilterItem[] = [
  {
    title: 'Nivel Académico',
    type: 'nivel',
    subfilters: [
      { name: 'Inicial', link: 'Inicial' },
      { name: 'Primario', link: 'Primario' },
      { name: 'Secundario', link: 'Secundario' },
      { name: 'Técnico', link: 'Técnico' },
      { name: 'Universitario', link: 'Universitario' },
    ],
  },
  {
    title: 'Tipo de educación',
    type: 'tipo',
    subfilters: [
      { name: 'Pública', link: 'Pública' },
      { name: 'Privada', link: 'Privada' },
    ],
  },
  {
    title: 'Horarios y turnos',
    type: 'horario',
    subfilters: [
      { name: 'Mañana', link: 'mañana' },
      { name: 'Tarde', link: 'tarde' },
      { name: 'Noche', link: 'noche' },
      { name: 'Contraturno', link: 'contraturno' },
    ],
  }
];

export function Filter() {
  const {getSchools} = useSchool()
  //Expandir el filtro
  const [expandedFilter, setExpandedFilter] = useState<Set<number>>(new Set());//estado para expandir el filtro
  const filterRefs = useRef<(HTMLUListElement | null)[]>([]);
  
  //cuando se hace click sobre uno de los filtros le pasa el index de cual fue 
  const handleToggle = (index: number) => {
    setExpandedFilter(prev => {
      const newInidece = new Set(prev); //crea un objeto que guarda un  unico valor de los indices (Set(2:cantidad de indices) {1, 0}: cuales son los indices)
      if (newInidece.has(index)) { //verifica si el valor dentro del Set  newInidese coincide con el index traido y retorna un true o false
        newInidece.delete(index); //si es true esto significa que esta abierto y borra el valor haciendo que collapse el filtro
      } else {
        newInidece.add(index); // en caso de que no coincida osea que esta cerrado agrega index al Set lo que haria que se expanda
      }
      return newInidece; //retorna un nuevo estado
    });
  };

  useEffect(() => {
    filterRefs.current.forEach((menu, index) => {
      if (menu) {
        menu.style.height = expandedFilter.has(index) ? `${menu.scrollHeight}px` : '0px'; // agrega la altura si  elexpandedFilter coincide con el indice, le aumenta la altura sino le establece 0
      }
    });
  }, [expandedFilter]);

  //funcion de los filtros checkbox
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const location = useLocation();
  const navigate = useNavigate();

 //agrega los filtros en la url
  const toggleFilter = (type: 'tipo' | 'nivel' | 'horario', link: string) => {
    const queryParams = new URLSearchParams(location.search); //obtiene los parametros de la url para luego su manipulacion
    const currentFilters = selectedFilters[type] || []; //obtiene los filtros ya puestos

    if (currentFilters.includes(link)) { //si el filtro del link ya esta incluido debe se eliminado
      const updatedFilters = currentFilters.filter(item => item !== link);
      queryParams.delete(type); // Borrar todos los valores existentes
      updatedFilters.forEach(value => queryParams.append(type, value));
    } else {
      queryParams.append(type, link); //agrega los filtros si no esta seleccionado
    }
    navigate(`/schools/?${queryParams.toString()}`, { replace: true }); //actualiza la url evitando  que vuelva a una ruta anterior
  }

  //detecta los cambios en la url
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filtersFromUrl: { [key: string]: string[] } = {};
    
    params.forEach((value, key) => {
      if (!filtersFromUrl[key]) {
        filtersFromUrl[key] = [];
      }
      filtersFromUrl[key].push(value);
    });
  
    setSelectedFilters(filtersFromUrl);
    if (params.toString()) {
      getSchools(params.toString());
    } else {
      getSchools('');
    }
  
    // Solo expandir los filtros la primera vez que se cargan
    if (expandedFilter.size === 0) {
      const expandedIndices = new Set<number>();
      params.forEach((_, key) => {
        const filterIndex = filters.findIndex(f => f.type === key);
        if (filterIndex !== -1) {
          expandedIndices.add(filterIndex);
        }
      });
      setExpandedFilter(expandedIndices);
    }
  }, [location.search]);

  return (
    <aside className="filterSchool">
      <h1>Filtrar por:</h1>
      <section className="filterItems">
        {
          filters.map((filter, index) => (
            <div className="items" key={`filters${index}`}>
              <div
                className={`subitems ${expandedFilter.has(index) ? 'actived' : ''}`}
                onClick={() => handleToggle(index)}
              >
                <span>{filter.title}</span>
                <IconArrowDown />
              </div>
              <ul
                className="Ifilters"
                ref={el => filterRefs.current[index] = el}
              >
                {filter.subfilters.map((subfilter, subIndex) => (
                  <li
                    className="item-li"
                    key={subIndex}
                    onClick={() => toggleFilter(filter.type, subfilter.link)}
                  >
                    <div className={`checkbox ${selectedFilters[filter.type]?.includes(subfilter.link) ? 'checked' : ''}`}>
                      <IconCheck />
                    </div>
                    <p className="subfilter">{subfilter.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
      </section>
    </aside>
  );
}
