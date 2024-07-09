import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { BASE_URL } from "../../utils/consts";
import Comment from "../Comment/Comment";
import styles from './Comments.module.scss';
import useIsAuthenticated from "../../hooks/useIsAuthenticated";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import Textarea from "../Textarea/Textarea";

interface CommentsProps {
    articleID: number
}

interface Comment {
    comment_id: number,
    author: string,
    content: string,
    likes: number,
    updated_at: Date
}

interface CommentForm {
    content: string
}

const Comments = ({articleID}: CommentsProps) => {
    const {isAuthenticated, authenticatedUser} = useIsAuthenticated();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [commentForm, setCommentForm] = useState<CommentForm>({
        content: ''
    });
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        async function fetchComments() {
            setIsLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/articles/${articleID}/comments`);
                const data = (await res.json()) as Comment[];
                setComments(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchComments();
    }, [update]);

    function handleChange(e: SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        setCommentForm({
            ...commentForm,
            [target.name]: target.value
        })
    };

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (commentForm.content.length > 0) {
            async function addComment() {
                try {
                    const res = await fetch(`${BASE_URL}/articles/${articleID}/comments`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                          },
                        body: JSON.stringify(commentForm),
                    });
                    await res.json();
                    setUpdate(prev => prev + 1);
                } catch (error) {
                    console.log(error);
                }
            };
    
            addComment();
            setCommentForm({
                content: ''
            })
        }
    };

    return (
        <>
            <h3 className={styles.comments__title}>Комментарии <span>{comments.length}</span></h3>
            <div className={styles.comments__container}>
                {comments.map((comment, i) => 
                    <Comment key={i} comment={comment} articleID={articleID} updater={setUpdate} interactive={true} isAuthenticated={isAuthenticated}/>
                )}
            </div>
            {isAuthenticated && (
                <form className={styles.comments__add} onSubmit={handleSubmit}>
                    <label htmlFor="content">Ваш комментарий</label>
                    <Textarea name='content' id='content' value={commentForm.content} onChange={handleChange}/>
                    <ButtonSubmit>Отправить</ButtonSubmit>
                </form>
            )}
        </>  
    )
};

export default Comments;