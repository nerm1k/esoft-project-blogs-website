import { Link } from 'react-router-dom';
import Advertisement from '../../Advertisement/Advertisement';
import styles from './SidebarProfilePage.module.scss';

const SidebarProfilePage = () => {
    return (
        <div className={styles.sidebar}>
            <Link to={'/settings'}>
                <div className={styles.sidebar__edit}>Редактировать профиль</div>
            </Link>
            <Advertisement />
            <Advertisement />
        </div>
    )
};

export default SidebarProfilePage;