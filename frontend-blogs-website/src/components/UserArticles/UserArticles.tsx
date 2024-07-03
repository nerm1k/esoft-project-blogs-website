import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/consts";
import ArticleCard from "../ArticleCard/ArticleCard";
import styles from './UserArticles.module.scss';

interface UserArticlesProps {
    username?: string
}

interface ArticleCard {
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
}

const UserArticles = ({ username }: UserArticlesProps) => {
    const [articles, setArticles] = useState<ArticleCard[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchArticlesByUsername() {
            setIsLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/users/${username}/articles`);
                const data = (await res.json()) as ArticleCard[];
                setArticles(data);
                console.log(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchArticlesByUsername();
    }, []);

    return (
        <div>
            {articles.length < 1 && (
                <p className={styles['no-articles']}>У пользователя отсутствуют публикации</p>
            )}
            {articles.map(article => (
                <ArticleCard key={article.article_id} article={article}/>
            ))}
        </div>
    )
};

export default UserArticles;