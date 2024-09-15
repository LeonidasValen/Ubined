import { Link } from 'react-router-dom'
import { LogoBook } from '../../assets/Logo'
import './navbar.css'

export function Navbar() {
    return (
        <nav className="navbar">
            <header className='nContainer'>
                <Link to={'/schools'} className="nLogo">
                    <LogoBook/>
                </Link>
                <div className="support">
                    <Link to={'/config/help'}>Soporte</Link>
                    <Link to={'/login'}>Soy secretario</Link>
                </div>
            </header>
        </nav>
    )
}
