import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useEffect, useRef, useState } from 'react';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { useAppDispatch } from '../../hooks/hooks';
import { setCurrentPage } from '../../store/currentPageSlice';
import { setPagesAround } from '../../store/pagesAroundSlice';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const Header = () => {
    const { isAuthenticated, user } = useIsAuthenticated();
    const [isDropDownMenuActive, setIsDropDownMenuActive] = useState(false);
    const dropDownMenuRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

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
            <div className={styles.container}>
                <div className={styles.header__logo}>
                    <Link to='/articles?page=1' onClick={() => {
                                                            dispatch(setCurrentPage(1))
                                                            dispatch(setPagesAround({
                                                                previous: false,
                                                                next: true
                                                            }))
                    }}>
                        <img src="/images/logo.png" alt="" />
                    </Link>
                </div>
                <nav className={styles.header__nav}>
                    {!isAuthenticated && (
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
                    {isAuthenticated && (
                        <>
                            <ul>
                                <li className={styles.nav__profile} onClick={toggleDropdownMenu}>
                                    {user?.username}
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
            </div>
        </header>
    )
}

export default Header;