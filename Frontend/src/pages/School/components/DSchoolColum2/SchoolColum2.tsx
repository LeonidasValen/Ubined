import { IconSchool, IconStudent } from "../../../../assets/Icons"


export function SchoolColum2() {
  return (
    <section className="sInfoPrincipal">
      <h1 className="pTitleSchool">Escuela Secundaria Técnica N°14</h1>
      <div className="pInfoSchool">
        <h2>Información principal</h2>
        <ul className="dataSchool">
          <li className="data">
            <span>Tipo:</span>
            <p>Pública</p>
          </li>
          <li className="data">
            <span>CUE:</span>
            <p>6563322</p>
          </li>
          <li className="data">
            <span>Nivel:</span>
            <p>Técnico</p>
          </li>
          <li className="data">
            <span>Horarios:</span>
            <p>Mañana/Tarde/Noche</p>
          </li>
        </ul>
      </div>
      <article className="pDescSchool">
        <h2>Descripción</h2>
        <p>
          Es una escuela publica que se desprende del desdoblamiento de la Escuela Media 12. Tiene 3 orientaciones tecnicas: tecnico en Informatica, tecnico de programación en Tecnologia de los Alimentos. Nuestro principal propósito es contribuir para lograr una educación técnica de calidad que prepare al egresado para una educación superior y a la vez facilite su inserción en el ámbito laboral, conforme a lo estipulado por la Ley de Educación Técnico Profesional que persigue “favorecer niveles crecientes de equidad, calidad, eficiencia y efectividad de la Educación Técnico Profesional, como elemento clave de las estrategias de inclusión social, de desarrollo y crecimiento socioeconómico del país y sus regiones...”. El perfil del egresado de nuestra escuela, apunta a formar ciudadanos activos que con una marcada formación ética, solidaria y comprometida con la realidad social, que tenga una formación técnica suficientemente sólida y a la vez flexible, para que pueda desempeñarse como un profesional idóneo frente a un mundo laboral cambiante que exige adaptabilidad y capacitación continua.
        </p>
      </article>
      <div className="pOfferts">
        <h2>Ofertas académicas</h2>
        <div className="modalities">
          <div className="modality">
            <img src="/./iconModality/whiteMode/alimentos.png" alt="" />
            <p>Tecnologia en Alimentos</p>
          </div>
          <div className="modality">
            <img src="/./iconModality/whiteMode/programacion.png" alt="" />
            <p>Programación</p>
          </div>
          <div className="modality">
            <img src="/./iconModality/whiteMode/informatica.png" alt="" />
            <p>Informatica</p>
          </div>
        </div>
      </div>
      <section className="aditionalInfo">
        <div className="directorate columnInfo">
          <div className="tittleAditional">
            <IconSchool />
            <h2 className="tittleNoMargin">Directivos a cargo</h2>
          </div>
          <ul className="column-info row1">
            <li>
              <span>Director:</span><p>Nestor Muños</p>
            </li>
            <li>
              <span>Subdirector:</span><p>Maria Capozuka</p>
            </li>
            <li>
              <span>Secretario:</span><p>Pepe Mujica</p>
            </li>
          </ul>
        </div>
        <div className="additional columnInfo">
          <div className="tittleAditional">
            <IconStudent />
            <h2 className="tittleNoMargin">¿Con que cuenta?</h2>
          </div>
          <ul className="column-info row2">
            <li><span>Equipo de orientacion:</span><p>✓</p></li>
            <li><span>Centro de estudiantes:</span><p>✓</p></li>
            <li><span>Biblioteca:</span><p>✓</p></li>
            <li><span>Patio:</span><p>✓</p></li>
            <li><span>Comedor:</span><p>✓</p></li>
            <li><span>Servicio alimenticio:</span><p>✓</p></li>
          </ul>
        </div>
      </section>
      <footer>
        <h2 className="tittleNoMargin">Requesitos</h2>
        <p>Se requiere los niveles inicial y primario, adémas contar con guarda polvo azul o blanco.</p>
      </footer>
    </section>
  )
}
