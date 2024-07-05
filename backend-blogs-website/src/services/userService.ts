import UserModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const SECRET_KEY = 'testsecretkey32testsecretkey323232'
const SESSION_DURATION = '1h'
const SALT_ROUNDS = 10

export default class UserService {
    userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async registerUser(username: string, email: string, password: string) {
        const isUsernameExists = await this.userModel.findUserByAttribute('username', username);
        const isEmailExists = await this.userModel.findUserByAttribute('email', email);
        if (isUsernameExists || isEmailExists) {
            return;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await this.userModel.createUser(username, email, hashedPassword);
        return user;
    }

    async loginUser(username: string, password: string) {
        const user = await this.userModel.findUserByAttribute('username', username);
        if (!user) {
            return;
        }

        const isSameUser = await bcrypt.compare(password, user.password);
        if (!(user && isSameUser)) {
            return 401;
        }

        const jwtToken = jwt.sign({user_id: user.user_id, username: user.username, is_admin: user.is_admin}, SECRET_KEY, {expiresIn: SESSION_DURATION});
        return {user, jwtToken};
    }

    async getUserByUsername(username: string) {
        const user = await this.userModel.getUserByUsername(username);
        return user;
    }

    async updateUserByUserID(userID: number, firstName?: string, lastName?: string, surname?: string, description?: string, dateOfBirth?: Date, avatarName?: string) {
        await this.userModel.updateUserByUserID(userID, firstName?.trim(), lastName?.trim(), surname?.trim(), description?.trim(), dateOfBirth, avatarName);
    }

    async updateUsernameByUserID(userID: number, username: string) {
        const isUsernameExists = await this.userModel.findUserByAttribute('username', username);

        if (isUsernameExists) {
            return false;
        }

        await this.userModel.updateUsernameByUserID(userID, username);
        return true;
    }

    async updateEmailByUserID(userID: number, email: string) {
        const isEmailExists = await this.userModel.findUserByAttribute('email', email);

        if (isEmailExists) {
            return false;
        }
        
        await this.userModel.updateEmailByUserID(userID, email);
        return true;
    }

    async updatePasswordByUserID(userID: number, password: string) {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        await this.userModel.updatePasswordByUserID(userID, hashedPassword);
        return true;
    }
}