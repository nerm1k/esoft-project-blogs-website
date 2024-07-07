import { useState } from 'react';
import { User } from '../../pages/ProfilePage/ProfilePage';
import { formatDate } from '../../utils/functions';
import styles from './ProfileCard.module.scss';
import { Link } from 'react-router-dom';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

interface ProfileCardProps {
    user : User,
    currentPath: string | undefined
}

const ProfileCard = ({user, currentPath} : ProfileCardProps) => {
    const { isAuthenticated, authenticatedUser } = useIsAuthenticated();
    const [isShowMore, setIsShowMore] = useState(false);

    function showMore() {
        setIsShowMore(!isShowMore);
    }
    console.log(user);
    return (
        <div className={styles['profile-card']}>
            <div className={styles['profile-card__main']}>
                <div className={styles['profile-card__img']}>
                    <img src={user.avatar} alt="avatar" referrerPolicy="no-referrer"/>
                </div>
                <div className={styles['profile-card__info']}>
                    <p className={styles['profile-card__username']}>
                        {user.username}
                    </p>
                    <p className={styles['profile-card__id']}>
                        ID: {user.userID}
                    </p>
                    <p className={styles['profile-card__rating']}>
                        Рейтинг: {user.rating}
                    </p>
                </div>
            </div>
            <div className={styles['profile-card__show-more']} onClick={showMore}>
                <i className={`fa-solid fa-caret-down ${isShowMore ? styles['active'] : ''}`}></i> Подробнее
            </div>
            {isShowMore && (
                <div className={styles['profile-card__additional']}>
                    {(user.firstName || user.lastName || user.surname) && (
                        <p className={styles['profile-card__name']}>
                            {user.lastName != 'null' ? user.lastName : ''} {user.firstName != 'null' ? user.firstName : ''} {user.surname != 'null' ? user.surname : ''}
                        </p>
                    )}
                    {user.dateOfBirth && (
                        <p className={styles['profile-card__birthday']}>
                            Дата рождения: {formatDate(user.dateOfBirth).slice(0, -6)}
                        </p>
                    )}
                    {user.description && (
                        <p className={styles['profile-card__description']}>
                            {user.description}
                        </p>
                    )}
                    <p className={styles['profile-card__created-at']}>
                        Аккаунт создан: {formatDate(user.createdAt)}
                    </p>     
                </div>
            )}
            <div className={styles['profile-card__dropdown']}>
                <Link to={`/users/${user.username.toLocaleLowerCase()}/articles`}>
                    <div className={`${styles.dropdown__item} ${currentPath == 'articles' ? styles['active-link'] : ''}`}>
                        Публикации
                    </div>
                </Link>
                <Link to={`/users/${user.username.toLocaleLowerCase()}/comments`}>
                    <div className={`${styles.dropdown__item} ${currentPath == 'comments' ? styles['active-link'] : ''}`}>
                         Комментарии
                    </div>
                </Link>
                {authenticatedUser.username == user.username && (
                    <Link to='/articles/new'>
                        <div className={styles.dropdown__item}>
                            Написать новый пост
                        </div>
                    </Link>
                )} 
            </div>
        </div>
    )
};

export default ProfileCard;