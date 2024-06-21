import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footer__item}>
                    © 2024, Бойко Роман
                </div>
                <div className={styles.footer__item}>
                    <Link to={'./feedback'}>
                        Техническая поддержка
                    </Link>
                </div>
                <div className={styles.footer__item}>
                    <div className={styles['footer__img-link']}>
                        <a href="https://vk.com/nermi">
                            <img src="./images/vk.png" alt="vk.com/nermi" />
                        </a>
                    </div>
                    <div className={styles['footer__img-link']}>
                        <a href="https://t.me/persikkkkkkkkkkkkkkkk">
                            <img src="./images/telegram.png" alt="t.me/persikkkkkkkkkkkkkkkk" />
                        </a>
                    </div>
                    <div className={styles['footer__img-link']}>
                        <a href="https://github.com/nerm1k">
                            <img src="./images/github.png" alt="github.com/nerm1k" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;