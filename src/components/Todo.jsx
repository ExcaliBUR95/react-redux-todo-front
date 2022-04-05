import React from "react";

const Todo = ({ id, completed }) => {
  const handleClickDelete = () => {
    dispatch(loadDeleteTodo(id));
  };

  const handleChecked = () => {
    dispatch(loadPatchTodo(id, completed));
  };
  return (
    <div className={styles.todoList}>
      <input
        className="form-check-input mt-0"
        type="checkbox"
        onChange={() => handleChecked()}
        checked={item.completed}
      />{" "}
      {item.text}{" "}
      <button className={styles.badge} onClick={() => handleClickDelete()}>
        ❌
      </button>
    </div>
  );
};

export default Todo;

Todos.PropType = {
  id: String,
  completed: Boolean,
};
