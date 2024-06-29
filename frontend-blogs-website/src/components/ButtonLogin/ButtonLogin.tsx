import styles from './ButtonLogin.module.scss';

interface ButtonLoginProps {
    type: 'submit' | 'reset' | 'button',
    text: string,
}

const ButtonLogin = ({type, text}: ButtonLoginProps) => {
    return(
        <button className={styles.button} type={type}>
            {text}
        </button>
    )
}

export default ButtonLogin;