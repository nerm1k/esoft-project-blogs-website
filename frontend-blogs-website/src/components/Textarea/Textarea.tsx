import { SyntheticEvent } from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps {
    name: string,
    id: string,
    onChange: (e: SyntheticEvent) => void,
    value: string
}

const Textarea = ({name, id, onChange, value} : TextareaProps) => {
    return(
        <>
            <textarea className={styles.textarea} name={name} id={id} onChange={onChange} value={value}></textarea>
        </>
    )
};

export default Textarea;