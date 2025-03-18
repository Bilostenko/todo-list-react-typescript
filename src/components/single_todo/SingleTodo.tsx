import './singleTodo.sass'
import { MdEdit, MdDelete, MdDoneOutline } from "react-icons/md";
import { useAppDispatch } from '../../app/hooks';
import { doneTodo, removeTodo, editTodo } from "../../features/submit_form/submitSlice"
import { useState, useRef, useEffect } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { Todo } from '../../model';

interface SingleTodoProps {
  todo: Todo;
  todos: Todo[];
}

export default function SingleTodo({ todo, todos }: SingleTodoProps) {
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

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: todo.id})
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div>
      <form className="todos__single" 
        {...attributes} {...listeners} 
        onSubmit={handleEdit} 
        ref={setNodeRef} 
        style={style}>
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