import * as dataAccess from '../data-access/index.mjs'

export async function getTodos(userId) {
  return dataAccess.getTodos(userId)
}
