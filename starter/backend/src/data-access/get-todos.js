import { CONSTANTS } from './constant'
import { getDocClientDb } from './doc-client'
import { logger } from './logger'

export const getTodos = async (userId) => {
  logger.info(`Getting all todos items of userid = ${userId}`)

  return getDocClientDb()
    .query({
      TableName: CONSTANTS.TABLE_NAME,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    })
    .promise()
    .then((result) => result.Items)
}
