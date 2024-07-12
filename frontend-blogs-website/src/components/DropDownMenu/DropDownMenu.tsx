import { Link } from 'react-router-dom';
import styles from './DropDownMenu.module.scss';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

interface DropDownMenuProps {
    username: string,
    setIsDropDownMenuActive: React.Dispatch<React.SetStateAction<boolean>>
}

const DropDownMenu = ({username, setIsDropDownMenuActive}: DropDownMenuProps) => {
    return(
        <div className={styles['dropdown-menu']} onClick={() => setIsDropDownMenuActive(false)}>
            <Link to={`/users/${username.toLowerCase()}`}>
                <div className={styles['dropdown-menu__item']}>
                        Профиль
                </div>
            </Link>
            <Link to={`/users/${username.toLowerCase()}/articles`}>
                <div className={styles['dropdown-menu__item']}>
                        Публикации
                </div>
            </Link>
            <Link to='/settings'>
                <div className={styles['dropdown-menu__item']}>   
                        Настройки
                </div>
            </Link>
                {/* <div className={styles['dropdown-menu__item']}>   
                        <ThemeToggle />
                </div> */}
            <Link to='/logout'>
                <div className={styles['dropdown-menu__item']}>   
                        Выйти   
                </div>
            </Link>
        </div>
    )
}

export default DropDownMenu;