import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormInfo } from '../components/FormInfo'
import { IconEye, IconEyeClose } from '../../../assets/Icons'

import '../auth.css'

export function Register() {

    const [eye, setEye] = useState<boolean>(false)//estado para ver la contraseña
    const [ConfiEye, setConfiEye] = useState<boolean>(false)//estado para ver la contraseña

    return (
        <main className='bgform'>
            <div className='form-content'>
                <FormInfo />
                <section className='formCube cube2'>
                    <h1>Registro</h1>
                    <form >
                        <label htmlFor="title">Nombre del instituto</label>
                        <input type="text" placeholder='Nombre del instituto' id='title' autoComplete='off'/>
                        <label htmlFor="email">Correo</label>
                        <input type="email" placeholder='correo' id='email' autoComplete='on'/>
                        <div className="fPass">
                            <label htmlFor="password">Contraseña</label>
                            <input type={eye ? 'text' : 'password'} placeholder='Contraseña' id='password'/>
                            <button className='pEye' onClick={(e) => { e.preventDefault(); setEye(!eye) }}>
                                {eye
                                    ? <IconEyeClose />
                                    : <IconEye />
                                }
                            </button>
                        </div>
                        <div className="fPass">
                            <label htmlFor="configName">Confirmar contraseña</label>
                            <input type={ConfiEye ? 'text' : 'password'} placeholder='Confirmar contraseña' id="configName"/>
                            <button className='pEye' onClick={(e) => { e.preventDefault(); setConfiEye(!ConfiEye) }}>
                                {ConfiEye
                                    ? <IconEyeClose />
                                    : <IconEye />
                                }
                            </button>
                        </div>
                        <button className='fSubmit'>Registrarse</button>
                    </form>
                    <span className='noaccount'>Tenes cuenta? <Link to={'/login'}>Iniciar sesión</Link></span>
                </section>
            </div>
        </main>
    )
}
