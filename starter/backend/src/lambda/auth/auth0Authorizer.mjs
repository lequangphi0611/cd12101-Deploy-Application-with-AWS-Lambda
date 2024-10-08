import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../../utils/logger.mjs'
import axios from 'axios'
import jwkToPem from 'jwk-to-pem';

const logger = createLogger('auth')

const jwksUrl = 'https://dev-jvfvxmo8oz8oivhi.us.auth0.com/.well-known/jwks.json'

export async function handler(event) {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)

    logger.info('User was authorized', { jwtToken })
    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader) {
  const token = getToken(authHeader)
  const jwt = jsonwebtoken.decode(token, { complete: true })

  try {
    const keys = await axios.get(jwksUrl).then((res) => res.data?.keys)
    const key = keys?.find((key) => key.kid === jwt.header.kid)

    if (!key) {
      throw new Error('The key id not found', { kid: jwt.header.kid })
    }

    const pem = jwkToPem(key)

    return jsonwebtoken.verify(token, pem, { algorithms: [key.alg] })
  } catch (err) {
    logger.error('Verify Token fails', { authHeader })
    throw err
  }
}

function getToken(authHeader) {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
