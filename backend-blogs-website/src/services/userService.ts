import UserModel, { User } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'testsecretkey32testsecretkey323232'
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

        const jwtToken = jwt.sign({username: user.username, is_admin: user.is_admin}, SECRET_KEY, {expiresIn: SESSION_DURATION});
        return {user, jwtToken};
    }
}