import { FormEvent, useEffect, useState } from 'react';
import styles from './UserComments.module.scss';
import { BASE_URL } from '../../utils/consts';
import Comment from '../Comment/Comment';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

interface UserArticlesProps {
    username?: string
}

interface Comment {
    comment_id: number,
    author: string,
    content: string,
    likes: number,
    updated_at: Date
}

const UserComments = ({username}: UserArticlesProps) => {
    const { isAuthenticated, authenticatedUser } = useIsAuthenticated();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [updater, setUpdater] = useState(0);

    useEffect(() => {
        async function fetchCommentsByUsername() {
            setIsLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/users/${username}/comments`);
                const data = (await res.json()) as Comment[];
                setComments(data);
                console.log(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCommentsByUsername();
    }, [updater]);

    if (isLoading) {
        return <div>Загрузка...</div>
    };

    if (error) {
        return <div>Что-то пошло не так! Пожалуйста, обновите страницу.</div>
    };

    function handleDeleteArticle(commentID: number, e: FormEvent) {
        e.preventDefault();
        async function deleteArticle() {
            try {
                const res = await fetch(`${BASE_URL}/comments/${commentID}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                });
                if (res.status === 204) {
                    console.log('+');
                    setUpdater(prev => prev + 1);
                } else {
                    console.log('-');
                }
            } catch (error) {
                console.log(error);
            }
        };

        deleteArticle();
    };

    return (
        <div className={styles.comments}>
            {comments.length < 1 && (
                <p className={styles['no-articles']}>У пользователя отсутствуют комментарии</p>
            )}
            {comments.map(comment => (
                <Comment key={comment.comment_id} comment={comment} interactive={false} handleDeleteArticle={handleDeleteArticle} deletable={authenticatedUser.username == username} isAuthenticated={isAuthenticated}/>
            ))}
        </div>
    )
};

export default UserComments;