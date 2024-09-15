import { IconArrowDown, IconSearch } from "../../assets/Icons";
import './search.css'

export function Search() {
  return (
    <div className="searchSchool">
        <div className="sIntitucion">
            <button><IconSearch/></button>
            <input type="text" placeholder="Buscar institucion"/>
        </div>
        <div className="select">
            <div className="sUbicacion">
                <button className="options">
                    Provincia
                    <IconArrowDown/>
                </button>
            </div>
            <div className="sUbicacion">
            <button className="options">
                    Localidad
                    <IconArrowDown/>
                </button>
            </div>
        </div>
    </div>
  )
}
