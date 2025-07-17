import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormInfo } from '@pages/Auth/components/FormInfo'
import { useAuth } from '@context/authConext'
import { IconEye, IconEyeClose } from '@assets/Icons'

interface FormData {
    email: string;
    password: string;
}

interface Errors {
    email?: string;
    password?: string;
    general?: string;
    backendErrors?: string[];
}

export function Login() {

    const { signIn } = useAuth()

    const navigate = useNavigate()

    const [eye, setEye] = useState<boolean>(false)//estado para ver la contraseña

    const [errors, setErrors] = useState<Errors>({})//errores del cliente con el formulario

    //guarda los datos de los inputs
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); //guarda los datos de los inputs
        setErrors({ ...errors, [name]: '' }); // Limpiar el error cuando el usuario comienza a escribir
    }

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newErrors: Errors = {};
        if (!formData.email) {
            newErrors.email = 'Ingrese su correo electrónico';
        } else {
            const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailFormat.test(formData.email)) {
                newErrors.email = 'Ingrese un correo electrónico válido';
            }
        }
        if (!formData.password) {
            newErrors.password = 'Ingrese su contraseña';
        }

        // Si hay errores, mostrarlos y detener el envío del formulario
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors || "Error al iniciar sesion, por favor inténtelo de nuevo")
            return;
        }

        try {
            await signIn(formData)
            navigate("/schools")
        } catch (error: any) {
            if (Array.isArray(error)) {
                setErrors({ general: '', backendErrors: error });
            } else {
                setErrors({ general: error || "Error al iniciar sesión, por favor inténtelo de nuevo" });
            }
        }
    }

    return (
        <main className='bgform'>
            <div className='form-content'>
                <FormInfo />
                <section className='formCube cube2'>
                    <h1>Inicio de sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='fInputs'>
                            <label htmlFor="email">Correo</label>
                            <input type="text" className={errors.email ? 'InputError' : ''} placeholder='correo' id='email' name='email' autoComplete='on' onChange={handleChange} />
                            {
                                errors.email && <p className="fError">{errors.email}</p>
                            }
                        </div>
                        <div className="fInputs">
                            <label htmlFor="password">Contraseña</label>
                            <input type={eye ? 'text' : 'password'} className={errors.password ? 'InputError' : ''} placeholder='Contraseña' id='password' name='password' onChange={handleChange} />
                            <button className='pEye' onClick={(e) => { e.preventDefault(); setEye(!eye) }}>
                                {eye
                                    ? <IconEyeClose />
                                    : <IconEye />
                                }
                            </button>
                            {
                                errors.password && <p className="fError">{errors.password}</p>
                            }
                        </div>
                        <span className='noaccount'>No te acordas de tu contraseña? <Link to={'/forgot-password'}>Click acá</Link></span>
                        {/* Errores generales */}
                        {errors.general && <p className="fError">{errors.general}</p>}

                        {/* Errores del backend (Zod, etc.) */}
                        {errors.backendErrors && (
                            <ul>
                                {errors.backendErrors.map((err, index) => (
                                    <li className="fError" key={index}>{err}</li>
                                ))}
                            </ul>
                        )}
                        <button className='fSubmit'>Iniciar sesión</button>
                    </form>
                    <span className='noaccount'>No tienes cuenta? <Link to={'/register'}>Registrate</Link></span>
                </section>
            </div>
        </main>
    )
}
