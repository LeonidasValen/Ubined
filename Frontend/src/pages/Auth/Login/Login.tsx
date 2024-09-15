import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormInfo } from '../components/FormInfo'
import { IconEye, IconEyeClose } from '../../../assets/Icons'

export function Login() {

    const [eye, setEye] = useState<boolean>(false)//estado para ver la contraseña

    return (
        <main className='bgform'>
            <div className='form-content'>
                <FormInfo />
                <section className='formCube cube2'>
                    <h1>Inicio de sesión</h1>
                    <form >
                        <label htmlFor="email">Correo</label>
                        <input type="text" placeholder='correo' id='email' autoComplete='on'/>
                        <div className="fPass">
                            <label htmlFor="password">Contraseña</label>
                            <input type={eye ? 'text' : 'password'} placeholder='Contraseña' id='password' />
                            <button className='pEye' onClick={(e) => { e.preventDefault(); setEye(!eye) }}>
                                {eye
                                    ? <IconEyeClose />
                                    : <IconEye />
                                }
                            </button>
                        </div>
                        <span className='noaccount'>No te acordas de tu contraseña? <Link to={'/register'}>Click acá</Link></span>
                        <button className='fSubmit'>Iniciar sesión</button>
                    </form>
                    <span className='noaccount'>No tienes cuenta? <Link to={'/register'}>Registrate</Link></span>
                </section>
            </div>
        </main>
    )
}
