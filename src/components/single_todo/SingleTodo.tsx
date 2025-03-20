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

  // const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
  //   id: todo.id,
  //   disabled: edit // Відключаємо сортування під час редагування
  // })
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: todo.id,
    data: {
      type: "todo",
      todo
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEdit(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeTodo(todo.id));
  };

  const handleDoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(doneTodo(todo.id));
  };

  return (
    <div ref={setNodeRef} style={style} className="todos__item">
      <form className="todos__single" onSubmit={handleEdit}>
        <div className="todos__content">
          {edit ? (
            <input
              ref={inputRef}
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="todos__single-input"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            todo.isDone ? (
              <s className="todos__single_text">{todo.todo}</s>
            ) : (
              <span className="todos__single_text">{todo.todo}</span>
            )
          )}
        </div>

        <div className="todos__actions">
          <button
            type="button"
            className="todos__icon todos__icon_edit"
            onClick={handleEditClick}>
            <MdEdit />
          </button>
          <button
            type="button"
            className="todos__icon todos__icon_delete"
            onClick={handleDeleteClick}>
            <MdDelete />
          </button>
          <button
            type="button"
            className="todos__icon"
            onClick={handleDoneClick}>
            <MdDoneOutline />
          </button>
        </div>

        <div className="todos__drag-handle" {...attributes} {...listeners}>
          <span className="drag-icon">⁝⁝</span>
        </div>
      </form>
    </div>
  );
}