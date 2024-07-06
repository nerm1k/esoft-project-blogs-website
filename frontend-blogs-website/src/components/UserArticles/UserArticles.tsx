import { FormEvent, useEffect, useState } from "react";
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
    const [updater, setUpdater] = useState(0);

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
    }, [updater]);

    function handleDeleteArticle(articleID: number, e: FormEvent) {
        e.preventDefault();
        async function deleteArticle() {
            try {
                const res = await fetch(`${BASE_URL}/articles/${articleID}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                });
                if (res.status === 204) {
                    console.log('+');
                    setUpdater(prev => prev + 1);
                } else {
                    console.log('-');
                }
            } catch (error) {
                console.log(error);
            }
        };

        deleteArticle();
    }

    return (
        <div>
            {articles.length < 1 && (
                <p className={styles['no-articles']}>У пользователя отсутствуют публикации</p>
            )}
            {articles.map(article => (
                <ArticleCard key={article.article_id} article={article} handleDeleteArticle={handleDeleteArticle}/>
            ))}
        </div>
    )
};

export default UserArticles;