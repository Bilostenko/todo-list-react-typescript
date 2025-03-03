import "./InputField.sass";

export default function InputField() {
  return (
    <form>
      <input
        type="input"
        placeholder="What needs to be done?"
        className="input__field"
      />
      <button type="submit" className="input__button">
        Go
      </button>
    </form>
  );
}
