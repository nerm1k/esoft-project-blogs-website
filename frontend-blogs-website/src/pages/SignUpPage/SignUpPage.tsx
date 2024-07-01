import { FormEvent, SyntheticEvent, useState } from 'react';
import ButtonLogin from '../../components/ButtonLogin/ButtonLogin';
import InputLogin from '../../components/InputLogin/InputLogin';
import styles from './SignUpPage.module.scss';
import { isValidSignUpForm } from '../../utils/validations';
import { BASE_URL } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';

interface SignUpForm {
    username: string,
    email: string,
    password: string
};

const SignUpPage = () => {
    const navigate = useNavigate();
    const [signUpInfo, setSignUpInfo] = useState<SignUpForm>({
        username: '',
        email: '',
        password: ''
    });
    const [isValid, setIsValid] = useState(true);

    function handleChange(e: SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        setIsValid(true);
        setSignUpInfo({
            ...signUpInfo,
            [target.name]: target.value
        })
    }

    function handleSubmit(e: FormEvent): void {
        e.preventDefault();
        const isValid = isValidSignUpForm(signUpInfo.username, signUpInfo.email, signUpInfo.password);
        setIsValid(isValid);
        console.log(isValid);
        if (!isValid) {
            return;
        } else {
            async function register() {
                const res = await fetch(`${BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(signUpInfo),
                });
                if (res.status === 201) {
                    navigate('/login');
                }
            }
    
            register();
            setIsValid(true);
            setSignUpInfo({username: '', email: '', password: ''});
        }
    }

    return(
        <div className={styles.container}>
            <form className={styles.login} onSubmit={handleSubmit}>
                <p className={styles.login__title}>Регистрация</p>
                {!isValid && (
                        <p className={styles.login__error}>Заполните поля корректно</p>
                )}
                <div className={styles.login__username} data-title='Логин не меньше 6-ти символов и не больше 32-ух символов'>
                    <InputLogin type="text" name="username" id="username" placeholder='Логин' icon={<i className="i--login fa-regular fa-user"></i>} value={signUpInfo.username} onChange={handleChange}/>
                </div>
                <div className={styles.login__email} data-title='Почта не меньше 6-ти символов и не больше 64-ех символов'>
                    <InputLogin type="email" name="email" id="email" placeholder='Email' icon={<i className="i--login fa-regular fa-envelope"></i>} value={signUpInfo.email} onChange={handleChange}/>
                </div>
                <div className={styles.login__password} data-title='Пароль не меньше 6-ти символов и не больше 32-ух символов'>
                    <InputLogin type="password" name="password" id="password" placeholder='Пароль' icon={<i className="i--login fa-regular fa-pen-to-square"></i>} value={signUpInfo.password} onChange={handleChange}/>
                </div>
                    <ButtonLogin type="submit" text="Зарегистрироваться"/>
            </form>
        </div>
    )
}

export default SignUpPage;