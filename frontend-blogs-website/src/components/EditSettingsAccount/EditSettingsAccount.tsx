import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import styles from './EditSettingsAccount.module.scss';
import Textarea from '../Textarea/Textarea';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import { BASE_URL } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import { isEmailValid, isImageExtensionValid, isPasswordValid, isUsernameValid } from '../../utils/validations';
import Input from '../Input/Input';

interface EditSettingsAccountProps {
    username: string
    userID: number
}

interface UserEditSettingsAccount {
    username: string,
    email: string,
    password: string
}

const EditSettingsAccount = ({ username, userID }: EditSettingsAccountProps) => {
    const navigate = useNavigate();
    const [userSettingsAccount, setUserSettingsAccount] = useState<UserEditSettingsAccount>({
        username: '',
        email: '',
        password: '',
    });
    const [isValid, setIsValid] = useState(true);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    useEffect(() => {
        async function getUserData() {
            try {
                const res = await fetch(`${BASE_URL}/users/${username}`);
                if (res.status === 200) {
                    const data = await res.json() as UserEditSettingsAccount;
                    setUserSettingsAccount(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getUserData();
    }, []);

    function handleChange(e: SyntheticEvent) {
        setIsValid(true);
        const target = e.target as HTMLInputElement;
        setUserSettingsAccount({
            ...userSettingsAccount,
            [target.name]: target.value
        });
    };

    function handleSubmitUsername(e: FormEvent) { 
        e.preventDefault();
        const isValid = isUsernameValid(userSettingsAccount.username);
        if (!isValid) {
            setIsValidUsername(false);
            return;
        }
        async function updateUser() {
            try {
                const res = await fetch(`${BASE_URL}/users/${userID}/username`, {
                    method: 'PUT',
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    },
                    body: JSON.stringify(userSettingsAccount)
                });
                if (res.status === 204) {
                    navigate(`/logout`)
                } else {
                    alert('Такой логин уже занят');
                }

            } catch (error) {
                console.log(error);
            }
        };
    
        updateUser();
    };

    function handleSubmitEmail(e: FormEvent) { 
        e.preventDefault();
        const isValid = isEmailValid(userSettingsAccount.email);
        if (!isValid) {
            setIsValidEmail(false);
            return;
        }
        async function updateUser() {
            try {
                const res = await fetch(`${BASE_URL}/users/${userID}/email`, {
                    method: 'PUT',
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    },
                    body: JSON.stringify(userSettingsAccount)
                });
                if (res.status === 204) {
                    navigate(`/users/${username}`)
                } else {
                    alert('Такая почта уже занята');
                }

            } catch (error) {
                console.log(error);
            }
        };
    
        updateUser();
    };

    function handleSubmitPassword(e: FormEvent) { 
        e.preventDefault();
        const isValid = isPasswordValid(userSettingsAccount.password);
        if (!isValid) {
            setIsValidPassword(false);
            return;
        }
        async function updateUser() {
            try {
                const res = await fetch(`${BASE_URL}/users/${userID}/password`, {
                    method: 'PUT',
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    },
                    body: JSON.stringify(userSettingsAccount)
                });
                if (res.status === 204) {
                    navigate('/logout')
                } else {
                    console.log('-')
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        updateUser();
    };

    return(
        <>
            <form className={styles['form-edit']} encType='multipart/form-data' onSubmit={handleSubmitUsername}>
                {!isValidUsername && (
                    <p className={styles['form-edit__error']}>Заполните поля корректно</p>
                )}
                <Input type='text' name="username" id="username" value={userSettingsAccount.username} onChange={handleChange} label='Логин'/>
                <ButtonSubmit>Сохранить</ButtonSubmit>
            </form>
            <form className={styles['form-edit']} encType='multipart/form-data' onSubmit={handleSubmitEmail}>
                {!isValidEmail && (
                    <p className={styles['form-edit__error']}>Заполните поля корректно</p>
                )}
                <Input type="email" name="email" id="email" value={userSettingsAccount.email} onChange={handleChange} label='Почта'/>
                <ButtonSubmit>Сохранить</ButtonSubmit>
            </form>
            <form className={styles['form-edit']} encType='multipart/form-data' onSubmit={handleSubmitPassword}>
                {!isValidPassword && (
                    <p className={styles['form-edit__error']}>Заполните поля корректно</p>
                )}
                <Input type="password" name="password" id="password" value={userSettingsAccount.password} onChange={handleChange} label='Пароль'/>
                <ButtonSubmit>Сохранить</ButtonSubmit>
            </form>
        </>
    )
};

export default EditSettingsAccount;