import { useEffect, useState } from 'react';
import styles from './ArticlesPage.module.scss';
import { BASE_URL } from '../../utils/consts';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Pagination, { maxPage, minPage } from '../../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCurrentPage } from '../../store/currentPageSlice';
import { setPagesAround } from '../../store/pagesAroundSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SidebarArticlesPage from '../../components/Sidebars/SidebarArticlesPage/SidebarArticlesPage';
import FilterCategories from '../../components/FilterCategories/FilterCategories';
import { setCurrentCategory } from '../../store/currentCategorySlice';

export interface ArticleCard {
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

const ArticlesPage = () => {
    const [articles, setArticles] = useState<ArticleCard[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.currentPage);
    const pagesAround = useAppSelector((state) => state.pagesAround);
    const currentCategory = useAppSelector((state) => state.currentCategory);

    // const [currentCategory, setCurrentCategory] = useState<string>('');

    const navigate = useNavigate();
    // const [searchParams, setSearchParams] = useSearchParams();
    // const pageSearchParam = Number(searchParams.get('page'));

    useEffect(() => {
        window.scrollTo(0,0);

        // if (pageSearchParam) {
        //     dispatch(setCurrentPage(pageSearchParam));
        // }

        async function fetchArticles() {
            setIsLoading(true);

            try {
                const res = await fetch(`${BASE_URL}/articles?page=${currentPage}&category=${currentCategory}`);
                const data = (await res.json()) as ArticleCard[];
                setArticles(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchArticles();
    }, [currentPage, currentCategory]);

    function handlePagination(type: 'next' | 'previous' | number): void {
        if (type == 'next') {
            if (currentPage + 1 < maxPage) {
                dispatch(setCurrentPage(currentPage + 1));
                dispatch(setPagesAround({
                    ...pagesAround,
                    previous: true
                }));
            } else {
                dispatch(setCurrentPage(20));
                dispatch(setPagesAround({
                    ...pagesAround,
                    next: false
                }));
            }
        }

        if (type == 'previous') {
            if (currentPage - 1 > minPage) {
                dispatch(setCurrentPage(currentPage - 1));
                dispatch(setPagesAround({
                    ...pagesAround,
                    next: true
                }));
            } else {
                dispatch(setCurrentPage(1));
                dispatch(setPagesAround({
                    ...pagesAround,
                    previous: false
                }));
            }
        }

        if (typeof type === 'number') {
            if (type > minPage && type < maxPage) {
                dispatch(setPagesAround({
                    previous: true,
                    next: true
                }))
            }
            dispatch(setCurrentPage(type));
            if (type == minPage) {
                dispatch(setPagesAround({
                    previous: false,
                    next: true
                }));
            };
            if (type == maxPage) {
                dispatch(setPagesAround({
                    previous: true,
                    next: false
                }));
            }
        }
    }

    function handleClickCategory(category: string): void{
        dispatch(setCurrentCategory(category));
        navigate(`/articles?page=${currentPage}&category=${category}`);
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
                        {currentPage < minPage || currentPage > maxPage && (
                            <div>Не найдено или устарело</div>
                        )}
                        <FilterCategories onClick={handleClickCategory} selectedCategory={currentCategory}/>
                        {articles.map(article => (
                            <ArticleCard key={article.article_id} article={article}/>
                        ))}
                        <Pagination onClick={handlePagination} pagesAround={pagesAround} page={currentPage} currentCategory={currentCategory}/>
                    </div>
                    <SidebarArticlesPage />
                </>
            )}
        </>
    )
}

export default ArticlesPage;