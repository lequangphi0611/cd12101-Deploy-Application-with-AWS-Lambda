import * as dataAccess from '../data-access'

export async function getTodos(userId) {
  return dataAccess.getTodos(userId)
}
