import { IconSchool, IconStudent } from "../../../../assets/Icons"

interface SchoolColum2Props {
  nameSchool: string;
  type: string;
  cue: number;
  nivel: string;
  horary: string;
  desc: string;
  director: string;
  subdirector: string;
  secretario: string;
  requirement: string;

  team_ori: boolean;
  center_st: boolean;
  library: boolean;
  yard: boolean;
  dining_room: boolean;
  food_sr: boolean;

  modalities: Modalities[];
}

interface Modalities {
  icon: string;
  name: string;
}

export const SchoolColum2: React.FC<SchoolColum2Props> = ({ nameSchool, type, cue, nivel, horary, desc, modalities, director, subdirector, secretario, team_ori, center_st, library, yard, dining_room, food_sr, requirement }) => {
  return (
    <section className="sInfoPrincipal">
      <h1 className="pTitleSchool">{nameSchool}</h1>
      <div className="pInfoSchool">
        <h2>Información principal</h2>
        <ul className="dataSchool">
          <li className="data">
            <span>Tipo:</span>
            <p>{type}</p>
          </li>
          <li className="data">
            <span>CUE:</span>
            <p>{cue}</p>
          </li>
          <li className="data">
            <span>Nivel:</span>
            <p>{nivel}</p>
          </li>
          <li className="data">
            <span>Horarios:</span>
            <p>{horary}</p>
          </li>
        </ul>
      </div>
      <article className="pDescSchool">
        <h2>Descripción</h2>
        <p>
          {desc}
        </p>
      </article>
      {modalities.length > 0 && (
        <div className="pOfferts">
          <h2>Ofertas académicas</h2>
          <div className="modalities">
            {modalities.map((modality, index) => (
              <div className="modality" key={`modality ${index}`}>
                <img src={`/./iconModality/whiteMode/${modality.icon}`} alt="" />
                <p>{modality.name}</p>
              </div>
            ))}
          </div>
        </div>
      )
      }
      <section className="aditionalInfo">
        <div className="directorate columnInfo">
          <div className="tittleAditional">
            <IconSchool />
            <h2 className="tittleNoMargin">Directivos a cargo</h2>
          </div>
          <ul className="column-info row1">
            <li>
              <span>Director:</span><p>{director}</p>
            </li>
            <li>
              <span>Subdirector:</span><p>{subdirector}</p>
            </li>
            <li>
              <span>Secretario:</span><p>{secretario}</p>
            </li>
          </ul>
        </div>
        <div className="additional columnInfo">
          <div className="tittleAditional">
            <IconStudent />
            <h2 className="tittleNoMargin">¿Con que cuenta?</h2>
          </div>
          <ul className="column-info row2">
            <li><span>Equipo de orientacion:</span><p>{team_ori ? '✓' : '✗'}</p></li>
            <li><span>Centro de estudiantes:</span><p>{center_st ? '✓' : '✗'}</p></li>
            <li><span>Biblioteca:</span><p>{library ? '✓' : '✗'}</p></li>
            <li><span>Patio:</span><p>{yard ? '✓' : '✗'}</p></li>
            <li><span>Comedor:</span><p>{dining_room ? '✓' : '✗'}</p></li>
            <li><span>Servicio alimenticio:</span><p>{food_sr ? '✓' : '✗'}</p></li>
          </ul>
        </div>
      </section>
      <footer>
        <h2 className="tittleNoMargin">Requesitos</h2>
        <p>{requirement}</p>
      </footer>
    </section>
  )
}
