import { CONSTANTS } from './constant.mjs'
import { getDocClientDb } from './doc-client.mjs'
import { logger } from './logger.mjs'

export const deleteTodo = async (userId, todoId) => {
    logger.info(`Deleting a todo item. userId = ${userId}, todoId = ${todoId}`)

    return getDocClientDb()
        .delete({
            TableName: CONSTANTS.TABLE_NAME,
            Key: { userId, todoId },
        })
        .promise()
}