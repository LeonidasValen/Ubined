import { Link } from 'react-router-dom'
import { IconEmail, IconFacebook, IconInstagram, IconPhone, IconTwitter } from '../../assets/Icons'
import { LogoBook } from '../../assets/Logo'
import './footer.css'

export function Footer() {
    return (
        <footer className='footerContent'>
            <section className='footerSection'>
                <div className='footerInfo'>
                    <div className='footerLogo'>
                        <div className='fLogo'>
                            <LogoBook />
                            <h1>Ubined</h1>
                        </div>
                        <p>¿Que es ubined? es un sitio web para informar a las personas sobre instituciones educativas, como el lugar, información propia de la escuela, contactos, etc.</p>
                    </div>
                    <div className='footerLinks'>
                        <div className='footerItem'>
                            <h2>Compañía</h2>
                            <ul>
                                <li><Link to={'/config/politicsPrivacity'}>Sobre nosotros</Link></li>
                                <li><Link to={'/config/help'}>Servicio y objetivo</Link></li>
                                <li><Link to={'/config/help'}>Nuestro equipo</Link></li>
                            </ul>
                        </div>
                        <div className='footerItem'>
                            <h2>Políticas</h2>
                            <ul>
                                <li><Link to={'/config/politicsPrivacity'}>Política de privacidad</Link></li>
                                <li><Link to={'/config/help'}>Términos y condiciones</Link></li>
                                <li><Link to={'/config/help'}>Cookies</Link></li>
                            </ul>
                        </div>
                        <div className='footerItem'>
                            <h2>Contactos</h2>
                            <ul>
                                <li>
                                    <a href='mailto:ubined25@gmail.com' className="fContact">
                                        <IconEmail />
                                        <p>ubined25@gmail.com</p>
                                    </a>
                                </li>
                                <li>
                                    <a href='tel:+54 11 4684-1426' className="fContact">
                                        <IconPhone />
                                        <p>+54 11 4684-1426</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='fCopyRight'>
                    <span>© 2024 Ubined. Todos los derechos reservados.</span>
                    <div className='fRedSocial'>
                        <a href='https://www.facebook.com/ubined.es/' target='_blank' rel="noreferrer" aria-label='Link Facebook from Ubined'>
                            <IconFacebook />
                        </a>
                        <a href='https://www.instagram.com/ubined_es/' target='_blank' rel="noreferrer" aria-label='Link Instagram from Ubined'>
                            <IconInstagram />
                        </a>
                        <a href='https://twitter.com/ubined_es' target='_blank' rel="noreferrer" aria-label='Link Twitter from Ubined'>
                            <IconTwitter />
                        </a>
                    </div>
                </div>
            </section>
        </footer>
    )
}
