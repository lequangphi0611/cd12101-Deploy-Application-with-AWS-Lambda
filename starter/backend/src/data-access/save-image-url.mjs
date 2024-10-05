import { CONSTANTS } from './constant.mjs'
import { getDocClientDb } from './doc-client.mjs'
import { logger } from './logger.mjs'

export const saveImageUrl = async (userId, todoId, bucketName) => {
  

  try {
    const attachmentUrl = `https://${bucketName}.s3.amazonaws.com/${todoId}`;
    await getDocClientDb()
    .update({
      TableName: CONSTANTS.TABLE_NAME,
      Key: { userId, todoId },
      ConditionExpression: 'attribute_exists(todoId)',
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': attachmentUrl
      }
    })
    .promise()
    logger.info(`Storing image url for a todo item. userId = ${userId}, todoId = ${todoId}, attachmentUrl = ${attachmentUrl}`)
  } catch(err) {
    logger.error(err)
  }
}
