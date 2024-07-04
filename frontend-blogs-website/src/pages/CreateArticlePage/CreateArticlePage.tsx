import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import styles from './CreateArticlePage.module.scss';
import Textarea from '../../components/Textarea/Textarea';
import { BASE_URL } from '../../utils/consts';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { isNewPostFormValid } from '../../utils/validations';
import { useNavigate } from 'react-router-dom';
import ButtonSubmit from '../../components/ButtonSubmit/ButtonSubmit';

interface NewArticle {
    userID: number
    title: string,
    category: number,
    image?: File,
    content: string,
    tags: Set<string>
}

interface Category {
    categoryID: number,
    name: string,
    description: string
}

const CreateArticlePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, authenticatedUser } = useIsAuthenticated();
    const [tag, setTag] = useState('');
    // const [image, setImage] = useState<File>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [newArticle, setNewArticle] = useState<NewArticle>({
        userID: 0,
        title: '',
        category: 0,
        image: undefined,
        content: '',
        tags: new Set()
    });
    const [isValid, setIsValid] = useState(true);
    console.log(newArticle);
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

    function handleChange(e: SyntheticEvent): void {
        setIsValid(true);
        const target = e.target as HTMLInputElement;
        setNewArticle({
            ...newArticle,
            [target.name]: target.value
        });
    };

    function handleChangeImage(e: SyntheticEvent): void {
         setIsValid(true);
        const target = e.target as HTMLInputElement;
        if (target.files) {
            setNewArticle({
                ...newArticle,
                image: target.files[0]
            });
        };
    }

    function handleChangeTag(e: SyntheticEvent) {
        setIsValid(true);
        const target = e.target as HTMLInputElement;
        setTag(target.value);
    };

    function handleAddTag() {
        if (tag.length < 1) {
            return
        };

        setNewArticle({
            ...newArticle,
            tags: new Set([...newArticle.tags, tag])
        });

        setTag('');
    };

    function handleDeleteTag(tagToDelete: string) {
        setNewArticle({
            ...newArticle,
            tags: new Set([...newArticle.tags].filter(tag => tag !== tagToDelete))
        });
    };

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setNewArticle({
            ...newArticle,
            userID: authenticatedUser.user_id,
        });
        console.log(newArticle.image);
        const isValid = isNewPostFormValid(newArticle.userID, newArticle.title, newArticle.category, newArticle.content, newArticle.image);
        setIsValid(isValid);
        if (!isValid) {
            return
        } else {
            const formData = new FormData();
            formData.append('userID', newArticle.userID.toString());
            formData.append('title', newArticle.title);
            formData.append('category', newArticle.category.toString());
            formData.append('content', newArticle.content);
            if (newArticle.image) {
                // const reader = new FileReader();
                // reader.readAsDataURL(newArticle.image);
                // reader.onload = () => {
                //     formData.append('image', reader.result as string);
                // }
                formData.append('image', newArticle.image);
            }
           
            formData.append('tags', JSON.stringify(Array.from(newArticle.tags)));
            for (let p of formData) {
                console.log(p);
            }
            async function addPost() {
                try {
                    const res = await fetch(`${BASE_URL}/articles`, {
                        method: 'POST',
                        headers: {
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                            // 'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                        },
                        body: formData
                    });
                    if (res.status === 201) {
                        navigate(`/users/${authenticatedUser.username}`);
                        const data = await res.json();
                        console.log(data);
                    } else {
                        console.log('-');
                    }

                } catch (error) {
                    console.log(error);
                }
            };
    
            addPost();
        }
    };

    console.log(newArticle);
    console.log(tag);

    return(
        <form className={styles['create-article']} encType='multipart/form-data' onSubmit={handleSubmit}>
            <h3>Новый пост</h3>
            {!isValid && (
                <p className={styles['create-article__error']}>Заполните поля корректно</p>
            )}
            <label htmlFor="title">Заголовок:</label>
            <input type="text" name="title" id="title" onChange={handleChange} className={styles['create-article__title']}/>
            <label htmlFor="image">Изображение:</label>
            <input type="file" name="image" id="image" onChange={handleChangeImage} accept='image/jpeg, image/png' className={styles['create-article__image']} />
            <label htmlFor="category">Категория</label>
            <select name="category" id="category" defaultValue={0} onChange={handleChange} className={styles['create-article__category']}>
                <option value="0" disabled></option>
                {categories.map((category, i) => 
                    <option key={i} value={category.categoryID}>{category.name}</option>
                )}
            </select>
            <label htmlFor="tag">Теги</label>
            <div className={styles['create-article__tags']}>
                {[...newArticle.tags].map((tag, i) => (
                    <button key={i} type='button' onClick={() => handleDeleteTag(tag)} className={styles['create-article__delete']}>{tag} <i className="fa-solid fa-xmark"></i></button>
                ))}
                <input type="text" name="tag" id="tag" onChange={handleChangeTag} value={tag} className={styles['create-article__add-tag']}/>
                <button type='button' onClick={handleAddTag} className={styles['create-article__add-tag-btn']}>+</button>
            </div>
            <label htmlFor="content">Текст вашего поста:</label>
            <Textarea name='content' id='content' onChange={handleChange} value={newArticle.content} big={true}/>
            <ButtonSubmit>Добавить пост</ButtonSubmit>
        </form>
    )
};

export default CreateArticlePage;