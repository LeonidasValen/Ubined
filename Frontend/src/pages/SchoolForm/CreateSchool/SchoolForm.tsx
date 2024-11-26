import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SFColum1 } from "../components/SFColum1"
import { SFColum2 } from "../components/SFColum2"
import { FormData, Modalidad } from "../interface/FormSchool"
import '../shoolForm.css'

export function SchoolForm() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    id_provincia: 0,
    id_localidad: 0,
    address: '',
    cue: 0,
    nivel: '',
    horary: '',
  })


  const [selectedOfferts, setSelectedOfferts] = useState<Modalidad[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(selectedOfferts);
    navigate('/schools')

  }

  return (
    <form className="schoolFormContainer" onSubmit={handleSubmit}>
      <main className="schoolForm">
        <SFColum1 setFormData={setFormData} formData={formData} />
        <SFColum2 setSelectedOfferts={setSelectedOfferts} />
      </main>
      <button type="submit" className="schoolFormSubmit">
        Subir Institución
      </button>
    </form>
  )
}
