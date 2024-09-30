import { CONSTANTS } from './constant'
import { getDocClientDb } from './doc-client'
import { logger } from './logger'

export const createTodo = async (newTodo) => {
    logger.info(`Creating new todo item: ${newTodo.todoId}`)

    return getDocClientDb()
        .put({
            TableName: CONSTANTS.TABLE_NAME,
            Item: newTodo
        })
        .promise()
}