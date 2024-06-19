import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useEffect, useRef, useState } from 'react';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isDropDownMenuActive, setIsDropDownMenuActive] = useState(false);
    const dropDownMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutsideDropDownMenu(event: MouseEvent) {
            if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target as Node)) {
                setIsDropDownMenuActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutsideDropDownMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropDownMenu);
        };
    }, [])

    function toggleDropdownMenu() {
        setIsDropDownMenuActive(!isDropDownMenuActive);
    }

    return(
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <Link to='/articles'>
                    <img src="/images/logo.png" alt="" />
                </Link>
            </div>
            <nav className={styles.header__nav}>
                {!isLoggedIn && (
                    <ul>
                        <li>
                            <Link to='/login'>
                                Войти
                            </Link>
                        </li>
                        <li>
                            <Link to='/signup'>
                                Регистрация
                            </Link>
                        </li>
                    </ul>
                )}
                {isLoggedIn && (
                    <>
                        <ul>
                            <li className={styles.nav__profile} onClick={toggleDropdownMenu}>
                              username
                            </li>
                        </ul>
                        {isDropDownMenuActive && (
                            <div ref={dropDownMenuRef}>
                                <DropDownMenu />    
                            </div>
                        )}
                    </>
                )}

            </nav>
        </header>
    )
}

export default Header;