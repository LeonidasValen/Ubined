import { Link } from 'react-router-dom';
import './otp.css'

import { useRef, useState } from "react";

export function OTP() {

    const length: number = 6

    const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

    const [OTP, setOTP] = useState<string[]>(Array(length).fill('')); // guarda los valores 

    const handleTextChange = (input: string, index: number) => {
        const newPin = [...OTP]; // obtine los valores y la posicion
        newPin[index] = input;  // guarda el valor segun la posicion
        setOTP(newPin); //guarda los datos

        if (input.length === 1 && index < length - 1) { //si un input tiene valor 1 y el index es menor a 4  detiene el salteo de inputs
            inputRef.current[index + 1]?.focus(); //salta al siguiente input
        }

        if (input.length === 0 && index > 0) { //si su valor es  igual a 0 y index sea mayor a 0 para evitar retroceder
            inputRef.current[index - 1]?.focus(); //vuelve al input anterior
        }
    };

    return (
        <main className='form-content otp'>
            <section className='formCube otp'>
                <h1>Verificación</h1>
                <p>
                    Se le envió un correo con un código de verificación
                    verifique su bandenja o en SPAM
                </p>
                <div className="otpInputs">
                    {Array.from({ length }, (_, index) => (
                        <input
                            key={index}
                            type="number"
                            pattern="\d*"
                            maxLength={1}
                            value={OTP[index]}
                            onChange={(e) => handleTextChange(e.target.value, index)}
                            ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
                            className='otpInput'
                        />
                    ))}
                </div>
                <button className='otpVerify'>Verificar</button>
                <span className='noaccount'>No recibi ningún código. <Link to={'/'}>Reenviar</Link></span>
            </section>
        </main>
    )
}
