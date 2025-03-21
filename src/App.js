import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.sass";
import InputField from "./components/input_field/InputField";
import TodoList from "./components/todo_list/TodoList";
import { useState } from "react";
const App = () => {
    const [todo, setTodo] = useState("");
    return (_jsxs("div", { className: "App", children: [_jsx("span", { className: "heading", children: "Taskify" }), _jsx(InputField, { todo: todo, setTodo: setTodo }), _jsx(TodoList, {})] }));
};
export default App;
