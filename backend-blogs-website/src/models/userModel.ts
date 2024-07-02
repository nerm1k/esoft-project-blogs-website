import knex from "knex";

const pool = knex(require('../../knexfile'));

interface User {
    user_id: number,
    username: string,
    email: string,
    first_name?: string,
    last_name?: string,
    surname?: string,
    description?: string,
    date_of_birth?: string,
    password: string,
    status?: string,
    rating: number,
    avatar?: string,
    is_admin: boolean,
    created_at: Date,
    updated_at: Date
}

type UserWithoutPasswordAndUpdatedAt = Omit<User, 'password' | 'updated_at'>;

export default class UserModel {
    async createUser(username: string, email: string, password: string) {
        const user: User[] = await pool('users')
                                .insert({username: username, email: email, password: password, is_admin: false})
                                .returning(['username', 'password', 'is_admin']);
        return user[0];
    }

    async findUserByAttribute(attr: string, value: string | number) {
        const user: User[] = await pool('users')
                            .select()
                            .where(attr, '=', value);
        return user[0];
    }

    async getUserByUsername(username: string) {
        const user: UserWithoutPasswordAndUpdatedAt = await pool('users')
                                                                .select('user_id as userID', 'username', 'email', 'first_name as firstName', 'last_name as lastName', 'surname', 'description', 'date_of_birth as dateOfBirth', 'status', 'rating', 'avatar', 'created_at as createdAt')
                                                                .where(pool.raw('lower(username)'), '=', username)
                                                                .first();
        return user;
    }
}