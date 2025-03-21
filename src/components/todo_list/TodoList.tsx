import "./todoList.sass"
import { selectTodos, reorderTodos } from "../../features/submit_form/submitSlice"
import SingleTodo from "../single_todo/SingleTodo"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useMemo } from "react"
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { arrayMove } from "@dnd-kit/sortable";

export default function TodoList() {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  
  // Розділяємо задачі на активні та виконані
  const activeTodos = todos.filter(todo => !todo.isDone);
  const doneTodos = todos.filter(todo => todo.isDone);


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = Number(active.id);
    const overId = Number(over.id);
    
    if (activeId === overId) return;
    
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

  return (
    <div className="container">
      <DndContext 
        collisionDetection={closestCorners} 
        onDragEnd={handleDragEnd} 
      >
        <div className="todos">
          <span className="todos_heading">Active task</span>
          <SortableContext
            items={activeTodoIds}
            strategy={verticalListSortingStrategy}
          >
            {activeTodos.map((todo) => (
              <SingleTodo
                key={todo.id}
                todo={todo}
                todos={todos}
              />
            ))}
          </SortableContext>
        </div>
        
        <div className="todos">
          <span className="todos_heading">Done task</span>
          <SortableContext
            items={doneTodoIds}
            strategy={verticalListSortingStrategy}
          >
            {doneTodos.map((todo) => (
              <SingleTodo
                key={todo.id}
                todo={todo}
                todos={todos}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}