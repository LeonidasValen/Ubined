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
    const menuDrop = useRef<HTMLUListElement | null>(null)

    // cerrar menú al hacer clic fuera de él
    const handleClickOutside = (event: MouseEvent) => {
        if (menuDrop.current && !menuDrop.current.contains(event.target as Node)) {
            setDropMenu(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Manejo de cierre de sesión
    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            console.error("Error al cerrar sesión:", error)
        }
    }

    return (
        <nav className="navbar">
            <header className='nContainer'>
                <Link to={'/schools'} className="nLogo">
                    <LogoBook />
                </Link>
                {
                    isAuthenticated && user ? (
                        loading ? (
                            <div className='loadingProfile'>
                                <div className='imgLoading'></div>
                                <div className='loadingText'></div>
                            </div>
                        ) : (
                            <div className='support'>
                                <Link to={'/config/editInsti'}>Carga tu instituto</Link>
                                <div className='profileDropdown' onClick={() => setDropMenu(!dropMenu)} aria-expanded={dropMenu}>
                                    <div className="pdBtn">
                                        <div className='pdImg'>
                                            {user?.profile
                                                ? <img src={`/./img/${user?.profile}`} alt="User profile" />
                                                : <img src="/./img/user.png" alt="Default user" />
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
                        )
                    ) : (
                        <div className="support">
                            <Link to={'/config/help'}>Soporte</Link>
                            <Link to={'/login'}>Soy secretario</Link>
                        </div>
                    )
                }
            </header>
        </nav>
    )
}
