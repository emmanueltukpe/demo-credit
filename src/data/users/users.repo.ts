import { v4 as uuidv4 } from 'uuid'
import { knex } from '../../server/database/mysql.setup';
import {UserNotExistsError , UserEmailExistsError, WrongPasswordError } from '../../common/errors';
import bcrypt from 'bcrypt'

interface User {
    full_name: string;
    email: string;
    password: string;
}



export const signup = async (body: User) => {
    const emailIsUsed = await knex.select().from('Users').where({email: body.email})[0];
    const hashedpassword = await bcrypt.hash(body.password, 10)
    if (emailIsUsed) throw new UserEmailExistsError();
    const data = {
        id: uuidv4(),
        full_name: body.full_name,
        email: body.email,
        password: hashedpassword,
    }
    await knex('Users').insert(data)
    return data
}



export const login = async ({email, password}) => {
    const user = await knex.select().from('Users').where({email: email});
    if (!user) throw new UserNotExistsError();
    const correctPassword = await bcrypt.compare(password, user[0].password)
    if(!correctPassword) throw new WrongPasswordError();
    return user
}

export const getUser = async (id: string) => {
    const user = await knex.select().from('Users').where({id: id});
    if (!user) throw new UserNotExistsError();
    return user
}