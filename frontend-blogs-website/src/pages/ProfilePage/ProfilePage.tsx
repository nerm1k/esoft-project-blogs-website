import { Link, useLocation, useParams } from "react-router-dom";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";
import styles from './ProfilePage.module.scss';
import SidebarProfilePage from "../../components/Sidebars/SidebarProfilePage/SidebarProfilePage";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/consts";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserArticles from "../../components/UserArticles/UserArticles";

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

const ProfilePage = () => {
    const { isAuthenticated, authenticatedUser } = useIsAuthenticated();
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
                }
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

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
                {authenticatedUser.username == username && (
                    <p>your profle {user?.userID} create edit here</p> 
                )} 
                {currentPath == 'articles' && (
                    <UserArticles username={username}/>
                )}
            </div>
            <SidebarProfilePage />
        </>
    )
};

export default ProfilePage;