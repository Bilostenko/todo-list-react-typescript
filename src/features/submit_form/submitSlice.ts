import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '../../model'
import { RootState } from '../../app/store'

interface TodoState {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: [],
}

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
    reorderTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
})

export const { addTodo, removeTodo, doneTodo, editTodo, reorderTodos } = todoSlice.actions

// Селектор для отримання списку завдань
export const selectTodos = (state: RootState) => state.todos.todos

export default todoSlice.reducer
