import "./App.sass";
import InputField from "./components/input_field/InputField";
import TodoList from "./components/todo_list/TodoList";
import { useState } from "react";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");


  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} />
      <TodoList />
    </div>
  );
};

export default App;