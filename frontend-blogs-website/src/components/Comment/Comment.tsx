import { FormEvent } from 'react';
import { formatDate } from '../../utils/functions';
import styles from './Comment.module.scss';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { BASE_URL } from '../../utils/consts';

interface CommentProps {
    comment: {
        comment_id: number,
        author: string,
        content: string,
        likes: number,
        updated_at: Date
    }
    articleID?: number,
    updater?: React.Dispatch<React.SetStateAction<number>>,
    interactive: boolean,
    handleDeleteArticle?: (commentID: number, e: FormEvent) => void
}

const Comment = ({comment, articleID, updater, interactive, handleDeleteArticle}: CommentProps) => {
    const {isAuthenticated, authenticatedUser} = useIsAuthenticated();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        async function likeComment() {
            try {
                const res = await fetch(`${BASE_URL}/articles/${articleID}/comments/${comment.comment_id}/likes`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                      },
                });
                await res.json();
                if (updater) {
                    updater(prev => prev + 1);
                }
            } catch (error) {
                console.log(error);
            }
        }

        likeComment();
    }

    return(
        <div className={styles.comment}>
            <div className={styles.comment__info}>
                <div>
                    <i className="fa-solid fa-user"></i><span className={styles.comment__author}>{comment.author}</span><span>{formatDate(comment.updated_at)}</span>
                    {(isAuthenticated && interactive) && (
                        <form className={styles.comment__form} onSubmit={handleSubmit}>
                            <button type='submit'><span><i className="fa-solid fa-thumbs-up"></i>{comment.likes}</span></button>
                        </form>
                    )}
                    {(!isAuthenticated || !interactive )&& (
                        <span><i className="fa-solid fa-thumbs-up"></i>{comment.likes}</span>
                    )}
                </div>
                <div className={styles.delete}>
                    {handleDeleteArticle && (
                        <form onSubmit={(e) => handleDeleteArticle(comment.comment_id, e)}>
                            <button className={styles.delete__button} type='submit'><i className="fa-solid fa-xmark"></i></button>
                        </form>
                    )}
                </div>
            </div>
            <p className={styles.comment__content}>{comment.content}</p>
        </div>
    )
};

export default Comment;