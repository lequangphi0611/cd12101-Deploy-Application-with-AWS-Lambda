import * as dataAccess from '../data-access'

export const deleteTodo = async (userId, todoId) => {
  return dataAccess.deleteTodo(userId, todoId)
}
