import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('username', 32).unique().notNullable();
        table.string('email', 64).unique().notNullable();
        table.string('first_name', 32);
        table.string('last_name', 32);
        table.string('surname', 32);
        table.text('description');
        table.date('date_of_birth');
        table.string('password', 255).notNullable();
        table.string('status', 32);
        table.integer('rating').defaultTo(0);
        table.string('avatar', 255);
        table.boolean('is_admin').notNullable();
        table.timestamps(true, true);
    })
    .createTable('categories', (table) => {
        table.increments('category_id').primary();
        table.string('name', 32).unique().notNullable();
        table.text('description').notNullable();
    })
    .createTable('articles', (table) => {
        table.increments('article_id').primary();
        table.integer('user_id').notNullable();
        table.string('title', 255).notNullable();
        table.text('content').notNullable();
        table.integer('category_id').notNullable();
        table.integer('views').defaultTo(0);
        table.integer('likes').defaultTo(0);
        table.string('image', 255);
        table.timestamps(true, true);
        
        table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
        table.foreign('category_id').references('category_id').inTable('categories');
    })
    .createTable('articles_tags', (table) => {
        table.integer('article_id').notNullable();
        table.string('tag_name', 32).notNullable();

        table.foreign('article_id').references('article_id').inTable('articles').onDelete('CASCADE');
    })
    .createTable('comments', (table) => {
        table.increments('comment_id').primary();
        table.integer('user_id').notNullable();
        table.integer('article_id').notNullable();
        table.text('content').notNullable();
        table.integer('likes').defaultTo(0);
        table.timestamps(true, true);

        table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
        table.foreign('article_id').references('article_id').inTable('articles').onDelete('CASCADE');
    })
    .createTable('feedbacks', (table) => {
        table.increments('feedback_id').primary();
        table.string('sender_email', 64).notNullable();
        table.string('topic', 64).notNullable();
        table.text('description').notNullable();
        table.timestamps(true, true);
    })
    .createTable('comments_likes', (table) => {
        table.integer('comment_id').notNullable();
        table.integer('user_id').notNullable();
        table.timestamps(true, true);

        table.foreign('comment_id').references('comment_id').inTable('comments').onDelete('CASCADE');
        table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
    })
    .createTable('articles_likes', (table) => {
        table.integer('article_id').notNullable();
        table.integer('user_id').notNullable();
        table.timestamps(true, true);

        table.foreign('article_id').references('article_id').inTable('articles').onDelete('CASCADE');
        table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTableIfExists('articles_likes')
        .dropTableIfExists('comments_likes')
        .dropTableIfExists('comments')
        .dropTableIfExists('articles_tags')
        .dropTableIfExists('articles')
        .dropTableIfExists('categories')
        .dropTableIfExists('users')
        .dropTableIfExists('feedbacks');
}

