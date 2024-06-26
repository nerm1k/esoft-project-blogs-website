import { useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import SidebarArticlesPage from '../SidebarArticlesPage/SidebarArticlesPage';
import SidebarFeedbackPage from '../SidebarFeedbackPage/SidebarFeedbackPage';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/consts';

export interface ArticleSidebar {
    article_id: number,
    title: string,
    likes: number
}

const Sidebar = () => {
    const location = useLocation();
    const [articles, setArticles] = useState<ArticleSidebar[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        window.scrollTo(0,0);
        
        async function fetchArticles() {
            setIsLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/articles?limit=10`);
                const data = (await res.json()) as ArticleSidebar[];
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
        <>
            {location.pathname == '/articles' && <SidebarArticlesPage articles={articles}/>}
            {location.pathname == '/feedback' && <SidebarFeedbackPage />}
        </>
    )
}

export default Sidebar;