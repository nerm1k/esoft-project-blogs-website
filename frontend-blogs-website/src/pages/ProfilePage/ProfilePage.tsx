import { useLocation, useParams } from "react-router-dom";
import styles from './ProfilePage.module.scss';
import SidebarProfilePage from "../../components/Sidebars/SidebarProfilePage/SidebarProfilePage";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/consts";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserArticles from "../../components/UserArticles/UserArticles";
import UserComments from "../../components/UserComments/UserComments";

export interface User {
    userID: number,
    username: string,
    email: string,
    firstName?: string,
    lastName?: string,
    surname?: string,
    description?: string,
    dateOfBirth?: Date,
    status?: string,
    rating: number,
    avatar?: string,
    createdAt: Date
}

interface ImgurResponse {
    status: number,
    success: boolean,
    data: {
        link: string
    }
}

const ProfilePage = () => {
    const { username } = useParams();
    const [user, setUser] = useState<User>({
        userID: 0,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        surname: '',
        description: '',
        dateOfBirth: new Date(),
        status: '',
        rating: 0,
        avatar: '',
        createdAt: new Date()
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const location = useLocation();
    const pathname = location.pathname;
    const currentPath = pathname.split('/').pop();

    useEffect(() => {
        async function getImage(dataUser: User | undefined) {
            if (dataUser) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Client-ID e60b3e698cdfe1a");
                
                var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                };
                
                try {
                    const res = await fetch(`https://api.imgur.com/3/image/${dataUser.avatar}`, requestOptions);
                    const data: ImgurResponse = await res.json();
                    if (data.status === 200) {
                        setUser({ ...dataUser, avatar: data.data.link });
                    }
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }

        };



        async function fetchUser() {
            setIsLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/users/${username}`);
                
                if (res.status === 404) {
                    setIsError(true);
                } else {
                    const data = await res.json() as User;
                    setUser(data);
                    console.log(data);
                    return data;
                }
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser().then(data => {
            if (data?.avatar) {
                getImage(data);
            };
        })
        .catch(error => {
            console.log(error);
        });;


    }, [username]);
    console.log(user);
    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (isError) {
        return <div>Что-то пошло не так! Пожалуйста, обновите страницу.</div>
    }

    return (
        <>
            <div className={styles.container}>
                <ProfileCard user={user} currentPath={currentPath}/>
                {currentPath == 'articles' && (
                    <UserArticles username={username}/>
                )}
                {currentPath == 'comments' && (
                    <UserComments username={username} />
                )}
            </div>
            <SidebarProfilePage />
        </>
    )
};

export default ProfilePage;