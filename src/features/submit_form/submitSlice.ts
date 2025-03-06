import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '../../model'
import { RootState } from '../../app/store'

// Тип стану
interface TodoState {
  todos: Todo[]
}

// Початковий стан
const initialState: TodoState = {
  todos: [],
}

// Створення slice для роботи з todo
export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Додавання нового завдання
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
    },
    // Видалення завдання
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
  },
})

// Експорт дій
export const { addTodo, removeTodo } = todoSlice.actions

// Селектор для отримання списку завдань
export const selectTodos = (state: RootState) => state.todos.todos

// Експорт reducer'а для додавання до store
export default todoSlice.reducer
