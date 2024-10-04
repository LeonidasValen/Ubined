import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authConext'
import { LogoBook } from '../../assets/Logo'
import { IconArrowDown, IconConfig, IconInterrogation, IconLogout, IconUser } from '../../assets/Icons'
import './navbar.css'

export function Navbar() {

    const { isAuthenticated, user, loading, logout } = useAuth()

    const navigate = useNavigate()

    const [dropMenu, setDropMenu] = useState<boolean>(false)

    const menuDrop = useRef<HTMLUListElement | null>(null);

    //cerrar menu al hacer click sobre otro lugar
    const handleClickOutside = (event: MouseEvent) => {
        // verifica si menuDrop.current existe y si el clic ocurrió fuera de él
        if (menuDrop.current && !menuDrop.current.contains(event.target as Node)) {
            setDropMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleLogout = () => {
        const logouts = async () => {
            try {
                await logout()
                navigate('/login')
            } catch (error) {
                console.error("Error al cerrar sesion:");
            }
        }
        logouts()
    }

    if (loading) {
        return <h1>Cargando...</h1>;
    }

    return (
        <nav className="navbar">
            <header className='nContainer'>
                <Link to={'/schools'} className="nLogo">
                    <LogoBook />
                </Link>
                {
                    isAuthenticated && user ? (
                        <div className='support'>
                            <Link to={'/config/help'}>Carga tu instituto</Link>
                            <Link to={'/config/help'}>Soporte</Link>
                            <div className='profileDropdown' onClick={() => setDropMenu(!dropMenu)}>
                                <div className="pdBtn">
                                    <div className='pdImg'>
                                        {user?.profile
                                            ? <img src={`/./img/${user?.profile}`} alt="" />
                                            : <img src="/./img/user.png" alt="" />
                                        }
                                    </div>
                                    <span>{user.title}</span>
                                    <IconArrowDown />
                                </div>
                                {dropMenu &&
                                    <ul className='pConfigMenu' ref={menuDrop}>
                                        <li className='pMenuItem'><Link to={'/config/profile'}><IconUser />Editar cuenta</Link></li>
                                        <li className='pMenuItem'><Link to={'/config/config'}><IconConfig />Configuraciones</Link></li>
                                        <li className='pMenuItem'><Link to={'/config/help'}><IconInterrogation />Ayuda y Soporte</Link></li>
                                        {user?.rol === 'Admin' &&
                                            <li><Link to={'/admin'}>Panel admin</Link></li>
                                        }
                                        <li className='pMenuItem logout'><a href="#" onClick={handleLogout}><IconLogout />Cerrar sesión</a></li>
                                    </ul>
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="support">
                            <Link to={'/config/help'}>Soporte</Link>
                            <Link to={'/login'}>Soy secretario</Link>
                        </div>
                    )
                }
            </header >
        </nav >
    )
}
