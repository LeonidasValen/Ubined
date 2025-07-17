import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormInfo } from '@pages/Auth/components/FormInfo'
import { useAuth } from '@context/authConext'
import { IconEye, IconEyeClose } from '@assets/Icons'

import '../auth.css'

interface FormData {
    title: string;
    email: string;
    password: string;
    confpassword: string;
}

interface Errors {
    title?: string;
    email?: string;
    password?: string;
    confpassword?: string;
    general?: string;
    backendErrors?: string[];
}

export function Register() {

    const { signUp } = useAuth()

    const navigate = useNavigate()

    const [eye, setEye] = useState<boolean>(false)//estado para ver la contraseña
    const [ConfiEye, setConfiEye] = useState<boolean>(false)//estado para ver la contraseña

    const [errors, setErrors] = useState<Errors>({})//errores del cliente con el formulario

    //guarda los datos de los inputs
    const [formData, setFormData] = useState<FormData>({
        title: '',
        email: '',
        password: '',
        confpassword: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); //guarda los datos de los inputs
        setErrors({ ...errors, [name]: '' }); // Limpiar el error cuando el usuario comienza a escribir
    }

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newErrors: Errors = {};
        if (!formData.title) {
            newErrors.title = 'El nombre del instituto es obligatorio'
        }
        if (!formData.email) {
            newErrors.email = 'El correo electrónico es obligatorio';
        } else {
            const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailFormat.test(formData.email)) {
                newErrors.email = 'Ingrese un correo electrónico válido';
            }
        }
        if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
        }
        if (formData.password !== formData.confpassword) {
            newErrors.confpassword = 'Las contraseñas no coinciden';
        }

        // Si hay errores, mostrarlos y detener el envío del formulario
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors || "Error al registrarse, por favor inténtelo de nuevo")
            return;
        }

        try {
            await signUp(formData)
            navigate("/login")
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
                    <h1>Registro</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='fInputs'>
                            <label htmlFor="title">Nombre del instituto</label>
                            <input type="text"  className={errors.title ? 'InputError' : ''} placeholder='Nombre del instituto' id='title' name='title' autoComplete='off' onChange={handleChange} />
                            {
                                errors.title && <p className="fError">{errors.title}</p>
                            }
                        </div>
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
                        <div className="fInputs">
                            <label htmlFor="configName">Confirmar contraseña</label>
                            <input type={ConfiEye ? 'text' : 'password'} className={errors.confpassword ? 'InputError' : ''} placeholder='Confirmar contraseña' id="configName" name='confpassword' onChange={handleChange} />
                            <button className='pEye' onClick={(e) => { e.preventDefault(); setConfiEye(!ConfiEye) }}>
                                {ConfiEye
                                    ? <IconEyeClose />
                                    : <IconEye />
                                }
                            </button>
                            {
                                errors.confpassword && <p className="fError">{errors.confpassword}</p>
                            }
                        </div>
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
                        <button className='fSubmit'>Registrarse</button>
                    </form>
                    <span className='noaccount'>Tenes cuenta? <Link to={'/login'}>Iniciar sesión</Link></span>
                </section>
            </div>
        </main>
    )
}
