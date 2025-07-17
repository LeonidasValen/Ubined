import { Logo } from '@assets/Logo'
import { IconEmail, IconFacebook, IconInstagram, IconPhone, IconTwitter } from '@assets/Icons'

export function FormInfo() {
    return (
        <section className='formCube cube1'>
            <div className="fLogo">
                <Logo />
            </div>
            <h1>UBINED</h1>
            <span>
                ¿Que es ubined? es una pagina informa a las personas sobre institutos educativos, como el lugar, informacion propia de la escuela, contactos, etc.
            </span>
            <a href='mailto:ubined25@gmail.com' className="fContact">
                <IconEmail />
                <p>ubined25@gmail.com</p>
            </a>
            <a href='tel:+54 11 4684-1426' className="fContact">
                <IconPhone />
                <p>+54 11 4684-1426</p>
            </a>
            <div className="fSocial">
                <p>Nuestras redes:</p>
                <div className="fSocialIcons">
                    <a href="#">
                        <IconFacebook />
                    </a>
                    <a href="#">
                        <IconInstagram />
                    </a>
                    <a href="#">
                        <IconTwitter />
                    </a>
                </div>
            </div>
        </section>
    )
}
