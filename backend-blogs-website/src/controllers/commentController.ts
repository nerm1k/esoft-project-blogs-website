import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/enums";
import CommentService from "../services/commentService";

export default class CommentController {
    commentService: CommentService;

    constructor(commentService: CommentService) {
        this.commentService = commentService;
    }

    getCommentsByArticleID = async (req: Request, res: Response) => {
        try {
            const articleID = req.params.id;
            const comments = await this.commentService.getCommentsByArticleID(+articleID);
            res.status(HttpStatusCode.OK).json(comments);
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    addComment = async (req: Request, res: Response) => {
        try {
            const articleID = req.params.id;
            const { content, user } = req.body;
            const comment = await this.commentService.addComment(+articleID, user.user_id, content);
            res.status(HttpStatusCode.CREATED).json({ message: 'Comment added', comment: comment});
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    likeComment = async (req: Request, res: Response) => {
        try {
            const commentID = req.params.commentID;
            const user = req.body.user;
            const comment = await this.commentService.likeComment(+commentID, user.user_id);
            res.status(HttpStatusCode.CREATED).json({ message: 'Comment has been liked', comment: comment });
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    getCommentsByUsername = async (req: Request, res: Response) => {
        try {
            const username = req.params.username;
            const comments = await this.commentService.getCommentsByUsername(username);
            res.status(HttpStatusCode.OK).json(comments);
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error});
        }
    }

    deleteCommentByCommentID = async (req: Request, res: Response) => {
        try {
            const commentID = req.params.commentID;
            await this.commentService.deleteCommentByCommentID(+commentID);
            res.sendStatus(HttpStatusCode.NO_CONTENT);
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error ' });
        }
    }
}