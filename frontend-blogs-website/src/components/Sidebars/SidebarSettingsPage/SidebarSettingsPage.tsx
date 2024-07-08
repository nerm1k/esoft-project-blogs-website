import styles from './SidebarSettingsPage.module.scss';

const SidebarSettingsPage = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__settings}>
                <div className={styles.sidebar__title}>Настройки профиля</div>
                <p>Настройки профиля. Редактируйте профиль. Меняйте информацию. Редактируйте профиль. Настройки аккаунта. </p>
            </div>
        </div>
    )
};

export default SidebarSettingsPage;