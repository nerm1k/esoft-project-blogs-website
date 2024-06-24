import Advertisement from '../../Advertisement/Advertisement';
import styles from './SidebarArticlesPage.module.scss';

const SidebarArticlesPage = () => {
    return(
        <div className={styles.sidebar}>
            <div className={styles.advertisement}>
                <Advertisement />
            </div>
            <div className={styles.advertisement}>
                <Advertisement />
            </div>
            <div className={styles['sidebar__top-articles']}>
                Топ статей
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
        </div>
    )
}

export default SidebarArticlesPage;