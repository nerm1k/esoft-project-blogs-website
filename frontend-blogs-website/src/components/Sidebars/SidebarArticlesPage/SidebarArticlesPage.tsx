import { Link } from 'react-router-dom';
import Advertisement from '../../Advertisement/Advertisement';
import { ArticleSidebar } from '../Sidebar/Sidebar';
import styles from './SidebarArticlesPage.module.scss';

interface SidebarArticlesPageProps {
    articles: ArticleSidebar[];
}

const SidebarArticlesPage = ({articles} : SidebarArticlesPageProps) => {
    return(
        <div className={styles.sidebar}>
            <div className={styles.advertisement}>
                <Advertisement />
            </div>
            <div className={styles.advertisement}>
                <Advertisement />
            </div>
            <div className={styles['sidebar__top-articles']}>
                <div className={styles['top-articles__title']}>Топ статей</div>
                <ul className={styles['top-articles__list']}>
                    {articles.map(article => (
                        <li key={article.article_id} className={styles['list__item']}>
                            <Link to={`/articles/${article.article_id}`} >
                                <p className={styles.item__title}>{article.title}</p>
                                <p className={styles.item__info}><span><i className="fa-solid fa-thumbs-up"></i>{article.likes}</span></p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SidebarArticlesPage;