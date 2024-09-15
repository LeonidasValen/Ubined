import { Link } from 'react-router-dom'
import './listSchool.css'

export function ListSchool() {

  const escuelas = [
    { id: 1, titulo: 'Escuela secundaria técnica N°14', nivel: 'Técnica', tipo: 'Pública', provincia: 'Buenos Aires', localidad: 'La Matanza', direccion: 'Bariloche 1759 González Catan' },
    { id: 2, titulo: 'Escuela Secundaria Nº2', nivel: 'Secundario', tipo: 'Pública', provincia: 'Córdoba', localidad: 'Córdoba Capital', direccion: 'Avenida Siempreviva 742' },
    { id: 3, titulo: 'Escuela Primaria Nº3', nivel: 'Primario', tipo: 'Privada', provincia: 'Santa Fe', localidad: 'Rosario', direccion: 'Calle 456' },
    { id: 4, titulo: 'Escuela Secundaria Nº4', nivel: 'Inicial', tipo: 'Pública', provincia: 'Mendoza', localidad: 'Mendoza Capital', direccion: 'Avenida Los Robles 987' },
    { id: 5, titulo: 'Escuela Primaria Nº5', nivel: 'Primario', tipo: 'Pública', provincia: 'Buenos Aires', localidad: 'Mar del Plata', direccion: 'Calle 789' },
    { id: 6, titulo: 'Escuela Secundaria Nº6', nivel: 'Secundario', tipo: 'Pública', provincia: 'Entre Ríos', localidad: 'Paraná', direccion: 'Calle Las Flores 321' },
    { id: 7, titulo: 'Escuela Primaria Nº7', nivel: 'Primario', tipo: 'Privada', provincia: 'San Juan', localidad: 'San Juan Capital', direccion: 'Calle Los Álamos 654' },
    { id: 8, titulo: 'Universida Nacional de La Matanza', nivel: 'Universitario', tipo: 'Pública', provincia: 'Buenos Aires', localidad: 'La Matanza', direccion: 'Florencio Varela 1903' },
    { id: 9, titulo: 'Escuela Primaria Nº9', nivel: 'Primario', tipo: 'Privada', provincia: 'Río Negro', localidad: 'Bariloche', direccion: 'Avenida Pioneros 159' },
  ];

  return (
    <>
      {
        escuelas.map((escuela) => (
          <article className='schoolContent' key={`School-${escuela.id}`}>
            <Link to={'/school/1'} className="sMiniature">
              <img src="/./img/escuela-reference.jpg" alt="" />
            </Link>

            <Link to={'/school/1'} className="sInfo">
              <h3>{escuela.titulo}</h3>
              <div className='sInfoContent'>
                <div className="sData">
                  <p className='sDirec'>{escuela.provincia}, {escuela.localidad}</p>
                  <p className='sDirec'>{escuela.direccion}</p>
                  <p>• {escuela.tipo}</p>
                  <p>• {escuela.nivel}</p>
                </div>
                <span>Es una escuela publica que se desprende del desdoblamiento de la Escuela Media 12. Tiene 3 orientaciones tecnicas: tecnico en Informatica, tecnico de programación en Tecnologia de los Alimentos. Nuestro principal propósito es contribuir para lograr una educación técnica de calidad que prepare al egresado para una educación superior y a la vez facilite su inserción en el ámbito laboral, conforme a lo estipulado por la Ley de Educación Técnico Profesional que persigue “favorecer niveles crecientes de equidad, calidad, eficiencia y efectividad de la Educación Técnico Profesional, como elemento clave de las estrategias de inclusión social, de desarrollo y crecimiento socioeconómico del país y sus regiones...”. El perfil del egresado de nuestra escuela, apunta a formar ciudadanos activos que con una marcada formación ética, solidaria y comprometida con la realidad social, que tenga una formación técnica suficientemente sólida y a la vez flexible, para que pueda desempeñarse como un profesional idóneo frente a un mundo laboral cambiante que exige adaptabilidad y capacitación con</span>
              </div>
            </Link>
          </article>
        ))
      }
    </>
  )
}
