import styles from './Advertisement.module.scss';

const Advertisement = () => {
    return(
        <div className={styles.advertisement}>
            <a href="https://www.etagi.com/" target='_blank'>
                <div className={styles.advertisement__image}>
                    <img src="/images/etagi.jpg" alt="ad etagi" />
                    <p>Реклама</p>
                </div>
            </a>
        </div>
    )
}

export default Advertisement;