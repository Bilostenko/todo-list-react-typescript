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
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    doneTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone} : todo)
    },
    editTodo: (state, action: PayloadAction<{id:number, todo:string}>)=>{
      state.todos = state.todos.map(todo => todo.id === action.payload.id ? { ...todo, todo: action.payload.todo} : todo)
    },
  },
})

// Експорт дій
export const { addTodo, removeTodo, doneTodo, editTodo } = todoSlice.actions

// Селектор для отримання списку завдань
export const selectTodos = (state: RootState) => state.todos.todos

// Експорт reducer'а для додавання до store
export default todoSlice.reducer
