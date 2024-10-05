import middy from '@middy/core'
import cors from '@middy/http-cors'
import * as dataAccess from '../../data-access/index.mjs'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs'
import { getSignedUrl } from '../../business-logic/index.mjs'

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

    await dataAccess.saveImageUrl(userId, todoId, process.env.S3_BUCKET)

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
