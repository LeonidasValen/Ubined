import { IconEmail, IconPhone } from "../../../../assets/Icons";

interface SchoolColum1Props {
  provincia: string;
  localidad: string;
  address: string;
  phone?: string;
  email: string;
  web?: string;
  socialMedia: Social[];
}

export interface Social {
  icon: string;
  type: string;
  link: string;
}

export const SchoolColum1: React.FC<SchoolColum1Props> = ({ provincia, localidad, address, phone, email, web, socialMedia }) => {

  return (
    <section className="sInfoGeneral">
      <header className="gPhotoInstitute">
        <img src="/./img/escuela-reference.jpg" alt="" />
      </header>
      <div className="gDirection">
        <h2>Localización</h2>
        <div className="dLocate">
          <span>Provincia:</span>
          <p>{provincia}, {localidad}</p>
        </div>
        <div className="dLocate">
          <span>Dirección:</span>
          <p>{address}</p>
        </div>
      </div>
      <div className="gContact">
        <h2>Contactos</h2>
        {phone && (
          <div className="contact">
            <span>Télefono:</span>
            <a href={`tel:${phone}`}><IconPhone />{phone}</a>
          </div>
        )
        }
        <div className="contact">
          <span>Correo:</span>
          <a href={`mailto:${email}`}><IconEmail />{email}</a>
        </div>
      </div>
      {
        socialMedia.length > 0 &&( 
          <article className="gRedsocial">
            <h2>Redes</h2>
            <div className="redes">
              {socialMedia.map(red =>(
                <a href={red.link} className={`itemRedSocial ${red.type}`} target="_blanck" key={`redID ${red.type}`}><img src={`/./icons/${red.icon}`} alt="" />{red.type}</a>
              ))}
            </div>
          </article>
        )
      }
      {web && (
        <footer className="webSite">
          <span>Sitio web:</span>
          <a href="">{web}</a>
        </footer>
      )
      }
    </section>
  )
}
