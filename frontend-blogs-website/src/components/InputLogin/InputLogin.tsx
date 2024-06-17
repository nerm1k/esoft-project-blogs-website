import styles from './InputLogin.module.scss';

interface InputLoginProps {
    type: string,
    name: string,
    id: string,
    placeholder: string,
    icon: React.ReactNode
}

const InputLogin = ({type, name, id, placeholder, icon}: InputLoginProps) => {
    return(
        <>
            <input className={styles.input} type={type} name={name} id={id} placeholder={placeholder}/>
            {icon}
        </>
    )
}

export default InputLogin;