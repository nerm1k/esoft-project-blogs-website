import { Link } from 'react-router-dom';
import Advertisement from '../../Advertisement/Advertisement';
import styles from './SidebarProfilePage.module.scss';
import useIsAuthenticated from '../../../hooks/useIsAuthenticated';

const SidebarProfilePage = () => {
    const {isAuthenticated} = useIsAuthenticated();

    return (
        <div className={styles.sidebar}>
            {isAuthenticated && (
                <Link to={'/settings'}>
                <div className={styles.sidebar__edit}>Редактировать профиль</div>
            </Link>
            )}
            <Advertisement />
            <Advertisement />
        </div>
    )
};

export default SidebarProfilePage;