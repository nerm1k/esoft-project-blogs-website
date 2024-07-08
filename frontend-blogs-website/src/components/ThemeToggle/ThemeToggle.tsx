import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    useEffect(() => {
        const theme = localStorage.getItem('theme');

        if (theme !== null) {
            setTheme(theme);
        } else {
            localStorage.setItem('theme', 'light');
        };
        console.log(theme);
    }, [])

    function handleChange() {
        if (theme == 'light') {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
            document.body.dataset.theme = 'dark';
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
            document.body.dataset.theme = 'light';
        }
    };

    return (
        <div className={styles['toggle-container']}>
            <label htmlFor="toggler">Сменить тему</label>
            <input
                id="toggler"
                type="checkbox"
                onChange={handleChange}
                checked={theme == 'light' ? false : true}
            />
        </div>    
    )
};

export default ThemeToggle;