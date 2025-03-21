import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    todos: [],
};
export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        doneTodo: (state, action) => {
            state.todos = state.todos.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo);
        },
        editTodo: (state, action) => {
            state.todos = state.todos.map(todo => todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo);
        },
        reorderTodos: (state, action) => {
            state.todos = action.payload;
        },
    },
});
export const { addTodo, removeTodo, doneTodo, editTodo, reorderTodos } = todoSlice.actions;
// Селектор для отримання списку завдань
export const selectTodos = (state) => state.todos.todos;
export default todoSlice.reducer;
