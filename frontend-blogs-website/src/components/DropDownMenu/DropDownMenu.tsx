import { Link } from 'react-router-dom';
import styles from './DropDownMenu.module.scss';

const DropDownMenu = () => {
    return(
        <div className={styles['dropdown-menu']}>
            <Link to='/users/username'>
                <div className={styles['dropdown-menu__item']}>
                        Профиль
                </div>
            </Link>
            <Link to='/users/username/articles'>
                <div className={styles['dropdown-menu__item']}>
                        Публикации
                </div>
            </Link>
            <Link to='/settings'>
                <div className={styles['dropdown-menu__item']}>   
                        Настройки
                </div>
            </Link>
            <Link to='/logout'>
                <div className={styles['dropdown-menu__item']}>   
                        Выйти   
                </div>
            </Link>
        </div>
    )
}

export default DropDownMenu;