import "./todoList.sass"
import { useAppSelector } from "../../app/hooks"
import { selectTodos } from "../../features/submit_form/submitSlice"
import SingleTodo from "../single_todo/SingleTodo"

export default function TodoList() {
  const todos = useAppSelector(selectTodos)

  return (
    <div className="container">
      <div className="todos">
        <span className="todos_heading">Active task</span>
        {todos?.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} todos={todos} setTodos={() => { }} />
        ))}
      </div>
      <div className="todos remove">
        <span className="todos_heading">Active task</span>
        {todos?.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} todos={todos} setTodos={() => { }} />
        ))}
      </div>
    </div>

  )
}

