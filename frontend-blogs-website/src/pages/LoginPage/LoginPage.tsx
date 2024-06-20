import { Link } from 'react-router-dom';
import InputLogin from '../../components/InputLogin/InputLogin';
import styles from './LoginPage.module.scss';
import ButtonLogin from '../../components/ButtonLogin/ButtonLogin';

const LoginPage = () => {
    return(
        <div className={styles.container}>
            <form className={styles.login}>
                <p className={styles.login__title}>Вход</p>
                <div className={styles.login__username}>
                    <InputLogin type="text" name="username" id="username" placeholder='Логин' icon={<i className="i--login fa-regular fa-user"></i>} />
                </div>
                <div className={styles.login__password}>
                    <InputLogin type="password" name="password" id="password" placeholder='Пароль' icon={<i className="i--login fa-regular fa-pen-to-square"></i>} />
                </div>
                <div className={styles.login__remember}>
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Запомнить меня</label>
                </div>
                <ButtonLogin type="submit" text="Войти" />
                <p className={styles.login__alternative}>Нет аккаунта? <Link to={'../signup'}>Создайте аккаунт</Link></p>
            </form>
        </div>
    );
}

export default LoginPage;