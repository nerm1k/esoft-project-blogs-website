import { useEffect, useState } from 'react';
import styles from './ArticlesPage.module.scss';
import { BASE_URL } from '../../utils/consts';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Pagination from '../../components/Pagination/Pagination';

export interface Article {
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
}

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesAround, setPagesAround] = useState({
        previous: false,
        next: true
    });

    useEffect(() => {
        window.scrollTo(0,0);
        
        async function fetchArticles() {
            setIsLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/articles?page=${currentPage}`);
                const data = (await res.json()) as Article[];
                setArticles(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchArticles();
    }, [currentPage]);

    function handlePagination(type: 'next' | 'previous'): void {
        if (type == 'next') {
            if (currentPage + 1 < 21) {
                setCurrentPage(prev => prev += 1);
                setPagesAround({
                    ...pagesAround,
                    previous: true
                });
            } else {
                setCurrentPage(20);
                setPagesAround({
                    ...pagesAround,
                    next: false
                });
            }
        }

        if (type == 'previous') {
            if (currentPage - 1 > 0) {
                setCurrentPage(prev => prev -= 1);
                setPagesAround({
                    ...pagesAround,
                    next: true
                })
            } else {
                setCurrentPage(1);
                setPagesAround({
                    ...pagesAround,
                    previous: false
                });
            }
        }
    }

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
                <>
                    <div className={styles.container__articles}>
                        {articles.map(article => (
                            <ArticleCard key={article.article_id} article={article}/>
                        ))}
                        <Pagination onClick={handlePagination} pagesAround={pagesAround} page={currentPage}/>
                    </div>
                </>
            )}
        </>
    )
}

export default ArticlesPage;