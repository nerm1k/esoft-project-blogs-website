import { SyntheticEvent } from 'react';
import styles from './Input.module.scss';

interface InputProps {
    type: string,
    name: string,
    id: string,
    onChange: (e: SyntheticEvent) => void,
    value?: any,
    label: string
    width?: string,
    required?: boolean
}

const Input = ({ type, name, id, onChange, value, label, width, required }: InputProps) => {
    return(
        <>
            <label htmlFor={id} className={styles['input-label']}>{required && (<span className={styles['input-span']}>*</span>)}{label}</label>
            <input type={type} name={name} id={id} onChange={onChange} value={value} className={styles['input-text']} style={{width: width}}/>
        </>
    )
};

export default Input;