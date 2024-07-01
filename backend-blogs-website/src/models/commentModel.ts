import knex from "knex";

const pool = knex(require('../../knexfile'));

interface Comment {
    commentID: number,
    author: string,
    content: string,
    likes: number,
    updated_at: Date
};

export default class CommentModel {
    async getCommentsByArticleID(articleID: number) {
        const comments: Comment[] = await pool('comments')
                                .select('comment_id', 'username as author', 'content', 'likes', 'comments.updated_at')
                                .join('users', 'comments.user_id', 'users.user_id')
                                .where('article_id', '=', articleID)
                                .orderBy('comments.created_at');
        
        return comments;
    }

    async insertComment(articleID: number, userID: number, content: string) {
        const comment: Comment = await pool('comments')
                                        .insert({article_id: articleID, user_id: userID, content: content})
                                        .returning(['comment_id', 'user_id as author', 'content', 'likes', 'updated_at']);
        return comment;
    }

    async insertLikesByCommentID(commentID: number) {
        const comment: Comment = await pool('comments')
                                        .where('comment_id', '=', commentID)
                                        .increment('likes', 1)
                                        .returning(['comment_id', 'user_id as author', 'content', 'likes', 'updated_at']);
        return comment;
    }
}