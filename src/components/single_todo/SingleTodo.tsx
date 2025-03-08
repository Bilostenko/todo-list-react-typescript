import { Todo } from "../../model"

type SingleTodoProps = {
    todos: Todo[],
    todo: Todo,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function SingleTodo({ todo}:SingleTodoProps){
  return (
    <div>
      <form className="todos__single">
        <span className="todos__single--text">{todo.todo}</span>
        <div className="select">
          <select name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    </div>
  )
}
