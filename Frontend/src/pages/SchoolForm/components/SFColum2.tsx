import { useEffect, useState } from "react";
import Select from "react-select";
import { MultiValue } from "react-select";
import { IconSchool, IconStudent } from "../../../assets/Icons";
import { useAxios } from "../../../hooks/useAxios";
import { Offert } from "../interface/FormSchool";

interface SFColum2Props {
  selectedOfferts: number[];
  setSelectedOfferts: React.Dispatch<React.SetStateAction<number[]>>;
}

export function SFColum2({selectedOfferts, setSelectedOfferts}: SFColum2Props) {
  const { fetchData } = useAxios();

  const [offerts, setOfferts] = useState<Offert[]>([])

  useEffect(() => {
    const getModalities = async () => {
      try {
        const res = await fetchData({
          url: '/institucion/modality',
          method: 'get',
        });
        setOfferts(res);
      } catch (error: any) {
        console.log(error);
      }
    }
    getModalities();
  }, [])

  const handleOfferts = (selectedOptions: MultiValue<{ value: number; label: JSX.Element }>) => {
  // Extrae solo los ids de las modalidades seleccionadas
  const selectedModalities = selectedOptions.map(option => option.value);

  // Estructura los datos para el backend
  const dataToSend = selectedModalities.map(id_modalidad => ({id_modalidad}));

  setSelectedOfferts(selectedModalities);
  console.log(dataToSend); // Verifica que solo se imprimen los ids
  };

  return (
    <section className="sPrincipalForm formColum">
      <input className="inputTitle" type="text" placeholder="Nombre Escuela" autoComplete="on" />
      <div className="pInfoInputs">
        <h2>Información principal</h2>
        <ul className="dataInpus">
          <li>
            <label htmlFor="type">Tipo:</label>
            <select name="type" id="type">
              <option value="Pública">Pública</option>
              <option value="Privada">Privada</option>
            </select>
          </li>
          <li>
            <label htmlFor="cue">CUE:</label>
            <input type="number" id="cue" placeholder="CUE" />
          </li>
          <li>
            <label htmlFor="nivel">Nivel:</label>
            <select name="nivel" id="nivel">
              <option value="Inicial">Inicial</option>
              <option value="Primario">Primario</option>
              <option value="Secundario">Secundario</option>
              <option value="Técnico">Técnico</option>
              <option value="Universitario">Universitario</option>
            </select>
          </li>
          <li>
            <label htmlFor="horary">Horarios:</label>
            <div className="horaryChecks">
              <div className="horaryCheck">
                <input type="checkbox" id="Mañana" name="Mañana" />
                <label htmlFor="Mañana">Mañana</label>
              </div>
              <div className="horaryCheck">
                <input type="checkbox" id="Tarde" name="Tarde" />
                <label htmlFor="Tarde">Tarde</label>
              </div>
              <div className="horaryCheck">
                <input type="checkbox" id="Noche" name="Noche" />
                <label htmlFor="Noche">Noche</label>
              </div>
              <div className="horaryCheck">
                <input type="checkbox" id="Contraturno" name="Contraturno" />
                <label htmlFor="Contraturno">Contraturno</label>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <article className="pDescForm">
        <h2>Descripción</h2>
        <textarea name="descrip" id="descrip" placeholder="Descripción de la escuela" />
      </article>

      <div className="pOffertsSelect">
        <h2>Ofertas académicas</h2>
        <Select
          isMulti
          name="offerts"
          placeholder="Selecciona las ofertas académicas (Opcional)"
          options={offerts.map((offert: Offert) => ({
            value: offert.id,
            label: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`/./iconModality/whiteMode/${offert.icon}`}
                  alt={offert.modalidad}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                {offert.modalidad}
              </div>
            ),
            // Agregamos un campo "text" para el filtrado
            text: offert.modalidad
          }))}
          onChange={handleOfferts}
          // Personalizamos el filtro para usar el campo "text"
          filterOption={(option, inputValue) =>
            option.data.text.toLowerCase().includes(inputValue.toLowerCase())
          }
        />
      </div>

      <div className="aditionalInfo">
        <div className="directorate columnInfo">
          <div className="tittleAditional">
            <IconSchool />
            <h2 className="tittleNoMargin">Directivos a cargos</h2>
          </div>
          <ul className="column-info row1">
            <li>
              <label htmlFor="director">Director:</label>
              <input type="text" id="director" placeholder="Director" autoComplete="off" />
            </li>
            <li>
              <label htmlFor="subdirector">Subdirector:</label>
              <input type="text" id="subdirector" placeholder="Subdirector" autoComplete="off" />
            </li>
            <li>
              <label htmlFor="secretario">Secretario:</label>
              <input type="text" id="secretario" placeholder="Secretario" autoComplete="off" />
            </li>
          </ul>
        </div>
        <div className="directorate columnInfo">
          <div className="tittleAditional">
            <IconStudent />
            <h2 className="tittleNoMargin">¿Con que cuenta?</h2>
          </div>
          <ul className="column-info">
            <li><label htmlFor="team_ori">Equipo de orientacion:</label><input type="checkbox" id="team_ori" name="team_ori" /></li>
            <li><label htmlFor="center_st">Centro de estudiantes:</label><input type="checkbox" id="center_st" name="center_st" /></li>
            <li><label htmlFor="library">Biblioteca:</label><input type="checkbox" id="library" name="library" /></li>
            <li><label htmlFor="yard">Patio:</label><input type="checkbox" id="yard" name="yard" /></li>
            <li><label htmlFor="dining_room">Comedor:</label><input type="checkbox" id="dining_room" name="dining_room" /></li>
            <li><label htmlFor="food_sr">Servicio alimenticio:</label><input type="checkbox" id="food_sr" name="food_sr" /></li>
          </ul>
        </div>
      </div>

      <footer className="requeriments">
        <h2>Requesitos</h2>
        <textarea name="requirement" id="requirement" placeholder="Requesitos para ingresar a la escuela" />
      </footer>

    </section>
  )
}
