import { CONSTANTS } from './constant.mjs'
import { getDocClientDb } from './doc-client.mjs'
import { logger } from './logger.mjs'

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
