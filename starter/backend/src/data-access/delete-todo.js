import { CONSTANTS } from './constant'
import { getDocClientDb } from './doc-client'
import { logger } from './logger'

export const deleteTodo = async (userId, todoId) => {
    logger.info(`Deleting a todo item. userId = ${userId}, todoId = ${todoId}`)

    return getDocClientDb()
        .delete({
            TableName: CONSTANTS.TABLE_NAME,
            Key: { userId, todoId },
        })
        .promise()
}