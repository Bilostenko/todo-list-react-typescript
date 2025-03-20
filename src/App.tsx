import "./App.sass"; 
import InputField from "./components/input_field/InputField"; 
import TodoList from "./components/todo_list/TodoList"; 
import { useState } from "react"; 
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core"; 
import { arrayMove } from "@dnd-kit/sortable"; 
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { selectTodos, reorderTodos } from "./features/submit_form/submitSlice";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  // Функція знаходження позиції елемента в масиві todos
  const getTodoPos = (id: number) => todos.findIndex(todo => todo.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id || !over) return;
    
    const originalPos = getTodoPos(Number(active.id));
  const newPos = getTodoPos(Number(over.id));
    
    // Створюємо новий масив з переміщеним елементом
    const newTodos = arrayMove([...todos], originalPos, newPos);
    
    // Відправляємо action для оновлення стану в Redux
    dispatch(reorderTodos(newTodos));
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <InputField todo={todo} setTodo={setTodo} />
        <TodoList />
      </DndContext>
    </div>
  );
};

export default App;