import { CONSTANTS } from './constant'
import { getDocClientDb } from './doc-client'
import { logger } from './logger'

export const updateTodo = async (userId, todoId, updateData) => {
  logger.info(`Updating todo item. userId = ${userId}, todoId = ${todoId}`)

  return getDocClientDb()
    .update({
      TableName: CONSTANTS.TABLE_NAME,
      Key: { userId, todoId },
      ConditionExpression: 'attribute_exists(todoId)',
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: {
        ':name': updateData.name,
        ':dueDate': updateData.name,
        ':done': updateData.name
      }
    })
    .promise()
}
