import { SingleTodoProps } from "../../types/singleTodoProps"

export default function SingleTodo({ todo, todos, setTodos }: SingleTodoProps) {
  console.log(todos); 
  console.log(setTodos); 

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
