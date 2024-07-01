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
        const comment = await this.commentModel.insertComment(articleID, userID, content);
        return comment;
    }

    async likeComment(commentID: number) {
        const comment = await this.commentModel.insertLikesByCommentID(commentID);
        return comment;
    }
}