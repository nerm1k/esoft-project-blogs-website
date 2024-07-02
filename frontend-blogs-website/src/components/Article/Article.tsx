import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functions';
import styles from './Article.module.scss';

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
    }
}

const Article = ({article} : ArticleProps) => {
    return(
        <>
            <div className={styles['article-card']}>
                <div className={styles['article-card__info']}>
                    <h3 className={styles['article-card__title']}>
                        {article.title}
                    </h3>
                    <p className={styles['article-card__additional-info']}>
                        <Link to={`/users/${article.author}`}>
                            <span><i className="fa-solid fa-user"></i>{article.author}</span>
                        </Link>
                        <span><i className="fa-solid fa-eye"></i>{article.views}</span>
                        <span><i className="fa-solid fa-thumbs-up"></i>{article.likes}</span>
                        <span><i className="fa-regular fa-calendar-days"></i>{formatDate(article.created_at)}</span>
                        <span><i className="fa-solid fa-pen"></i>{formatDate(article.updated_at)}</span>
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
        </>
    )
};

export default Article;