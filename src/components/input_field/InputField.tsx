import "./InputField.sass"
import { useRef } from "react"
import { useAppDispatch } from "../../app/hooks"
import { addTodo } from "../../features/submit_form/submitSlice"
import { Todo } from "../../model"

interface InputFieldProps {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
}

export default function InputField({ todo, setTodo }: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      const newTodo: Todo = { id: Date.now(), todo, isDone: false }
      dispatch(addTodo(newTodo))
      setTodo("")
      inputRef.current?.blur()
    }
  }

  return (
    <form className="input" onSubmit={handleAdd}>
      <input
        ref={inputRef}
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="What needs to be done?"
        className="input__box"
      />
      <button type="submit" className="input_submit">
        Go
      </button>
    </form>
  )
}
