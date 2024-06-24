import styles from './SidebarFeedbackPage.module.scss';

const SidebarFeedbackPage = () => {
    return(
        <div className={styles.sidebar}>
            <div className={styles.sidebar__feedback}>
                <div className={styles.sidebar__title}>О службе поддержки</div>
                <p>Обращения обрабатываются по рабочим дням, с 9 до 19 по московскому времени.</p>
                <p>Мы стараемся отвечать в течение 24 часов, но время может увеличиться, в зависимости от количества и сложности поступивших обращений. Если ответа долго нет, проверьте папку со спамом.</p>
                <p>Излагайте суть обращения максимально осмысленно и подробно — это сократит количество уточняющих вопросов и поможет быстрее получить ответ.</p>
            </div>
        </div>
    )
}

export default SidebarFeedbackPage;