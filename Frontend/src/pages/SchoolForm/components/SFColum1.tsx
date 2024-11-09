import { useEffect} from "react";
import { IconCamera, IconEmail, IconFacebook, IconInstagram, IconPhone, IconTwitter, IconYoutube } from "../../../assets/Icons";
import { useAxios } from "../../../hooks/useAxios";
import { Localidad, Provincia } from "../interface/FormSchool";



export function SFColum1({localidades, setLocalidad, provincias, setProvincia}: {localidades: Localidad[], setLocalidad: React.Dispatch<React.SetStateAction<Localidad[]>>, provincias: Provincia[], setProvincia: React.Dispatch<React.SetStateAction<Provincia[]>>}) {

  const { fetchData } = useAxios();


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
    setLocalidad([]);
    if (id) {
      getLocalidades(id);
    }
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
          <select name="provincia" id="provincia" onChange={(e) => handleProvincia(e)}>
            <option value="">Selecciona la provincia</option>
            {
              provincias.map((pro: Provincia) => (
                <option value={pro.id} key={pro.id}>{pro.provincia}</option>
              ))
            }
          </select>
        </div>
        <div className="formInput">
          <label htmlFor="localidad">Localidad:</label>
          <select name="localidad" id="localidad">
            <option value="">Selecciona la localidad</option>
            {
              localidades.map((loc: Localidad) => (
                <option value={loc.id} key={loc.id}>{loc.localidad}</option>
              ))
            }
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
