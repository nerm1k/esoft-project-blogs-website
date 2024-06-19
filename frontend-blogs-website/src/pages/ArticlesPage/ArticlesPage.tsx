import { useEffect, useState } from 'react';
import styles from './ArticlesPage.module.scss';
import { BASE_URL } from '../../utils/consts';

interface Article {
    article_id: number,
    username: string,
    title: string,
    content: string,
    category: number,
    views: number,
    likes: number,
    image: string,
    created_at: Date,
}

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchArticles() {
            setIsLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/articles`);
                const data = (await res.json()) as Article[];
                setArticles(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchArticles();
    }, []);

    console.log(articles);

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>Что-то пошло не так! Пожалуйста, обновите страницу.</div>
    }

    return(
        <>
            {isLoading && <div>Загрузка...</div>}
            {!isLoading && (
                <div>main article</div>
            )}
        </>
    )
}

export default ArticlesPage;