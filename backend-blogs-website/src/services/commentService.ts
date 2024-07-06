import CommentModel from "../models/commentModel";

export default class CommentService {
    commentModel: CommentModel;

    constructor(commentModel: CommentModel) {
        this.commentModel = commentModel;
    }

    async getCommentsByArticleID(articleID: number) {
        const comments = await this.commentModel.getCommentsByArticleID(articleID);
        return comments;
    }

    async addComment(articleID: number, userID: number, content: string) {
        const comment = await this.commentModel.createComment(articleID, userID, content);
        return comment;
    }

    async likeComment(commentID: number, userID: number) {
        const comment = await this.commentModel.updateLikesByCommentID(commentID, userID);
        return comment;
    }

    async getCommentsByUsername(username: string) {
        const comments = await this.commentModel.getCommentsByUsername(username.toLocaleLowerCase());
        return comments;
    }

    async deleteCommentByCommentID(commentID: number) {
        await this.commentModel.deleteCommentByCommentID(commentID);
    }
}