import "./todoList.sass"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectTodos, removeTodo } from "../../features/submit_form/submitSlice"

export default function TodoList() {
  const todos = useAppSelector(selectTodos)
  const dispatch = useAppDispatch()

  return (
    <div className="todos">
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.todo}
          <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </div>
  )
}
