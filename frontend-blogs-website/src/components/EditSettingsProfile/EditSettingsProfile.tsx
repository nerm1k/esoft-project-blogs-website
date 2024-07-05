import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import styles from './EditSettingsProfile.module.scss';
import Textarea from '../Textarea/Textarea';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import { BASE_URL } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import { isImageExtensionValid } from '../../utils/validations';

interface EditSettingsProfileProps {
    username: string
    userID: number
}

interface UserEditSettingsProfile {
    firstName: string,
    lastName: string,
    surname: string,
    description: string,
    dateOfBirth: string,
    avatar?: File | string
}

const EditSettingsProfile = ({ username, userID }: EditSettingsProfileProps) => {
    const navigate = useNavigate();
    const [userSettingsProfile, setUserSettingsProfile] = useState<UserEditSettingsProfile>({
        firstName: '',
        lastName: '',
        surname: '',
        description: '',
        dateOfBirth: '',
        avatar: undefined
    });
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        async function getUserData() {
            try {
                const res = await fetch(`${BASE_URL}/users/${username}`);
                if (res.status === 200) {
                    const data = await res.json() as UserEditSettingsProfile;
                    const date = new Date(data.dateOfBirth);
                    const formattedDate = date.getFullYear() + '-' + 
                                         ('0' + (date.getMonth() + 1)).slice(-2) + '-' + 
                                         ('0' + date.getDate()).slice(-2);
                    data.dateOfBirth = formattedDate;
                    setUserSettingsProfile(data);
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
        if (target.name == 'description') {
            if (target.value.length <= 200) {
                setUserSettingsProfile({
                    ...userSettingsProfile,
                    description: target.value
                });
            }
        } else {
            setUserSettingsProfile({
                ...userSettingsProfile,
                [target.name]: target.value
            });
        }
    };

    function handleChangeImage(e: SyntheticEvent): void {
       const target = e.target as HTMLInputElement;
       if (target.files) {
           setUserSettingsProfile({
               ...userSettingsProfile,
               avatar: target.files[0]
           });
       };
   }

    function handleSubmit(e: FormEvent) { 
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', userSettingsProfile.firstName);
        formData.append('lastName', userSettingsProfile.lastName);
        formData.append('surname', userSettingsProfile.surname);
        formData.append('description', userSettingsProfile.description);
        formData.append('dateOfBirth', userSettingsProfile.dateOfBirth);
        if (userSettingsProfile.avatar && userSettingsProfile.avatar instanceof File) {
            const isImageValid = isImageExtensionValid(userSettingsProfile.avatar as File);

            if (!isImageValid) {
                setIsValid(false);
                return;
            };

            formData.append('image', userSettingsProfile.avatar);
        }
        
        async function updateUser() {
            try {
                const res = await fetch(`${BASE_URL}/users/${userID}`, {
                    method: 'PUT',
                    headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    },
                    body: formData
                });
                if (res.status === 204) {
                    navigate(`/users/${username}`)
                } else {
                    console.log('-');
                }

            } catch (error) {
                console.log(error);
            }
        };
    
        updateUser();
    };

    return(
        <form className={styles['form-edit']} encType='multipart/form-data' onSubmit={handleSubmit}>
            {!isValid && (
                <p className={styles['form-edit__error']}>Заполните поля корректно</p>
            )}
            <label htmlFor="firstName">Имя</label>
            <input type="text" name="firstName" id="firstName" value={userSettingsProfile.firstName} onChange={handleChange}/>
            <label htmlFor="lastName">Фамилия</label>
            <input type="text" name="lastName" id="lastName" value={userSettingsProfile.lastName} onChange={handleChange}/>
            <label htmlFor="surname">Отчество</label>
            <input type="text" name="surname" id="surname" value={userSettingsProfile.surname} onChange={handleChange}/>
            <label className={styles['form-edit__description-label']} htmlFor="description">Описание <span>{userSettingsProfile.description ? 200 - userSettingsProfile.description.length : '200'}</span></label>
            <Textarea name='description' id='description' onChange={handleChange} value={userSettingsProfile.description}/>
            <label htmlFor="dateOfBirth">Дата рождения</label>
            <input type="date" name="dateOfBirth" id="dateOfBirth" value={userSettingsProfile.dateOfBirth} onChange={handleChange}/>
            <label htmlFor="avatar">Изображение:</label>
            <input type="file" name="avatar" id="avatar" onChange={handleChangeImage} accept='image/jpeg, image/png' />
            <ButtonSubmit>Сохранить</ButtonSubmit>
        </form>
    )
};

export default EditSettingsProfile;