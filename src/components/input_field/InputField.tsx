import "./InputField.sass";

interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e:React.FormEvent) => void
}

export default function InputField({ todo, setTodo, handleAdd }: InputFieldProps) {
  return (
    <form className="input" onSubmit={handleAdd}>
      <input
        type="input"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        placeholder="What needs to be done?"
        className="input__box"
      />
      <button type="submit" className="input_submit">
        Go
      </button>
    </form>
  );
}
