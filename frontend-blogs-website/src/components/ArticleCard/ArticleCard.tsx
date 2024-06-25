import { Link } from 'react-router-dom';
import { Article } from '../../pages/ArticlesPage/ArticlesPage';
import { formatDate } from '../../utils/functions';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({article}: ArticleCardProps) => {
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
                </h3>
                <p className={styles['article-card__additional-info']}>
                    <span><i className="fa-solid fa-user"></i>{article.author}</span>
                    <span><i className="fa-solid fa-eye"></i>{article.views}</span>
                    <span><i className="fa-solid fa-thumbs-up"></i>{article.likes}</span>
                    <span><i className="fa-regular fa-calendar-days"></i>{created_at}</span>
                </p>
                {article.tags.length > 1 && (
                    <p className={styles['article-card__tags']}>
                        {article.tags.map(tag => 
                            <span key={tag}>{tag}</span>
                        )}
                    </p>
                )}
                <p className={styles['article-card__content']}>
                    {article.content}
                </p>
                <Link to={`./${article.article_id}`}>
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