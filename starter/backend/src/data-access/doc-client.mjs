import AWS from 'aws-sdk'

import AwsXray from 'aws-xray-sdk'
import { logger } from './logger.mjs'

const XAWS = AwsXray.captureAWS(AWS)
let docClient = null

/** @type {XAWS.DynamoDB.DocumentClient} */
export const getDocClientDb = () => {
  if (!docClient) {
    logger.info('Create the document client')
    docClient = new XAWS.DynamoDB.DocumentClient()
  }

  return docClient
}
