import * as dataAccess from '../data-access'
import { v4 as uuid } from 'uuid';
import { getAttachmentUrl } from './attachment';

export const createTodo = async (userId, newTodo) => {
    const todoId = uuid();

    const attachmentUrl = getAttachmentUrl(todoId);

    return dataAccess.createTodo({
        userId,
        todoId,
        createdAt: new Date().toISOString(),
        done: false,
        attachmentUrl,
        ...newTodo
    })
}
