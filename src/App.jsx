import { useState } from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";

const App = () => {
  const todoArr = [];

  const [todo, setTodo] = useState(todoArr);

  const [text, setText] = useState("");

  const [error, setError] = useState(false);

  const [errorTwo, setEroorTwo] = useState(false);

  const some = todo.some((todo) => todo.text.toLowerCase() === text.toLowerCase());
  const handlePost = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      setText("");
      setError(true);
    } else if (some) {
      setEroorTwo(true);
    } else {
      setTodo([
        {
          text: text,
          checked: false,
        },
        ...todo,
      ]);
      setText("");
      setError(false);
      setEroorTwo(false);
    }
  };

  const handleDelete = (id) => {
    setTodo(todo.filter((todo, index) => index !== id));
    setEroorTwo(false);
    setText("");
  };

  const handleCheck = (id) => {
    setTodo(
      todo.map((todo, index) => {
        if (index === id) {
          return {
            ...todo,
            checked: !todo.checked,
          };
        }
        return todo;
      })
    );
    setEroorTwo(false);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setError(false);
    setEroorTwo(false);
  };

  return (
    <div className="App">
      <form className="form" onClick={handlePost}>
        <input value={text} onChange={handleChange} />
        <button type="submit">ADD</button>
      </form>
      {errorTwo && <p className="error_two">Это дело уже добавлено</p>}
      {error && <p className="error">Поле не может быть пустым</p>}
      <div className="todos_wrap">
        {todo.map((todo, index) => {
          return (
            <div
              className={`todo_wrap ${
                todo.checked ? "checked star_check yellow_text" : ""
              }`}
              key={index}
            >
              <button onClick={() => handleCheck(index)}>
                {todo.checked ? (
                  <BsCheckAll className="star" />
                ) : (
                  <BsCheck className="star" />
                )}
              </button>
              <p className="text">{todo.text}</p>
              {!todo.checked && (
                <button onClick={() => handleDelete(index)}>
                  <IoTrashBinOutline className="trash" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
