import styles from './ArticlePage.module.scss';
import { Article } from '../../pages/ArticlesPage/ArticlesPage';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/consts';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/functions';


const ArticlePage = () => {
    const {articleId} = useParams();
    const [article, setArticle] = useState<Article>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);

        async function fetchArticles() {
            setIsLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/articles/${articleId}`);
                const data = (await res.json()) as Article;
                setArticle(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchArticles();
    }, []);

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>Что-то пошло не так! Пожалуйста, обновите страницу.</div>
    }
    if (article) console.log(article.image);

    return(
        <>
            {article && (
                <div className={styles['container__article']}>
                    <div className={styles['article-card']}>
                        <div className={styles['article-card__info']}>
                            <h3 className={styles['article-card__title']}>
                                {article.title}
                            </h3>
                            <p className={styles['article-card__additional-info']}>
                                <span><i className="fa-solid fa-user"></i>{article.author}</span>
                                <span><i className="fa-solid fa-eye"></i>{article.views}</span>
                                <span><i className="fa-solid fa-thumbs-up"></i>{article.likes}</span>
                                <span><i className="fa-regular fa-calendar-days"></i>{formatDate(article.created_at)}</span>
                            </p>
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
                    <div className={styles.container_comments}>
                        comments
                    </div>
                </div>
            )}
        </>
    )
}

export default ArticlePage;