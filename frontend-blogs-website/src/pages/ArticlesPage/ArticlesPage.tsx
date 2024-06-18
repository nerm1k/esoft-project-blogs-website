import { useEffect, useState } from 'react';
import styles from './ArticlesPage.module.scss';

const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const res = await fetch('http://localhost:3000/articles');
                const data = await res.json();
                setArticles(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchArticles();
    }, []);

    console.log(articles);

    return(
        <>
            main articles
        </>
    )
}

export default ArticlesPage;