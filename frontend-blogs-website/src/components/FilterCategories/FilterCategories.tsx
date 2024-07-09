import { useEffect, useState } from 'react';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import styles from './FilterCategories.module.scss';
import { BASE_URL } from '../../utils/consts';
import { useAppSelector } from '../../hooks/hooks';

interface Category {
    categoryID: number,
    name: string,
    description: string
}

interface FilterCategoriesProps {
    onClick: (category: string) => void,
    selectedCategory: string
}

const FilterCategories = ({onClick, selectedCategory}: FilterCategoriesProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [innerCurrentCategory, setInnerCurrentCategory] = useState<string>(selectedCategory);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(`${BASE_URL}/categories`);
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories();
    }, []);
    console.log(selectedCategory)
    return (
        <div className={styles.filter}>
            <p>Категория</p>
            <select name="category" id="category" value={innerCurrentCategory} onChange={(e) => setInnerCurrentCategory(e.target.value)}>
                <option value=""></option>
                {categories.map((category, i) => 
                    <option key={i} value={category.name}>{category.name}</option>
                )}
            </select>
            <button onClick={() => onClick(innerCurrentCategory)}>Искать</button>
        </div>
    )
};

export default FilterCategories;