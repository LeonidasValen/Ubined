import { useEffect, useState } from "react";
import Select from "react-select";
import { MultiValue } from "react-select";
import { IconDelete, IconSchool, IconStudent } from "@assets/Icons";
import { useAxios } from "@hooks/useAxios";
import { ErrorSchool, FormDatas, Offert, ManagersAsigns } from "../interface/FormSchool";
import { Cargos } from "../interface/Directors";

interface SFColum2Props {
  setFormData: React.Dispatch<React.SetStateAction<FormDatas>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  formData: FormDatas;
  errors: ErrorSchool;
}

export function SFColum2({ setFormData, formData, errors, handleChange }: SFColum2Props) {
  const { fetchData } = useAxios();

  const [offerts, setOfferts] = useState<Offert[]>([])

  //trae los modalidades
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

  //Trae los ids de las modalidades seleccionadas
  const handleOfferts = (selectedOptions: MultiValue<{ value: number; label: JSX.Element }>) => {
    const selectedModalities = selectedOptions.map(option => option.value);
    const dataToSend = selectedModalities.map(id_modalidad => ({ id_modalidad }));

    setFormData(prev => ({
      ...prev,
      offerts: dataToSend,
    }));
  };
  // Maneja los cambios en los check de los horarios
  const handleHoraryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => {
      const currentHorary = prev.horary ? prev.horary.split('/') : [];
      const updatedHorary = checked
        ? [...currentHorary, name]
        : currentHorary.filter((h) => h !== name);

      // Orden fijo
      const horaryOrder = ["Mañana", "Tarde", "Noche", "Contraturno"];
      const sortedHorary = horaryOrder.filter((h) => updatedHorary.includes(h));

      return { ...prev, horary: sortedHorary.join('/') };
    });
  };

  // Maneja los cambios en los checkboxes de lo que cuenta la escuela
  const handleSchoolHasCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => {
      const updatedSchoolHas = {
        ...prev,
        schoolHas: {
          ...prev.schoolHas,
          [name]: checked ? 1 : 0,
        },
      };
      return updatedSchoolHas;
    });
  };

  //Inputs dinamicos para cargos

  const handleAddCargo = () => {

    if (formData.managers.length >= 5) return;
    setFormData((prev) => ({
      ...prev,
      managers: [...prev.managers, { cargo: '', nombre: '' }],
    }));
  };

  const handleRemoveCargo = (index: number): void => {
    // Si es el primero, solo limpiar (no eliminar)
    if (index === 0) {
      const updated = formData.managers.map((item, i) =>
        i === 0 ? { cargo: '', nombre: '' } : item
      );
      setFormData((prev) => ({
        ...prev,
        managers: updated,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        managers: prev.managers.filter((_, i) => i !== index),
      }));
    }
  };


  const handleChangeCargo = (
    index: number,
    field: keyof ManagersAsigns,
    value: string
  ): void => {
    const updated = formData.managers.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prev) => ({
      ...prev,
      managers: updated,
    }));
  };

  return (
    <section className="sPrincipalForm formColum">
      <div className="pTitleInput">
        <input className="inputTitle" type="text" name="nameSchool" placeholder="Nombre Escuela" autoComplete="on" value={formData.nameSchool} onChange={handleChange} />
        {errors.nameSchool && <p className="fError">{errors.nameSchool}</p>}
      </div>
      <div className="pInfoInputs">
        <h2>Información principal</h2>
        <ul className="dataInpus">
          <li>
            <label htmlFor="type">Tipo:</label>
            <select name="schoolType" id="schoolType" value={formData.schoolType} onChange={handleChange}>
              <option value="Pública">Pública</option>
              <option value="Privada">Privada</option>
            </select>
          </li>
          <li>
            <label htmlFor="cue">CUE:</label>
            <input type="number" name="cue" id="cue" placeholder="CUE" min={0} value={formData.cue} onChange={handleChange} />
          </li>
          <li>
            <label htmlFor="nivel">Nivel:</label>
            <select name="nivel" id="nivel" value={formData.nivel} onChange={handleChange}>
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
              {["Mañana", "Tarde", "Noche", "Contraturno"].map((horario) => (
                <div className="horaryCheck" key={horario}>
                  <input
                    type="checkbox"
                    id={horario}
                    name={horario}
                    checked={formData.horary.includes(horario)}
                    onChange={handleHoraryChange}
                  />
                  <label htmlFor={horario}>{horario}</label>
                </div>
              ))}
            </div>
          </li>
        </ul>
        {errors.dataErrors && <p className="fError">{errors.dataErrors}</p>}
      </div>

      <article className="pDescForm">
        <h2>Descripción</h2>
        <textarea name="descrip" id="descrip" placeholder="Descripción de la escuela" value={formData.descrip} onChange={handleChange} />
        {errors.descrip && <p className="fError">{errors.descrip}</p>}
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
        {errors.offerts && <p className="fError">{errors.offerts}</p>}
      </div>

      <div className="aditionalInfo">
        <div className="directorate columnInfo">
          <div className="tittleAditional">
            <IconSchool />
            <h2 className="tittleNoMargin">Directivos a cargos</h2>
          </div>

          <ul className="column-info row1">
            {formData.managers.map((item, index) => (
              <li key={`cargo${index}`}>
                <select value={item.cargo} onChange={(e) => handleChangeCargo(index, 'cargo', e.target.value)}>
                  <option value="">Seleccione un cargo</option>
                  {Cargos.map((managers) => (
                    <option key={managers.value} value={managers.value}>
                      {managers.label}
                    </option>
                  ))}
                </select>
                <div className="inputCargo">
                  <input type="text" name="" id="" placeholder="Nombre" value={item.nombre} onChange={(e) => handleChangeCargo(index, 'nombre', e.target.value)} />
                  <button type="button" onClick={() => handleRemoveCargo(index)}><IconDelete /></button>
                </div>
              </li>
            ))}
            <button type="button" className="btnAddCargo"
              onClick={() => handleAddCargo()}
              disabled={formData.managers.length >= 5}
            >Agregar cargos</button>
            {errors.managers && <p className="fError">{errors.managers}</p>}
          </ul>

        </div>
        <div className="directorate columnInfo">
          <div className="tittleAditional">
            <IconStudent />
            <h2 className="tittleNoMargin">¿Con que cuenta?</h2>
          </div>
          <ul className="column-info">
            <li>
              <label htmlFor="team_ori">Equipo de orientación:</label>
              <input type="checkbox" id="team_ori" name="team_ori" checked={formData.schoolHas.team_ori === 1} onChange={handleSchoolHasCheckbox} />
            </li>
            <li>
              <label htmlFor="center_st">Centro de estudiantes:</label>
              <input type="checkbox" id="center_st" name="center_st" checked={formData.schoolHas.center_st === 1} onChange={handleSchoolHasCheckbox} />
            </li>
            <li>
              <label htmlFor="library">Biblioteca:</label>
              <input type="checkbox" id="library" name="library" checked={formData.schoolHas.library === 1} onChange={handleSchoolHasCheckbox} />
            </li>
            <li>
              <label htmlFor="yard">Patio:</label>
              <input type="checkbox" id="yard" name="yard" checked={formData.schoolHas.yard === 1} onChange={handleSchoolHasCheckbox} />
            </li>
            <li>
              <label htmlFor="dining_room">Comedor:</label>
              <input type="checkbox" id="dining_room" name="dining_room" checked={formData.schoolHas.dining_room === 1} onChange={handleSchoolHasCheckbox} />
            </li>
            <li>
              <label htmlFor="food_sr">Servicio alimenticio:</label>
              <input type="checkbox" id="food_sr" name="food_sr" checked={formData.schoolHas.food_sr === 1} onChange={handleSchoolHasCheckbox} />
            </li>
          </ul>
        </div>
      </div>

      <footer className="requeriments">
        <h2>Requisitos</h2>
        <textarea name="requirement" id="requirement" placeholder="Requesitos para ingresar a la escuela" value={formData.requirement} onChange={handleChange} />
        {errors.requirement && <p className="fError">{errors.requirement}</p>}
      </footer>

    </section>
  )
}
