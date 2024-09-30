import * as dataAccess from '../data-access'

export async function updateTodo(userId, todoId, todo) {
  return dataAccess.updateTodo(userId, todoId, todo)
}
