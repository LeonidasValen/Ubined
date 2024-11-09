import { useEffect, useState } from "react"
import { useAuth } from "../../../context/authConext"
import { useNavigate } from "react-router-dom"
import { SFColum1 } from "../components/SFColum1"
import { SFColum2 } from "../components/SFColum2"
import { Localidad, Offert, Provincia } from "../interface/FormSchool"
import '../shoolForm.css'

export function SchoolForm() {

  const { loading, isAuthenticated, user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    const storedUsername = localStorage.getItem('session_username');

    if (!storedUsername || !loading && (!isAuthenticated || !user)) {
      // Solo navega cuando los datos ya no estan cargando y el usuario no esta autenticado.
      navigate('/');
    }
  }, [loading, isAuthenticated, user, navigate]);

  //Formulario institutos

  const [provincias, setProvincia] = useState<Provincia[]>([]);
  const [localidades, setLocalidad] = useState<Localidad[]>([]);


  const [selectedOfferts, setSelectedOfferts] = useState<number[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("data");
  }

  return (
    <form className="schoolFormContainer" onSubmit={handleSubmit}>
      <main className="schoolForm">
        <SFColum1 provincias={provincias} setProvincia={setProvincia} localidades={localidades} setLocalidad={setLocalidad} />
        <SFColum2 selectedOfferts={selectedOfferts} setSelectedOfferts={setSelectedOfferts} />
      </main>
      <button type="submit" className="schoolFormSubmit">
        Subir Institución
      </button>
    </form>
  )
}
