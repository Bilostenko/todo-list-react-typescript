import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./todoList.sass";
import { selectTodos, reorderTodos } from "../../features/submit_form/submitSlice";
import SingleTodo from "../single_todo/SingleTodo";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { arrayMove } from "@dnd-kit/sortable";
export default function TodoList() {
    const todos = useAppSelector(selectTodos);
    const dispatch = useAppDispatch();
    // Розділяємо задачі на активні та виконані
    const activeTodos = todos.filter(todo => !todo.isDone);
    const doneTodos = todos.filter(todo => todo.isDone);
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over)
            return;
        const activeId = Number(active.id);
        const overId = Number(over.id);
        if (activeId === overId)
            return;
        const isActiveInActive = activeTodos.some(todo => todo.id === activeId);
        const isOverInActive = activeTodos.some(todo => todo.id === overId);
        const isActiveInDone = doneTodos.some(todo => todo.id === activeId);
        const isOverInDone = doneTodos.some(todo => todo.id === overId);
        let newTodos = [...todos];
        // Перетягування в межах однієї колонки
        if ((isActiveInActive && isOverInActive) || (isActiveInDone && isOverInDone)) {
            const activeIndex = todos.findIndex(t => t.id === activeId);
            const overIndex = todos.findIndex(t => t.id === overId);
            newTodos = arrayMove(newTodos, activeIndex, overIndex);
        }
        dispatch(reorderTodos(newTodos));
    };
    // Окремі ідентифікатори для кожної колонки
    const activeTodoIds = useMemo(() => activeTodos.map(todo => todo.id), [activeTodos]);
    const doneTodoIds = useMemo(() => doneTodos.map(todo => todo.id), [doneTodos]);
    return (_jsx("div", { className: "container", children: _jsxs(DndContext, { collisionDetection: closestCorners, onDragEnd: handleDragEnd, children: [_jsxs("div", { className: "todos", children: [_jsx("span", { className: "todos_heading", children: "Active task" }), _jsx(SortableContext, { items: activeTodoIds, strategy: verticalListSortingStrategy, children: activeTodos.map((todo) => (_jsx(SingleTodo, { todo: todo, todos: todos }, todo.id))) })] }), _jsxs("div", { className: "todos", children: [_jsx("span", { className: "todos_heading", children: "Done task" }), _jsx(SortableContext, { items: doneTodoIds, strategy: verticalListSortingStrategy, children: doneTodos.map((todo) => (_jsx(SingleTodo, { todo: todo, todos: todos }, todo.id))) })] })] }) }));
}
