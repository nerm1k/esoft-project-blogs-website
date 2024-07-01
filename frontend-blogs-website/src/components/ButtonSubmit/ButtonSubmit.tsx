import styles from './ButtonSubmit.module.scss';

interface ButtonSubmitProps {
    children: string
}

const ButtonSubmit = ({children} : ButtonSubmitProps) => {
    return(
        <>
            <button type='submit' className={styles.button}>{children}</button>
        </>
    )
};

export default ButtonSubmit;