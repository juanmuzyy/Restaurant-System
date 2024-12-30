"use client"

import styles from './styles.module.scss'
import { useFormStatus } from 'react-dom'

interface Props{
    name: string
}

// com essa propriedade estamos fazendo com que em qualquer lugar do meu codigo se eu quiser reutilizar o button, eu posso renomar ele 

export function Button({name}: Props){

    const {pending} = useFormStatus();

    return(
        <button type='submit' disabled={pending} className={styles.button}>
            {pending  ? "Carregando..." : name}
        </button>
    )
}