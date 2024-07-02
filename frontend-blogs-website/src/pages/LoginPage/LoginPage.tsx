import { Link, useNavigate } from 'react-router-dom';
import InputLogin from '../../components/InputLogin/InputLogin';
import styles from './LoginPage.module.scss';
import ButtonLogin from '../../components/ButtonLogin/ButtonLogin';
import { FormEvent, SyntheticEvent, useState } from 'react';
import { BASE_URL } from '../../utils/consts';
import { isValidLoginForm } from '../../utils/validations';
// import { jwtDecode } from 'jwt-decode';

interface LoginForm {
    username: string,
    password: string
};

interface ResponseData {
    message: string,
    jwtToken: string
};

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState<LoginForm>({
        username: '',
        password: ''
    });
    const [isValid, setIsValid] = useState(true);
    const [isError, setIsError] = useState(false);

    function handleChange(e: SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        setIsValid(true);
        setIsError(false);
        setLoginInfo({
            ...loginInfo,
            [target.name]: target.value
        })
    }

    function handleSubmit(e: FormEvent): void {
        e.preventDefault();
        const isValid = isValidLoginForm(loginInfo.username, loginInfo.password);
        setIsValid(isValid);
        if (!isValid) {
            return;
        } else {
            async function login() {
                try {
                    const res = await fetch(`${BASE_URL}/login`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify(loginInfo),
                    });
                    const data = await res.json() as ResponseData;
                    console.log(data);
                    if (!data.jwtToken) {
                        setIsError(true);
                    } else {
                        localStorage.setItem('jwt_token', data.jwtToken);
                        // const decodedJwtToken = jwtDecode(data.jwtToken);
                        // localStorage.setItem('decoded_jwt_token', JSON.stringify(decodedJwtToken))
                        navigate('/articles');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            login();
            // setIsValid(true);
            // setIsLoggedIn(true);
            // setLoginInfo({username: '', password: ''});
        }
    }

    return(
        <div className={styles.container}>
            <form className={styles.login} onSubmit={handleSubmit}>
                <p className={styles.login__title}>Вход</p>
                {!isValid && (
                        <p className={styles.login__error}>Заполните поля корректно</p>
                )}
                {isError && (
                    <p className={styles.login__error}>Данные некорректны</p>
                )}
                <div className={styles.login__username}>
                    <InputLogin type="text" name="username" id="username" placeholder='Логин' icon={<i className="i--login fa-regular fa-user"></i>} onChange={handleChange} value={loginInfo.username}/>
                </div>
                <div className={styles.login__password}>
                    <InputLogin type="password" name="password" id="password" placeholder='Пароль' icon={<i className="i--login fa-regular fa-pen-to-square"></i>} onChange={handleChange} value={loginInfo.password}/>
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