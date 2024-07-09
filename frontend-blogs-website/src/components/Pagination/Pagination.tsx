import { Link } from 'react-router-dom';
import styles from './Pagination.module.scss';

interface PaginationProps {
    onClick: (type: 'next' | 'previous' | number) => void
    pagesAround: {
        next: boolean,
        previous: boolean
    },
    page: number,
    currentCategory?: string
}

export const maxPage = 20;
export const minPage = 1;

const Pagination = ({onClick, pagesAround, page, currentCategory} : PaginationProps) => {
    const aboveMinBy2AndBelowMaxBy2 = page >= minPage + 2 && page <= maxPage - 2;

    return(
        <div className={styles.pagination}>
            <Link to={`/articles?page=${page - 1}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick('previous')} className={`${styles.pagination__item} ${!pagesAround.previous && styles['pagination__item--disabled']}`}>
                Назад
            </Link>
            <div className={`${styles.pagination__item} ${styles.pagination__list}`}>
                <Link to={`/articles?page=${minPage}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick(minPage)}>
                    <div className={`${styles.list__page} ${page == minPage && styles['list__page--active']}`}>{minPage}</div>
                </Link>
                <Link to={`/articles?page=${minPage + 1}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick(minPage + 1)}>
                    <div className={`${styles.list__page} ${page == minPage + 1 && styles['list__page--active']}`}>{minPage + 1}</div>
                </Link>
                {aboveMinBy2AndBelowMaxBy2 && (
                    <>
                        {![minPage + 2, minPage + 3, minPage + 4].includes(page) && (
                             <div className={styles.list__page}>...</div>
                        )}
                        {![minPage + 2, minPage + 3].includes(page) && (
                            <Link to={`/articles?page=${page - 2}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick(page - 2)}>
                                <div className={`${styles.list__page}`}>{page - 2}</div>
                            </Link>
                        )}
                        {page != minPage + 2 && (
                            <Link to={`/articles?page=${page - 1}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick(page - 1)}>
                                <div className={`${styles.list__page}`}>{page - 1}</div>
                            </Link>
                        )}
                        <Link to={`/articles?page=${page}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick(page)}>
                            <div className={`${styles.list__page} ${styles['list__page--active']}`}>{page}</div>
                        </Link>
                        {![maxPage - 2, maxPage - 1].includes(page) && (
                            <Link to={`/articles?page=${page + 1}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick(page + 1)}>
                                <div className={`${styles.list__page}`}>{page + 1}</div>
                            </Link>
                        )}
                        {![maxPage - 3, maxPage - 2, maxPage - 1].includes(page) && (
                            <Link to={`/articles?page=${page + 2}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick(page + 2)}>
                                <div className={`${styles.list__page}`}>{page + 2}</div>
                            </Link>
                        )}
                    </>
                )}
                {![maxPage - 4, maxPage - 3, maxPage - 2].includes(page) && (
                    <div className={styles.list__page}>...</div>
                )}
                <Link to={`/articles?page=${maxPage - 1}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick(maxPage - 1)}>
                    <div className={`${styles.list__page} ${page == maxPage - 1 && styles['list__page--active']}`}>{maxPage - 1}</div>
                </Link>
                <Link to={`/articles?page=${maxPage}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick(maxPage)}>
                    <div className={`${styles.list__page} ${page == maxPage && styles['list__page--active']}`}>{maxPage}</div>
                </Link>
            </div>
            <Link to={`/articles?page=${page + 1}${currentCategory && `&category=${currentCategory}`}`} onClick={() => onClick('next')} className={`${styles.pagination__item} ${!pagesAround.next && styles['pagination__item--disabled']}`}>
                Вперед
            </Link>
        </div>
    )
}

export default Pagination;