import Advertisement from '../../Advertisement/Advertisement';
import styles from './SidebarProfilePage.module.scss';

const SidebarProfilePage = () => {
    return (
        <div className={styles.sidebar}>
            <Advertisement />
            <Advertisement />
        </div>
    )
};

export default SidebarProfilePage;