import './singleTodo.sass'
import { SingleTodoProps } from "../../types/singleTodoProps";
import { MdEdit, MdDelete, MdDoneOutline } from "react-icons/md";
import { useAppDispatch } from '../../app/hooks';
import { doneTodo, removeTodo } from "../../features/submit_form/submitSlice"

export default function SingleTodo({ todo, todos }: SingleTodoProps) {
  console.log(todos);

    const dispatch = useAppDispatch()

  return (
    <div>
      <form className="todos__single" key={todo.id}>
        <span className="todos__single_text">{todo.todo}</span>
        <div>
          <span className="todos__icon todos__icon_edit"><MdEdit /></span>
          <span className="todos__icon todos__icon_delete" onClick={() => dispatch(removeTodo(todo.id))}><MdDelete /></span>

          {todo.isDone ? (
    <span className="todos__icon" onClick={() => dispatch(doneTodo(todo.id))}>
        <MdDoneOutline />
    </span>
) : (
    <s className="todos__icon" onClick={() => dispatch(doneTodo(todo.id))}>
        <MdDoneOutline />
    </s>
)}
 
 {/* НЕ ПРАЦЮЮТЬ КНОПКИ */}
          
        </div>
      </form>
    </div>
  );
}
