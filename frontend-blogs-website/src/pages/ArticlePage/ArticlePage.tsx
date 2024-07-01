import styles from './ArticlePage.module.scss';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/consts';
import { useParams } from 'react-router-dom';
import Article from '../../components/Article/Article';
import Comments from '../../components/Comments/Comments';

interface Article {
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
                if (res.status !== 404) {
                    const data = (await res.json()) as Article;
                    setArticle(data);
                }
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
        <>
            {article && (
                <div className={styles['container__article']}>
                    <Article article={article} />
                    <div className={styles.container_comments}>
                        <Comments articleID={article.article_id}/>
                    </div>
                </div>
            )}
            {!article && (
                <p>not found</p>
            )}
        </>
    )
}

export default ArticlePage;