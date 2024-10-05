import * as dataAccess from '../data-access/index.mjs'

export const deleteTodo = async (userId, todoId) => {
  return dataAccess.deleteTodo(userId, todoId)
}
