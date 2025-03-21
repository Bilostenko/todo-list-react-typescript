import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./InputField.sass";
import { useRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTodo } from "../../features/submit_form/submitSlice";
export default function InputField({ todo, setTodo }) {
    const inputRef = useRef(null);
    const dispatch = useAppDispatch();
    const handleAdd = (e) => {
        e.preventDefault();
        if (todo) {
            const newTodo = { id: Date.now(), todo, isDone: false };
            dispatch(addTodo(newTodo));
            setTodo("");
            inputRef.current?.blur();
        }
    };
    return (_jsxs("form", { className: "input", onSubmit: handleAdd, children: [_jsx("input", { ref: inputRef, type: "input", value: todo, onChange: (e) => setTodo(e.target.value), placeholder: "What needs to be done?", className: "input__box" }), _jsx("button", { type: "submit", className: "input_submit", children: "Go" })] }));
}
