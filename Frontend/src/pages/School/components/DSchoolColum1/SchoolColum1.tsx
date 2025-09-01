import { IconArrowLeft, IconArrowRight, IconEmail, IconPhone } from "@assets/Icons";
import { useState } from "react";

interface SchoolColum1Props {
  schoolImg?: string[];
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

export const SchoolColum1: React.FC<SchoolColum1Props> = ({ schoolImg, provincia, localidad, address, phone, email, web, socialMedia }) => {

  const [modalImg, setModalImg] = useState<boolean>(false)

  const [slideNumber, setSlideNumber] = useState<number>(0)

  const handleMove = (direction: string) => {
    let newSlideNumber: number = slideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? schoolImg!.length - 1 : slideNumber - 1;
    } else if (direction === "r") {
      newSlideNumber = slideNumber === schoolImg!.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  }

  return (
    <section className="sInfoGeneral sInfoColumn">
      <header className="gPhotoInstitute" onClick={() => setModalImg(true)}>
        {
          schoolImg && schoolImg.length > 0
            ? (
              <img src={schoolImg[0].replace('/upload/', '/upload/f_auto,q_auto,w_450/')} alt="Imagen de la escuela" />
            )
            : <img src="/./img/escuela-reference.jpg" alt="Imagen por defecto" />
        }
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
        socialMedia.length > 0 && (
          <article className="gRedsocial">
            <h2>Redes</h2>
            <div className="redes">
              {socialMedia
                .filter(red => red.link?.trim()) // <-- Solo redes con link no vacío
                .map(red => (
                  <a
                    href={red.link}
                    className={`itemRedSocial ${red.type} `}
                    target="_blank"
                    key={`redID-${red.type}`}
                  >
                    <img src={`/./icons/${red.icon}`} alt={red.type} />
                    {red.type}
                  </a>
                ))}
            </div>
          </article>
        )
      }
      {web && (
        <footer className="webSite">
          <span>Sitio web:</span>
          <a href="" target="_blanck">{web}</a>
        </footer>
      )
      }

      {modalImg && schoolImg && (
        <div className="photoModalContainer">
          <div className="bgPModal" onClick={() => setModalImg(false)}></div>
          <div className="modalImgContent">
            <div className="imgList">
              {schoolImg.slice(0, 5).map((img, index) => (
                <img src={img.replace('/upload/', '/upload/f_auto,q_auto,w_150/')} alt="" key={`img${index}`} className={index === slideNumber ? 'active-thumbnail' : ''} onClick={() => setSlideNumber(index)}/>
              ))}
            </div>
            <div className="imgSlider">
              <span onClick={() => handleMove("l")} >
                <IconArrowLeft />
              </span>
              <div className="imgSliderContent">
                <img src={schoolImg[slideNumber].replace('/upload/', '/upload/f_auto,q_auto,w_450/')} alt="" />
              </div>
              <span onClick={() => handleMove("r")}>
                <IconArrowRight />
              </span>
            </div>
          </div>
        </div>
      )
      }
    </section>
  )
}
