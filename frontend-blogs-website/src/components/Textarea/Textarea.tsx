import { SyntheticEvent } from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps {
    name: string,
    id: string,
    onChange: (e: SyntheticEvent) => void,
    value: string,
    label?: string,
    big?: boolean,
    required?: boolean
}

const Textarea = ({name, id, onChange, value, label, big, required} : TextareaProps) => {
    return(
        <>
            <label htmlFor={id} className={styles['textarea-label']}>{required && (<span className={styles['textarea-span']}>*</span>)}{label}</label>
            <textarea className={`${styles.textarea} ${big ? styles.big : ''}`} name={name} id={id} onChange={onChange} value={value}></textarea>
        </>
    )
};

export default Textarea;