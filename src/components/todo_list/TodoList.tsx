import "./todoList.sass"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectTodos, removeTodo } from "../../features/submit_form/submitSlice"
import SingleTodo from "../single_todo/SingleTodo"

export default function TodoList() {
  const todos = useAppSelector(selectTodos) // Використовуємо Redux для стану завдань
  const dispatch = useAppDispatch()

  return (
    <div className="todos">
      {todos.map((todo) => (
        <li key={todo.id}>
          <SingleTodo todo={todo} todos={todos} setTodos={() => {}} />
          <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </div>
  )
}
