import * as dataAccess from '../data-access/index.mjs'
import { v4 as uuid } from 'uuid';

export const createTodo = async (userId, newTodo) => {
    const todoId = uuid();

    return dataAccess.createTodo({
        userId,
        todoId,
        createdAt: new Date().toISOString(),
        done: false,
        ...newTodo
    })
}
