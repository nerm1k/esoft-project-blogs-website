import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/enums";
import UserService from "../services/userService";

export default class UserController {
    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    registerUser = async (req: Request, res: Response) => {
        try {
            const {username, email, password} = req.body;
            const user = await this.userService.registerUser(username, email, password);

            if (user) {
                res.status(HttpStatusCode.CREATED).json({ message: 'User registered', user: user});
            } else {
                res.status(HttpStatusCode.CONFLICT).json({ message: 'User has already been registered' });
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    loginUser = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const user = await this.userService.loginUser(username, password);

            if (user == undefined) {
                res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User does not exist' });
            } else if (user == 401) {
                res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Invalid credentials' });
            } else {
                // res.cookie('token', user.jwtToken, {httpOnly: true});
                res.status(HttpStatusCode.OK).json({ message: 'Logged in', jwtToken: user.jwtToken});
            } 
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    logout = async (req: Request, res: Response) => {
        res.json({ message: 'Logged out' });
    }

    getUserByUsername = async (req: Request, res: Response) => {
        try { 
            const username  = req.params.username;
            const user = await this.userService.getUserByUsername(username);
            if (user) {
                res.status(HttpStatusCode.OK).json(user);
            } else {
                res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Not Found'});
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    updateUserByUserID = async (req: Request, res: Response) => {
        try {
            const userID = req.params.userID;
            const { firstName, lastName, surname, description, dateOfBirth } = req.body;
            const avatarName = req.file?.filename;
            console.log(req.file);
            await this.userService.updateUserByUserID(+userID, firstName, lastName, surname, description, dateOfBirth, avatarName);
            res.sendStatus(HttpStatusCode.NO_CONTENT);
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error '});
        }
    }

    updateUsernameByUserID = async (req: Request, res: Response) => {
        try {
            const userID = req.params.userID;
            const { username } = req.body;
            const isUpdated= await this.userService.updateUsernameByUserID(+userID, username);
            if (!isUpdated) {
                res.status(400).json({ message: 'Canceled' });
            } else {
                res.sendStatus(HttpStatusCode.NO_CONTENT);
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error '});
        }
    }

    updateEmailByUserID = async (req: Request, res: Response) => {
        try {
            const userID = req.params.userID;
            const { email } = req.body;
            const isUpdated = await this.userService.updateEmailByUserID(+userID, email);
            if (!isUpdated) {
                res.status(400).json({ message: 'Canceled' });
            } else {
                res.sendStatus(HttpStatusCode.NO_CONTENT);
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error '});
        }
    }

    updatePasswordByUserID = async (req: Request, res: Response) => {
        try {
            const userID = req.params.userID;
            const { password } = req.body;
            const isUpdated = await this.userService.updatePasswordByUserID(+userID, password);
            if (!isUpdated) {
                res.status(400).json({ message: 'Canceled' });
            } else {
                res.sendStatus(HttpStatusCode.NO_CONTENT);
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error '});
        }
    }
}