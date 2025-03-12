import './singleTodo.sass'
import { SingleTodoProps } from "../../types/singleTodoProps";
import { MdEdit, MdDelete, MdDoneOutline } from "react-icons/md";
import { useAppDispatch } from '../../app/hooks';
import { doneTodo, removeTodo, editTodo } from "../../features/submit_form/submitSlice"
import { useState, useRef, useEffect } from 'react';

export default function SingleTodo({ todo }: SingleTodoProps) {

  const [edit, setEdit] = useState<boolean>(false)
  const [editedText, setEditedText] = useState<string>(todo.todo)

  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editTodo({ id: todo.id, todo: editedText }));
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <div>
      <form className="todos__single" onSubmit={handleEdit}>
        {edit ? (
          <input
            ref={inputRef}
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="todos__single" />
        ) : (
          todo.isDone ? (
            <s className="todos__single_text">{todo.todo}</s>
          ) : (
            <span className="todos__single_text">{todo.todo}</span>
          )
        )}

        <div>
          <span className="todos__icon todos__icon_edit" onClick={() => setEdit(true)}>
            <MdEdit />
          </span>
          <span className="todos__icon todos__icon_delete" onClick={() => dispatch(removeTodo(todo.id))}>
            <MdDelete />
          </span>
          <span className="todos__icon" onClick={() => dispatch(doneTodo(todo.id))}>
            <MdDoneOutline />
          </span>
        </div>
      </form>
    </div>
  );
}