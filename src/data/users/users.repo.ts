import { v4 as uuidv4 } from 'uuid'
import { knex } from '../../server/database/mysql.setup';
import {UserNotExistsError , UserEmailExistsError, WrongPasswordError } from '../../common/errors';
import bcrypt from 'bcrypt'

export interface User {
    full_name: string,
    email: string,
    password: string,
}



export const signup = async (body: User) => {
    const emailIsUsed = await knex.select().from('Users').where({email: body.email});
    const hashedpassword = await bcrypt.hash(body.password, 10)
    if (emailIsUsed) throw new UserEmailExistsError();
    const create = await knex('Users').insert({
        id: uuidv4(),
        full_name: body.full_name,
        email: body.email,
        password: hashedpassword,
    })
    return create
}



export const login = async ({email, password}) => {
    const user = await knex.select().from('Users').where({email: email, password: password})[0];
    if (!user) throw new UserNotExistsError();
    const correctPassword = await bcrypt.compare(password, user.password)
    if(!correctPassword) throw new WrongPasswordError();
    return user
}
