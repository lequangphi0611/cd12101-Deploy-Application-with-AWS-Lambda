import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import * as dataAccess from '../../data-access'
import { getUserId } from '../utils'
import { getSignedUrl } from '../../business-logic'

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)

    const uploadUrl = await getSignedUrl(todoId)

    await dataAccess.saveImageUrl(userId, todoId, bucketName)

    return {
      statusCode: 202,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        uploadUrl: uploadUrl
      })
    }
  })
