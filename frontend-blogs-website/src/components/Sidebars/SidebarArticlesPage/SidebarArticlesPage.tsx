import { Link } from 'react-router-dom';
import Advertisement from '../../Advertisement/Advertisement';
import styles from './SidebarArticlesPage.module.scss';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/consts';

interface SidebarArticles {
    article_id: number,
    title: string,
    likes: number
}

const SidebarArticlesPage = () => {
    const [articles, setArticles] = useState<SidebarArticles[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        window.scrollTo(0,0);
        
        async function fetchArticles() {
            setIsLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/articles?limit=10`);
                const data = (await res.json()) as SidebarArticles[];
                setArticles(data);
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

    return(
        <div className={styles.sidebar}>
            <Advertisement />
            <Advertisement />
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