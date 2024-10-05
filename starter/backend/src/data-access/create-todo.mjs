import { CONSTANTS } from './constant.mjs'
import { getDocClientDb } from './doc-client.mjs'
import { logger } from './logger.mjs'

export const createTodo = async (newTodo) => {
  logger.info(`Creating new todo item: ${newTodo.todoId}`)

  return getDocClientDb()
  .put({
    TableName: CONSTANTS.TABLE_NAME,
    Item: newTodo,
  })
  .promise()
}
