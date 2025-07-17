import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SFColum1 } from "@pages/SchoolForm/components/SFColum1"
import { SFColum2 } from "@pages/SchoolForm/components/SFColum2"
import { SFModal } from "@pages/SchoolForm/components/SFModal"
import { ErrorSchool, FormDatas } from "@pages/SchoolForm/interface/FormSchool"
import { useSchool } from "@context/schoolContext"
import { useAuth } from "@/context/authConext"
import './shoolForm.css'

export function SchoolForm() {
  
  const { postSchool } = useSchool()
  
  const { isAuthenticated, user, loading } = useAuth()
  
  const navigate = useNavigate()

  if (!loading) {
    if (!isAuthenticated && !user) {
      navigate('/error')
    }
  }

  const [modal, setModal] = useState<boolean>(false)

  const [images, setImages] = useState<File[]>([]);

  const [formData, setFormData] = useState<FormDatas>({
    id_provincia: 0,
    id_localidad: 0,
    address: '',
    phone: '',
    email: '',
    socialLink: [
      { id_social: 1, link: '' },
      { id_social: 2, link: '' },
      { id_social: 3, link: '' },
      { id_social: 4, link: '' },
    ],
    web: '',

    nameSchool: '',
    schoolType: 'Pública',
    cue: 0,
    nivel: 'Inicial',
    horary: '',
    descrip: '',
    offerts: [],
    managers: [
      { cargo: '', nombre: '' }
    ],
    requirement: '',

    schoolHas: {
      team_ori: 0,
      center_st: 0,
      library: 0,
      yard: 0,
      dining_room: 0,
      food_sr: 0,
    },
  })

  const [errors, setErrors] = useState({});

  // Maneja los cambios en los campos de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? (value === '' ? '' : parseInt(value)) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: ErrorSchool = {};

    const formSend = new FormData();

    //Validacion de los campos columna 1

    if (images.length > 5) {
      newErrors.images = 'No puedes subir más de 5 fotos';
      return;
    }

    images.forEach((file) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (!allowedTypes.includes(file.type)) {
        newErrors.images = 'Debes agregar una foto válida (JPEG, PNG, JPG)';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        newErrors.images = 'Debes agregar una foto menor a 5MB';
        return;
      }

      formSend.append('images', file);
    });

    if (!formData.id_provincia) newErrors.id_provincia = 'Seleccione la provincia';
    if (!formData.id_localidad) newErrors.id_localidad = 'Seleccione la localidad';
    if (!formData.address) newErrors.address = 'Ingrese la dirección';
    if (!formData.phone) newErrors.phone = 'Ingrese el teléfono';
    if (!formData.email) newErrors.email = 'Ingrese el email';

    const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    if (formData.web) {
      if (!urlRegex.test(formData.web)) {
        newErrors.web = 'Ingrese una web válida';
      } else {
        formSend.append("web", formData.web);
      }
    }

    const socialNames: Record<number, string> = {
      1: 'Facebook',
      2: 'Instagram',
      3: 'Twitter',
      4: 'Youtube',
    };

    const newErrorLinks: Record<number, string> = {};

    formData.socialLink?.forEach((item) => {
      const nombreRed = socialNames[item.id_social] || `Red social ${item.id_social}`;
      const link = item.link?.trim();

      if (link && !urlRegex.test(link)) {
        newErrorLinks[item.id_social] = `El enlace de ${nombreRed} no es válido`;
      }

    });

    if (Object.keys(newErrorLinks).length > 0) {
      newErrors.linksErrors = newErrorLinks;
    }

    //Validacion del campos columna 2
    if (!formData.nameSchool) {
      newErrors.nameSchool = 'Ingrese el nombre de la escuela';
    }
    const errorMessages: string[] = [];

    if (!formData.horary) errorMessages.push('Ingrese el horario');
    if (!formData.cue) {
      errorMessages.push('Ingrese el CUE');
    } else if (!/^\d+$/.test(String(formData.cue))) {
      errorMessages.push('El CUE debe contener solo números');
    }

    const tiposValidos = ['Pública', 'Privada'];
    if (!formData.schoolType) {
      errorMessages.push('Ingrese el tipo');
    } else if (!tiposValidos.includes(formData.schoolType)) {
      errorMessages.push('El tipo no es válido (debe ser "Pública" o "Privada")');
    }

    if (errorMessages.length > 0) {
      newErrors.dataErrors = errorMessages.join(', ');
    }

    if (!formData.descrip) newErrors.descrip = 'Ingrese la descripción';

    if (formData.managers.length < 2) newErrors.managers = 'Debes agregar al menos 2 cargos';

    if (!formData.requirement) newErrors.requirement = 'Ingrese los requerimientos para ingresar o inscribirse a la escuela';

    // Si hay errores, mostrarlos y detener el envío del formulario
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors || "Error en los datos del fomulario, por favor inténtelo de nuevo");
      return;
    }

    //envio del formulario

    formSend.append("id_provincia", String(formData.id_provincia));
    formSend.append("id_localidad", String(formData.id_localidad));
    formSend.append("address", formData.address);
    formSend.append("phone", String(formData.phone));
    formSend.append("email", formData.email);
    formSend.append("socialLink", JSON.stringify(formData.socialLink));
    formSend.append("nameSchool", formData.nameSchool);
    formSend.append("schoolType", formData.schoolType);
    formSend.append("cue", String(formData.cue));
    formSend.append("nivel", formData.nivel);
    formSend.append("horary", formData.horary);
    formSend.append("descrip", formData.descrip);
    formSend.append("managers", JSON.stringify(formData.managers));
    formSend.append("requirement", formData.requirement);
    formSend.append("offerts", JSON.stringify(formData.offerts));
    formSend.append("team_ori", formData.schoolHas.team_ori.toString());
    formSend.append("center_st", formData.schoolHas.center_st.toString());
    formSend.append("library", formData.schoolHas.library.toString());
    formSend.append("yard", formData.schoolHas.yard.toString());
    formSend.append("dining_room", formData.schoolHas.dining_room.toString());
    formSend.append("food_sr", formData.schoolHas.food_sr.toString());

    console.log('FormData entries:', Array.from(formSend.entries()));

    try {
      await postSchool(formSend);
      //navigate('/schools');
    } catch (error) {
      console.log(error);
    }

  }

  return (
      <form className="schoolFormContainer" onSubmit={handleSubmit}>
        <main className="schoolForm">
          <SFColum1 setFormData={setFormData} formData={formData} images={images} errors={errors} handleChange={handleChange} setModal={setModal} />
          <SFColum2 setFormData={setFormData} formData={formData} errors={errors} handleChange={handleChange} />
        </main>
        <button type="submit" className="schoolFormSubmit">
          Subir Institución
        </button>
        {
          modal &&
          <SFModal setModal={setModal} images={images} setImages={setImages} />
        }
      </form>
  )
}
