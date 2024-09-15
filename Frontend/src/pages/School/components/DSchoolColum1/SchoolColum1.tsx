import { IconEmail, IconPhone } from "../../../../assets/Icons";

export function SchoolColum1() {
  return (
    <section className="sInfoGeneral">
      <header className="gPhotoInstitute">
        <img src="/./img/escuela-reference.jpg" alt="" />
      </header>
      <div className="gDirection">
        <h2>Localización</h2>
        <div className="dLocate">
          <span>Provincia:</span>
          <p>Buenos Aires, La Matanza</p>
        </div>
        <div className="dLocate">
          <span>Dirección:</span>
          <p>Bariloche 6615, González Catan</p>
        </div>
      </div>
      <div className="gContact">
        <h2>Contactos</h2>
        <div className="contact">
          <span>Télefono:</span>
          <p><IconPhone/>115567709</p>
        </div>
        <div className="contact">
          <span>Correo:</span>
          <p><IconEmail/>eest14lamatanza@abc.gob.ar</p>
        </div>
      </div>
      <article className="gRedsocial">
        <h2>Redes</h2>
        <div className="redes">
          <a href="" style={{background: '#1877f2'}}><img src="/./icons/facebook.png" alt="" />Facebook</a>
          <a href="" style={{background: 'linear-gradient(30deg,#f78331,#da2e7d 50.39%,#6b54c6)'}}><img src="/./icons/instagram.png" alt="" />Instagram</a>
          <a href="" style={{background: '#000'}}><img src="/./icons/twitter.png" alt="" />Twitter</a>
          <a href="" style={{background: '#f50022'}}><img src="/./icons/youtube.png" alt="" />YouTube</a>
        </div>
      </article>
      <footer className="webSite">
        <span>Sitio web:</span>
        <a href="">eest14lamatanza.edu.ar</a>
      </footer>
    </section>
  )
}
