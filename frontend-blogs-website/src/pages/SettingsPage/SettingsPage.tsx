import { Link, useLocation } from 'react-router-dom';
import styles from './SettingsPage.module.scss';
import EditSettingsProfile from '../../components/EditSettingsProfile/EditSettingsProfile';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import EditSettingsAccount from '../../components/EditSettingsAccount/EditSettingsAccount';
import SidebarSettingsPage from '../../components/Sidebars/SidebarSettingsPage/SidebarSettingsPage';

const SettingsPage = () => {
    const { isAuthenticated, authenticatedUser } = useIsAuthenticated();
    const location = useLocation();
    const pathname = location.pathname;
    const currentPath = pathname.split('/').pop();

    return(
        <>
            <div className={styles['profile-edit']}>
                <div className={styles['profile-edit__dropdown']}>
                    <Link to={`/settings/profile`}>
                        <div className={`${styles.dropdown__item} ${currentPath == 'profile' ? styles['active-link'] : ''}`}>
                            Профиль
                        </div>
                    </Link>
                    <Link to={`/settings/account`}>
                        <div className={`${styles.dropdown__item} ${currentPath == 'account' ? styles['active-link'] : ''}`}>
                            Аккаунт
                        </div>
                    </Link>
                </div>
                {currentPath == 'profile' && (
                    <EditSettingsProfile username={authenticatedUser.username.toLowerCase()} userID={authenticatedUser.user_id}/>
                )}
                {currentPath == 'account' && (
                    <EditSettingsAccount username={authenticatedUser.username.toLowerCase()} userID={authenticatedUser.user_id} />
                )}
            </div>
            <SidebarSettingsPage />
        </>
    )
};

export default SettingsPage;