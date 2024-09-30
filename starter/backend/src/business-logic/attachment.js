import * as AWS from 'aws-sdk'
import * as AWSRay from 'aws-xray-sdk'

const XAWS = AWSRay.captureAWS(AWS)

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const URL_EXPIRATION = process.env.SIGNED_URL_EXPIRATION

let s3Bucket = null

/** @type {XAWS.S3} */
const getS3Bucket = () => {
  if (!s3Bucket) {
    s3Bucket = new XAWS.S3({ signatureVersion: 'v4' })
  }

  return s3Bucket
}

export const getAttachmentUrl = (todoId) =>
  `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${todoId}`

export const getSignedUrl = async (todoId) =>
  getS3Bucket().getSignedUrlPromise('putObject', {
    Bucket: S3_BUCKET_NAME,
    Key: todoId,
    Expires: URL_EXPIRATION
  })
