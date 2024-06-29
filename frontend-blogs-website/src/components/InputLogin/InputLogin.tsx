import { SyntheticEvent } from 'react';
import styles from './InputLogin.module.scss';

interface InputLoginProps {
    type: string,
    name: string,
    id: string,
    placeholder: string,
    icon: React.ReactNode,
    value: string,
    onChange: (e: SyntheticEvent) => void
}

const InputLogin = ({type, name, id, placeholder, icon, value, onChange}: InputLoginProps) => {
    return(
        <>
            <input className={styles.input} type={type} name={name} id={id} placeholder={placeholder} value={value} onChange={onChange}/>
            <div className={styles['i--login']}>
                {icon}
            </div>
        </>
    )
}

export default InputLogin;