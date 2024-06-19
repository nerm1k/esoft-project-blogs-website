import { Link } from 'react-router-dom';
import styles from './DropDownMenu.module.scss';

const DropDownMenu = () => {
    return(
        <div className={styles['dropdown-menu']}>
            <div className={styles['dropdown-menu__item']}>
                <Link to='/users/username'>
                    Профиль
                </Link>
            </div>
            <div className={styles['dropdown-menu__item']}>
                <Link to='/users/username/articles'>
                    Публикации
                </Link>
            </div>
            <div className={styles['dropdown-menu__item']}>
                <Link to='/settings'>
                    Настройки
                </Link>
            </div>
            <div className={styles['dropdown-menu__item']}>
                <Link to='/logout'>
                    Выйти
                </Link>
            </div>
        </div>
    )
}

export default DropDownMenu;