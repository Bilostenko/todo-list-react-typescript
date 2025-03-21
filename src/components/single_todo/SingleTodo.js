import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./SingleTodo.sass";
import { MdEdit, MdDelete, MdDoneOutline } from "react-icons/md";
import { useAppDispatch } from "../../app/hooks";
import { doneTodo, removeTodo, editTodo, } from "../../features/submit_form/submitSlice";
import { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export default function SingleTodo({ todo }) {
    const [edit, setEdit] = useState(false);
    const [editedText, setEditedText] = useState(todo.todo);
    const dispatch = useAppDispatch();
    const inputRef = useRef(null);
    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(editTodo({ id: todo.id, todo: editedText }));
        setEdit(false);
    };
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: todo.id,
        data: {
            type: "todo",
            todo,
        },
    });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    const handleEditClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEdit(true);
    };
    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(removeTodo(todo.id));
    };
    const handleDoneClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(doneTodo(todo.id));
    };
    return (_jsx("div", { ref: setNodeRef, style: style, className: "todos__item", children: _jsxs("form", { className: "todos__single", onSubmit: handleEdit, children: [_jsx("div", { className: "todos__content", children: edit ? (_jsx("input", { ref: inputRef, type: "text", value: editedText, onChange: (e) => setEditedText(e.target.value), className: "todos__single-input", onClick: (e) => e.stopPropagation() })) : todo.isDone ? (_jsx("s", { className: "todos__single_text", children: todo.todo })) : (_jsx("span", { className: "todos__single_text", children: todo.todo })) }), _jsxs("div", { className: "todos__actions", children: [_jsx("button", { type: "button", className: "todos__icon todos__icon_edit", onClick: handleEditClick, children: _jsx(MdEdit, {}) }), _jsx("button", { type: "button", className: "todos__icon todos__icon_delete", onClick: handleDeleteClick, children: _jsx(MdDelete, {}) }), _jsx("button", { type: "button", className: "todos__icon", onClick: handleDoneClick, children: _jsx(MdDoneOutline, {}) })] }), _jsx("div", { className: "todos__drag-handle", ...attributes, ...listeners, children: _jsx("span", { className: "drag-icon", children: "\u205D\u205D" }) })] }) }));
}
