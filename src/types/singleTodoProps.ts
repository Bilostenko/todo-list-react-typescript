import { Todo } from "../model";

export type SingleTodoProps = {
    id:number,
    todos: Todo[],
    todo: Todo,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
};
