import "./App.sass";
import InputField from "./components/input_field/InputField";
import { useState } from "react";
import { Todo } from "./model";
const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if(todo){
      setTodos([...todos, {id:Date.now(), todo, isDone:false}])
      setTodo("")
    }
    
  }
console.log(todos);

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
    </div>
  );
};

export default App;
