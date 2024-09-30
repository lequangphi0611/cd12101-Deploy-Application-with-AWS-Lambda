import * as AWS from 'aws-sdk'

import * as AWSXray from 'aws-xray-sdk'
import { logger } from './logger'

const XAWS = AWSXray.captureAWS(AWS)

let docClient = null

/** @type {XAWS.DynamoDB.DocumentClient} */
export const getDocClientDb = () => {
  if (!docClient) {
    logger.info('Create the document client')
    docClient = new XAWS.DynamoDB.DocumentClient()
  }

  return docClient
}
