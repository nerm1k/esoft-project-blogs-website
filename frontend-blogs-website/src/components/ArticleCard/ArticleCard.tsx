import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functions';
import styles from './ArticleCard.module.scss';
import { FormEvent } from 'react';

interface ArticleCardProps {
    article : {
        article_id: number,
        author: string,
        title: string,
        content: string,
        category: number,
        views: number,
        tags?: string[],
        likes: number,
        image?: string,
        created_at: Date,
    },
    handleDeleteArticle?: (articleID: number, e: FormEvent) => void,
    deletable?: boolean
}

const ArticleCard = ({article, handleDeleteArticle, deletable}: ArticleCardProps) => {
    if (article.content.length > 250) {
        article.content = article.content.slice(0, 250) + '...';
    }

    const created_at = formatDate(article.created_at);

    return(
        <div className={styles['article-card']}>
            {article.image && (
                <>
                    <div className={styles['article-card__background']}>
                        <img src={article.image} alt="" />
                    </div>
                    <div className={styles['article-card__head']}></div>
                </>
            )} 
            <div className={styles['article-card__info']}>
                <h3 className={styles['article-card__title']}>
                    {article.title}
                    {(handleDeleteArticle && deletable) && (
                        <form onSubmit={(e) => handleDeleteArticle(article.article_id, e)}>
                            <button type='submit'><i className="fa-solid fa-xmark"></i></button>
                        </form>
                    )}
                </h3>
                <p className={styles['article-card__additional-info']}>
                    <Link to={`/users/${article.author.toLocaleLowerCase()}`}>
                        <span><i className="fa-solid fa-user"></i>{article.author}</span>
                    </Link>
                    <span><i className="fa-solid fa-layer-group"></i>{article.category}</span>
                    <span><i className="fa-solid fa-eye"></i>{article.views}</span>
                    <span><i className="fa-solid fa-thumbs-up"></i>{article.likes}</span>
                    <span><i className="fa-regular fa-calendar-days"></i>{created_at}</span>
                </p>
                {(article.tags && article.tags.length > 1) && (
                    <p className={styles['article-card__tags']}>
                        {article.tags.map(tag => 
                            <span key={tag}>{tag}</span>
                        )}
                    </p>
                )}
                <p className={styles['article-card__content']}>
                    {article.content}
                </p>
                <Link to={`/articles/${article.article_id}`}>
                    <div className={styles.btn}>
                        <i className="fa-solid fa-arrow-right-long"></i>
                        Читать далее
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ArticleCard;