import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import styles from './EditSettingsProfile.module.scss';
import Textarea from '../Textarea/Textarea';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import { BASE_URL } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';
import { isEditProfileValid, isImageExtensionValid } from '../../utils/validations';
import Input from '../Input/Input';

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

interface ImgurResponse {
    status: number,
    success: boolean,
    data: {
        id: string
    }
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
    const [imageID, setImageID] = useState('');

    useEffect(() => {
        async function getUserData() {
            try {
                const res = await fetch(`${BASE_URL}/users/${username.toLowerCase()}`);
                if (res.status === 200) {
                    const data = await res.json() as UserEditSettingsProfile;
                    if (data.dateOfBirth) {
                        const date = new Date(data.dateOfBirth);
                        const formattedDate = date.getFullYear() + '-' + 
                                             ('0' + (date.getMonth() + 1)).slice(-2) + '-' + 
                                             ('0' + date.getDate()).slice(-2);
                        data.dateOfBirth = formattedDate;
                    };
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

        async function uploadImage() {
            if (userSettingsProfile.avatar && userSettingsProfile.avatar instanceof File) {
                const isImageValid = isImageExtensionValid(userSettingsProfile.avatar as File);

                if (!isImageValid) {
                    setIsValid(false);
                    return;
                };
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Client-ID e60b3e698cdfe1a");

                var formdata = new FormData();
                
                formdata.append('image', userSettingsProfile.avatar, userSettingsProfile.avatar.name);
                formdata.append("type", "image");

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                };

                try {
                    const res = await fetch("https://api.imgur.com/3/image", requestOptions);
                    const data: ImgurResponse = await res.json();
                    if (data.status === 200) {  
                        return data.data.id;
                    }
                    return undefined;
                } catch (error) {
                    console.log(error);
                    return undefined;
                }
            }
        };

        // uploadImage();

        // const formData = new FormData();
        // formData.append('firstName', userSettingsProfile.firstName);
        // formData.append('lastName', userSettingsProfile.lastName);
        // formData.append('surname', userSettingsProfile.surname);
        // formData.append('description', userSettingsProfile.description);
        // formData.append('dateOfBirth', userSettingsProfile.dateOfBirth);
        // if (userSettingsProfile.avatar && userSettingsProfile.avatar instanceof File) {
        //     const isImageValid = isImageExtensionValid(userSettingsProfile.avatar as File);

        //     if (!isImageValid) {
        //         setIsValid(false);
        //         return;
        //     };

        //     formData.append('image', userSettingsProfile.avatar);
        // }
        
        async function updateUser(avatarID: string | undefined) {
            const updatedUser = {
                firstName: userSettingsProfile.firstName,
                lastName: userSettingsProfile.lastName,
                surname: userSettingsProfile.surname,
                description: userSettingsProfile.description,
                dateOfBirth: userSettingsProfile.dateOfBirth,
                avatar: avatarID
            };
            const isValid = isEditProfileValid(updatedUser.firstName, updatedUser.lastName, updatedUser.surname, updatedUser.dateOfBirth);
            setIsValid(isValid);
            if (!isValid) {
                return;
            } else {
                try {
                    console.log(updatedUser);
                    const res = await fetch(`${BASE_URL}/users/${userID}`, {
                        method: 'PUT',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                        },
                        body: JSON.stringify(updatedUser)
                    });
                    if (res.status === 204) {
                        navigate(`/users/${username.toLowerCase()}`)
                    } else {
                        console.log('-');
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        };
    
        // updateUser();

        uploadImage().then(avatarID => {
            updateUser(avatarID);
        }).catch(error => {
            console.log(error);
        });
    };

    return(
        <form className={styles['form-edit']} encType='multipart/form-data' onSubmit={handleSubmit}>
            {!isValid && (
                <p className={styles['form-edit__error']}>Заполните поля корректно</p>
            )}
            <Input type='text' name="firstName" id="firstName" value={userSettingsProfile.firstName || ''} onChange={handleChange} label='Имя'/>
            <Input type="text" name="lastName" id="lastName" value={userSettingsProfile.lastName || ''} onChange={handleChange} label='Фамилия'/>
            <Input type="text" name="surname" id="surname" value={userSettingsProfile.surname || ''} onChange={handleChange} label='Отчество'/>
            <label className={styles['form-edit__description-label']} htmlFor="description">Описание <span>{userSettingsProfile.description ? 200 - userSettingsProfile.description.length : '200'}</span></label>
            <Textarea name='description' id='description' onChange={handleChange} value={userSettingsProfile.description || ''}/>
            <Input type="date" name="dateOfBirth" id="dateOfBirth" value={userSettingsProfile.dateOfBirth} onChange={handleChange} label='Дата рождения'/>
            <label htmlFor="avatar">Изображение:</label>
            <input type="file" name="avatar" id="avatar" onChange={handleChangeImage} accept='image/jpeg, image/png' />
            <ButtonSubmit>Сохранить</ButtonSubmit>
        </form>
    )
};

export default EditSettingsProfile;