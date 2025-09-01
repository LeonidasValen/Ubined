import { useEffect, useState } from "react";
import { IconCamera, IconEmail, IconFacebook, IconInstagram, IconPhone, IconTwitter, IconYoutube } from "@assets/Icons";
import { useAxios } from "../../../hooks/useAxios";
import { ErrorSchool, FormDatas, Localidad, Provincia } from "../interface/FormSchool";

interface SFColum1Props {
  setFormData: React.Dispatch<React.SetStateAction<FormDatas>>;
  formData: FormDatas;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: ErrorSchool;
  images: File[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SFColum1({ setFormData, formData, errors, images, handleChange, setModal }: SFColum1Props) {

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

  useEffect(() => { // Cuando existe id_provincia en formData ya que va editar el instituto carga las localidades
    if (formData.id_provincia > 0) {
      getLocalidades(formData.id_provincia);
    }
  }, [formData.id_provincia]);

  const handleLocalidad = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      id_localidad: id,
    }));
  };

  const handleSocialChange = (id_social: number, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      socialLink: (prevData.socialLink || []).map((social) =>
        social.id_social === id_social ? { ...social, link: value } : social
      ),
    }));
  };

  return (
    <section className="sGeneralForm formColum">
      <header className="gPhotoInstitute Form" onClick={() => setModal(true)}>
        {
          images.length > 0 &&
          <div className="miniatureImage" key={`imageMiniature`}>
            <img src={URL.createObjectURL(images[0])} alt="" />
          </div>
        }
        <div className="gPhoto">
          <IconCamera />
        </div>
        <p>Agregar Fotos</p>
      </header>
      {errors.images && <p className="fError">{errors.images}</p>}

      <div className="gFormDirection">
        <h2>Localización</h2>
        <div className="formInput">
          <label htmlFor="provincia">Provincia:</label>
          <select name="provincia" id="provincia" value={formData.id_provincia} onChange={handleProvincia}>
            <option value="">Selecciona la provincia</option>
            {provincias.map((pro: Provincia) => (
              <option value={pro.id} key={pro.id}>{pro.provincia}</option>
            ))}
          </select>
          {errors.id_provincia && <p className="fError">{errors.id_provincia}</p>}
        </div>
        <div className="formInput">
          <label htmlFor="localidad">Localidad:</label>
          <select name="localidad" id="localidad" value={formData.id_localidad} onChange={handleLocalidad}>
            <option value="">Selecciona la localidad</option>
            {localidades.map((loc: Localidad) => (
              <option value={loc.id} key={loc.id}>{loc.localidad}</option>
            ))}
          </select>
          {errors.id_localidad && <p className="fError">{errors.id_localidad}</p>}
        </div>
        <div className="formInput">
          <label htmlFor="address">Dirección:</label>
          <input type="text" id="address" name="address" placeholder="Dirección" value={formData.address} autoComplete="off" onChange={handleChange} />
          {errors.address && <p className="fError">{errors.address}</p>}
        </div>
      </div>

      <div className="formCoctacts">
        <h2>Contactos</h2>
        <div className="contactsInput">
          <label htmlFor="phone">Teléfono:</label>
          <div className="inputCoctact">
            <IconPhone />
            <input type="text" id="phone" name="phone" placeholder="Teléfono" value={formData.phone} autoComplete="off" onChange={handleChange} />
          </div>
          {errors.phone && <p className="fError">{errors.phone}</p>}
        </div>
        <div className="contactsInput">
          <label htmlFor="email">Correo:</label>
          <div className="inputCoctact">
            <IconEmail />
            <input type="email" id="email" name="email" placeholder="Correo" autoComplete="off" value={formData.email} onChange={handleChange} />
          </div>
          {errors.email && <p className="fError">{errors.email}</p>}
        </div>
      </div>

      <div className="gFormSocial">
        <h2>Redes sociales</h2>
        <div className="socialInput">
          <IconFacebook />
          <input type="text" id="facebook" placeholder="Facebook" autoComplete="off"
            onChange={(e) => handleSocialChange(1, e.target.value)} />
        </div>
        {errors.linksErrors?.[1] && <p className="fError">{errors.linksErrors[1]}</p>}
        <div className="socialInput">
          <IconInstagram />
          <input type="text" id="instagram" placeholder="Instagram" autoComplete="off"
            onChange={(e) => handleSocialChange(2, e.target.value)} />
        </div>
        {errors.linksErrors?.[2] && <p className="fError">{errors.linksErrors[2]}</p>}
        <div className="socialInput">
          <IconTwitter />
          <input type="text" id="twitter" placeholder="Twitter" autoComplete="off"
            onChange={(e) => handleSocialChange(3, e.target.value)} />
        </div>
        {errors.linksErrors?.[3] && <p className="fError">{errors.linksErrors[3]}</p>}
        <div className="socialInput">
          <IconYoutube />
          <input type="text" id="youtube" name="youtube" placeholder="Youtube" autoComplete="off"
            onChange={(e) => handleSocialChange(4, e.target.value)} />
        </div>
        {errors.linksErrors?.[4] && <p className="fError">{errors.linksErrors[4]}</p>}
      </div>

      <footer className="webSite">
        <label htmlFor="web">Sitio web:</label>
        <input type="text" id="web" name="web" placeholder="Sitio web" autoComplete="off" value={formData.web} onChange={handleChange} />
        {errors.web && <p className="fError">{errors.web}</p>}
      </footer>
    </section>
  )
}
