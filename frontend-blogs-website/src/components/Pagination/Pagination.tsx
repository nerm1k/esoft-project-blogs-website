import { Link } from 'react-router-dom';
import styles from './Pagination.module.scss';

interface PaginationProps {
    onClick: (type: 'next' | 'previous') => void
    pagesAround: {
        next: boolean,
        previous: boolean
    },
    page: number
}

const Pagination = ({onClick, pagesAround, page} : PaginationProps) => {
    return(
        <div className={styles.pagination}>
            <Link to={`/articles?page=${page - 1}`} onClick={() => onClick('previous')} className={`${styles.pagination__item} ${!pagesAround.previous && styles['pagination__item--disabled']}`}>
                Назад
            </Link>
            <div className={`${styles.pagination__item} ${styles.pagination__list}`}>
                <div className={`${styles.list__page} ${page == 1 && styles['list__page--active']}`}>1</div>
                <div className={`${styles.list__page} ${page == 2 && styles['list__page--active']}`}>2</div>
                <div className={`${styles.list__page} ${page == 3 && styles['list__page--active']}`}>3</div>
                <div className={styles.list__page}>...</div>
                <div className={`${styles.list__page} ${page == 19 && styles['list__page--active']}`}>19</div>
                <div className={`${styles.list__page} ${page == 20 && styles['list__page--active']}`}>20</div>
            </div>
            <Link to={`/articles?page=${page + 1}`} onClick={() => onClick('next')} className={`${styles.pagination__item} ${!pagesAround.next && styles['pagination__item--disabled']}`}>
                Вперед
            </Link>
        </div>
    )
}

export default Pagination;