import "./todoList.sass";
import { Todo } from "../../model";
interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoList({ todos /*setTodos*/ }: TodoListProps) {
  return (
    <div className="todos">
      {todos.map((todo) => {
        return <li key={todo.id}>{todo.todo}</li>;
      })}
    </div>
  );
}
