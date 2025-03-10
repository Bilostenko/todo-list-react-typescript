import { Todo } from "../model";

export type SingleTodoProps = {
    todos: Todo[],
    todo: Todo,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
};
