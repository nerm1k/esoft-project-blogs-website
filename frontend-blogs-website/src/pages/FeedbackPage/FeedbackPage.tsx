import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import styles from './FeedbackPage.module.scss';
import { isValidFeedbackForm } from '../../utils/validations';
import { BASE_URL } from '../../utils/consts';

interface FeedbackInfo {
    topic: string,
    email: string,
    description: string
}

const FeedbackPage = () => {
    const [feedbackInfo, setFeedbackInfo] = useState<FeedbackInfo>({
        topic: '',
        email: '',
        description: ''
    });
    const [isValid, setIsValid] = useState(true);
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    function handleInputs(e: SyntheticEvent): void {
        setIsValid(true);
        const target = e.target as HTMLInputElement;
        setFeedbackInfo({
            ...feedbackInfo,
            [target.name]: target.value
        })
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const isValid = isValidFeedbackForm(feedbackInfo.topic, feedbackInfo.email, feedbackInfo.description);
        setIsValid(isValid);
        if (!isValid) {
            return;
        } else {
            async function sendEmail() {
                const res = await fetch(`${BASE_URL}/feedbacks`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(feedbackInfo),
                });
                const data = await res.json();
                console.log(data);
            }
    
            sendEmail();
            setIsSent(true);
            setFeedbackInfo({topic: '', email: '', description: ''});
        }
    }

    return(
        <>
            <form className={styles.feedback} onSubmit={handleSubmit}>
                <h3>Техническая поддержка</h3>
                {!isSent && (
                    <>
                     {!isValid && (
                        <p className={styles.feedback__error}>Заполните поля корректно</p>
                    )}
                    <label htmlFor="topic"><span>*</span>Укажите тему обращения:</label>
                    <input type="text" name='topic' id='topic' className={styles.feedback__topic} onChange={handleInputs} value={feedbackInfo.topic}/>
                    <label htmlFor="email"><span>*</span>Ваш адрес электронной почты:</label>
                    <input type="email" name="email" id="email" className={styles.feedback__email} onChange={handleInputs} value={feedbackInfo.email}/>
                    <label htmlFor="description"><span>*</span>Текст вашего сообщения:</label>
                    <textarea name="description" id="description" onChange={handleInputs} value={feedbackInfo.description}></textarea>
                    <button type='submit' className={styles.feedback__button}>Отправить</button>
                    </>
                )}
                {isSent && (
                    <p className={styles.feedback__thanks}>
                        Спасибо за обращение. С вами свяжутся в ближайшее время.
                    </p>
                )}
            </form>
        </>
    )
}

export default FeedbackPage;