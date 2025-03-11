import "./todoList.sass"
import { useAppSelector } from "../../app/hooks"
import { selectTodos } from "../../features/submit_form/submitSlice"
import SingleTodo from "../single_todo/SingleTodo"

export default function TodoList() {
  const todos = useAppSelector(selectTodos)

  return (
    <div className="todos">
      {todos?.map((todo) => (
          <SingleTodo todo={todo} todos={todos} setTodos={() => {}} />
      ))}
    </div>
  )
}

