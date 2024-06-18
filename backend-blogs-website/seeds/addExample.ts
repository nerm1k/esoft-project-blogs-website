import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("categories").del();
    await knex("users").del();
    await knex("posts").del();
    await knex("comments").del();
    await knex("posts_tags").del();

    // Inserts seed entries
    await knex("categories").insert([
        { 
            category_id: 1,
            name: "Биология",
            description: "Все о окружающем нас мире."
        },
        { 
            category_id: 2,
            name: "Космос",
            description: "Космос Космос Космос Космос Космос Космос Космос Космос."
        },
        { 
            category_id: 3,
            name: "География",
            description: "Политика и не только." 
        },
    ]);

    await knex('users').insert([
        {
            user_id: 1,
            username: 'Roman',
            email: 'roman@mail.ru',
            password: 'r12345678',
            is_admin: true
        },
        {
            user_id: 2,
            username: 'Egorio6432',
            email: 'egoregor@gmail.com',
            password: 'e12345678',
            is_admin: false
        },{
            user_id: 3,
            username: '99oleg',
            email: 'qwerty123@mail.ru',
            password: 'o12345678',
            is_admin: false
        },
    ]);

    await knex('posts').insert([
        {
            post_id: 1,
            user_id: 2,
            title: 'Ученые разгадали тайну марианской впадины',
            content: 'Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст Длинный текст',
            category_id: 3
        },
        {
            post_id: 2,
            user_id: 2,
            title: 'Почему Россия такая большая?',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo rhoncus nunc porta porta. Cras sed nulla sed dolor accumsan congue eget quis neque. Phasellus vitae cursus ligula. Suspendisse vehicula in magna aliquam pretium. Suspendisse imperdiet condimentum dolor, vitae congue purus eleifend at. Vestibulum interdum massa ac augue elementum, quis vulputate sem consectetur. Pellentesque at accumsan purus. Nam malesuada posuere dui, vitae maximus nibh mattis eget. In lorem diam, finibus non lectus eu, volutpat scelerisque nibh. Nulla sit amet diam vel turpis faucibus bibendum. Aenean aliquet tristique sapien eu efficitur. Nullam porttitor sapien id justo efficitur facilisis. Donec in dolor ac nibh bibendum tristique et in arcu. Suspendisse lorem sem, aliquam varius lobortis nec, tristique ac leo',
            category_id: 3
        },
        {
            post_id: 3,
            user_id: 3,
            title: 'На Землю летит метеорит',
            content: 'Да, летит.',
            category_id: 2
        }
    ]);

    await knex('posts_tags').insert([
        {
            post_id: 1,
            tag_name: 'Глубина'
        },
        {
            post_id: 1,
            tag_name: 'жесть'
        },
        {
            post_id: 1,
            tag_name: 'окена'
        },
        {
            post_id: 1,
            tag_name: 'Темнота'
        },
        {
            post_id: 1,
            tag_name: 'ученые'
        },
        {
            post_id: 3,
            tag_name: 'AJR-3242'
        },
        {
            post_id: 3,
            tag_name: '#намконец'
        }, 
    ]);

    await knex('comments').insert([
        {
            comment_id: 1,
            user_id: 1,
            post_id: 1,
            content: 'Крутой пост!'
        },
        {
            comment_id: 2,
            user_id: 1,
            post_id: 2,
            content: 'снова крутой пост'
        },
        {
            comment_id: 3,
            user_id: 2,
            post_id: 1,
            content: 'очень интересно, спасбио.'
        },
        {
            comment_id: 4,
            user_id: 2,
            post_id: 2,
            content: 'не согласен, + много воды в тексте.'
        },
    ]);
};