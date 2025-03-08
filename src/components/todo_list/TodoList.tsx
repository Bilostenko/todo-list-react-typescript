import "./todoList.sass"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectTodos, removeTodo } from "../../features/submit_form/submitSlice"
import SingleTodo from "../single_todo/SingleTodo"

export default function TodoList() {
  const todos = useAppSelector(selectTodos)
  const dispatch = useAppDispatch()

  return (
    <div className="todos">
      {todos.map((todo) => (
        <li key={todo.id}>
          <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>
          <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </div>
  )
}

// Тут проблема в тому, що setTodos не можна імпортувати з SingleTodo, оскільки це пропс (параметр компонента), а не експортована змінна чи функція. Замість імпорту тобі потрібно передати функцію setTodos у компонент SingleTodo як пропс.
