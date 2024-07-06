import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functions';
import styles from './Article.module.scss';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { FormEvent, useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/consts';

interface ArticleProps {
    article: {
        article_id: number,
        author: string,
        title: string,
        content: string,
        category: number,
        views: number,
        tags: string[],
        likes: number,
        image: string,
        created_at: Date,
        updated_at: Date
    },
    updater?: React.Dispatch<React.SetStateAction<number>>
}

const Article = ({article, updater} : ArticleProps) => {
    const {isAuthenticated, authenticatedUser} = useIsAuthenticated();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        async function likeArticle() {
            try {
                const res = await fetch(`${BASE_URL}/articles/${article.article_id}/likes`, {
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
        
        likeArticle();
    }

    return(
        <>
            <div className={styles['article-card']}>
                <div className={styles['article-card__info']}>
                    <h3 className={styles['article-card__title']}>
                        {article.title}
                    </h3>
                    <div className={styles['article-card__additional-info']}>
                        <Link to={`/users/${article.author.toLowerCase()}`}>
                            <span><i className="fa-solid fa-user"></i>{article.author}</span>
                        </Link>
                        <span><i className="fa-solid fa-eye"></i>{article.views}</span>
                        {isAuthenticated && (
                            <form onSubmit={handleSubmit} className={styles['article-card__form']}>
                                <button type='submit'><span><i className="fa-solid fa-thumbs-up"></i>{article.likes}</span></button>
                            </form>
                        )}
                        {!isAuthenticated && (
                            <span><i className="fa-solid fa-thumbs-up"></i>{article.likes}</span>
                        )}
                        <span><i className="fa-regular fa-calendar-days"></i>{formatDate(article.created_at)}</span>
                        <span><i className="fa-solid fa-pen"></i>{formatDate(article.updated_at)}</span>
                    </div>
                    {article.tags.length > 1 && (
                        <p className={styles['article-card__tags']}>
                            {article.tags.map(tag => 
                                <span key={tag}>{tag}</span>
                            )}
                        </p>
                    )}
                    {article.image && (
                        <div className={styles['article-card__image']}>
                            <img src={article.image} alt="" />
                        </div>
                    )}
                    <p className={styles['article-card__content']}>
                        {article.content}
                    </p>
                </div>
            </div> 
        </>
    )
};

export default Article;