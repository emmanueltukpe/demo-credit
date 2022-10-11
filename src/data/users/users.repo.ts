import { v4 as uuidv4 } from 'uuid'
import { knex } from '../../server/database/mysql.setup';
import {UserNotExistsError , UserEmailExistsError } from '../../common/errors';

export interface User {
    full_name: string,
    email: string,
}



export const signup = async (body: User) => {
    const emailIsUsed = await knex.select().from('Users').where({email: body.email});
    console.log(emailIsUsed);
    
    if (emailIsUsed) throw new UserEmailExistsError();
    const create = await knex('Users').insert({
        id: uuidv4(),
        full_name: body.full_name,
        email: body.email,
    })
    return create
}



export const login = async (email: string) => {
    const user = await knex.select().from('Users').where({email: email});
    if (!user) throw new UserNotExistsError();
    return user
}
//create password for later