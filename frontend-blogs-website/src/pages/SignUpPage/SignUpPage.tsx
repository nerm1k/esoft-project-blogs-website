import ButtonLogin from '../../components/ButtonLogin/ButtonLogin';
import InputLogin from '../../components/InputLogin/InputLogin';
import styles from './SignUpPage.module.scss';


const SignUpPage = () => {
    return(
        <div className={styles.container}>
            <form className={styles.login}>
                <p className={styles.login__title}>Регистрация</p>
                <div className={styles.login__username}>
                    <InputLogin type="text" name="username" id="username" placeholder='Логин' icon={<i className="i--login fa-regular fa-user"></i>} />
                </div>
                <div className={styles.login__email}>
                    <InputLogin type="email" name="email" id="email" placeholder='Email' icon={<i className="i--login fa-regular fa-envelope"></i>} />
                </div>
                <div className={styles.login__password}>
                    <InputLogin type="password" name="password" id="password" placeholder='Пароль' icon={<i className="i--login fa-regular fa-pen-to-square"></i>} />
                </div>
                    <ButtonLogin type="submit" text="Зарегистрироваться" />
            </form>
        </div>
    )
}

export default SignUpPage;