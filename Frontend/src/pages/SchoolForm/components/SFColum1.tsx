import { useEffect, useState } from "react";
import { IconCamera, IconEmail, IconFacebook, IconInstagram, IconPhone, IconTwitter, IconYoutube } from "../../../assets/Icons";
import { useAxios } from "../../../hooks/useAxios";
import { FormData, Localidad, Provincia } from "../interface/FormSchool";

interface SFColum1Props {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
}

export function SFColum1({ setFormData, formData }: SFColum1Props) {

  console.log(formData);

  const { fetchData } = useAxios();

  //Formulario institutos
  const [provincias, setProvincia] = useState<Provincia[]>([]);
  const [localidades, setLocalidad] = useState<Localidad[]>([]);

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

  const getLocalidades = async (id: number) => {
    try {
      const resLoc = await fetchData({
        url: `/institucion/localidades/${id}`,
        method: 'get',
      });
      setLocalidad(resLoc);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProvincia = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      id_provincia: id,
      id_localidad: 0 // Reinicia el id_localidad si cambian la provincia
    }));
    setLocalidad([]);
    if (id) {
      getLocalidades(id);
    }
  };

  const handleLocalidad = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      id_localidad: id,
    }));
  };

  return (
    <section className="sGeneralForm formColum">
      <header className="gPhotoInstitute Form">
        <div className="gPhoto">
          <IconCamera />
        </div>
        <p>Agregar Fotos</p>
      </header>

      <div className="gFormDirection">
        <h2>Localización</h2>
        <div className="formInput">
          <label htmlFor="provincia">Provincia:</label>
          <select name="provincia" id="provincia" onChange={handleProvincia}>
            <option value="">Selecciona la provincia</option>
            {provincias.map((pro: Provincia) => (
              <option value={pro.id} key={pro.id}>{pro.provincia}</option>
            ))}
          </select>
        </div>
        <div className="formInput">
          <label htmlFor="localidad">Localidad:</label>
          <select name="localidad" id="localidad" onChange={handleLocalidad}>
            <option value="">Selecciona la localidad</option>
            {localidades.map((loc: Localidad) => (
              <option value={loc.id} key={loc.id}>{loc.localidad}</option>
            ))}
          </select>
        </div>
        <div className="formInput">
          <label htmlFor="address">Dirección:</label>
          <input type="text" id="address" placeholder="Dirección" autoComplete="off" />
        </div>
      </div>

      <div className="formCoctacts">
        <h2>Contactos</h2>
        <div className="contactsInput">
          <label htmlFor="phone">Teléfono:</label>
          <div className="inputCoctact">
            <IconPhone />
            <input type="text" id="phone" placeholder="Teléfono" autoComplete="off" />
          </div>
        </div>
        <div className="contactsInput">
          <label htmlFor="email">Correo:</label>
          <div className="inputCoctact">
            <IconEmail />
            <input type="email" id="email" placeholder="Correo" autoComplete="off" />
          </div>
        </div>
      </div>

      <div className="gFormSocial">
        <h2>Redes sociales</h2>
        <div className="socialInput">
          <IconFacebook />
          <input type="text" id="facebook" placeholder="Facebook" autoComplete="off" />
        </div>
        <div className="socialInput">
          <IconInstagram />
          <input type="text" id="instagram" placeholder="Instagram" autoComplete="off" />
        </div>
        <div className="socialInput">
          <IconTwitter />
          <input type="text" id="twitter" placeholder="Twitter" autoComplete="off" />
        </div>
        <div className="socialInput">
          <IconYoutube />
          <input type="text" id="youtube" placeholder="Youtube" autoComplete="off" />
        </div>
      </div>

      <footer className="webSite">
        <label htmlFor="web">Sitio web:</label>
        <input type="text" id="web" placeholder="Sitio web" autoComplete="off" />
      </footer>
    </section>
  )
}
