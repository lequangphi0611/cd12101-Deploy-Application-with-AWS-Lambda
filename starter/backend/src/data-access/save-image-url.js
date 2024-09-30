import { CONSTANTS } from './constant'
import { getDocClientDb } from './doc-client'
import { logger } from './logger'

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
