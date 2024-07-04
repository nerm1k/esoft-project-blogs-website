import { SyntheticEvent } from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps {
    name: string,
    id: string,
    onChange: (e: SyntheticEvent) => void,
    value: string,
    big?: boolean
}

const Textarea = ({name, id, onChange, value, big} : TextareaProps) => {
    return(
        <>
            <textarea className={`${styles.textarea} ${big ? styles.big : ''}`} name={name} id={id} onChange={onChange} value={value}></textarea>
        </>
    )
};

export default Textarea;