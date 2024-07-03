import { Link } from 'react-router-dom';
import styles from './DropDownMenu.module.scss';

interface DropDownMenuProps {
    username: string,
    setIsDropDownMenuActive: React.Dispatch<React.SetStateAction<boolean>>
}

const DropDownMenu = ({username, setIsDropDownMenuActive}: DropDownMenuProps) => {
    return(
        <div className={styles['dropdown-menu']} onClick={() => setIsDropDownMenuActive(false)}>
            <Link to={`/users/${username}`}>
                <div className={styles['dropdown-menu__item']}>
                        Профиль
                </div>
            </Link>
            <Link to={`/users/${username}/articles`}>
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