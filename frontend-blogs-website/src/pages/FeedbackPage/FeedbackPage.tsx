import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import styles from './FeedbackPage.module.scss';
import { isValidFeedbackForm } from '../../utils/validations';
import { BASE_URL } from '../../utils/consts';
import ButtonSubmit from '../../components/ButtonSubmit/ButtonSubmit';
import Textarea from '../../components/Textarea/Textarea';
import SidebarFeedbackPage from '../../components/Sidebars/SidebarFeedbackPage/SidebarFeedbackPage';
import Input from '../../components/Input/Input';

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
                    <Input type='text' name="topic" id="topic" value={feedbackInfo.topic} onChange={handleInputs} label='Укажите тему обращения' required={true}/>
                    <Input type='email' name="email" id="email" value={feedbackInfo.email} onChange={handleInputs} label='Ваш адрес электронной почты' required={true}/>
                    <Textarea name='description' id='description' onChange={handleInputs} value={feedbackInfo.description} label='Текст вашего сообщения' required={true}/>
                    <ButtonSubmit>Отправить</ButtonSubmit>
                    </>
                )}
                {isSent && (
                    <p className={styles.feedback__thanks}>
                        Спасибо за обращение. С вами свяжутся в ближайшее время.
                    </p>
                )}
            </form>
            <SidebarFeedbackPage />
        </>
    )
}

export default FeedbackPage;