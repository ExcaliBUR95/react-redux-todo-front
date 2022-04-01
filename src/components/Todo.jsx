import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  loadDeleteTodo,
  loadPatchTodo,
  loadTodoAdd,
  loadTodoGet,
} from "../redux/features/todoPosts";
import styles from "./style.module.css";

const Todo = () => {
  const postTodo = useSelector((state) => state.todo);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [post, setPost] = useState("");

  console.log(loading);

  useEffect(() => {
    dispatch(loadTodoGet());
  }, [dispatch]);

  const handleChange = (e) => {
    setPost(e.target.value);
  };
  const handleClick = () => {
    dispatch(loadTodoAdd(post));
  };
  const handleClickDelete = (id) => {
    dispatch(loadDeleteTodo(id));
  };

  const handleChecked = (id, completed) => {
    dispatch(loadPatchTodo(id, completed));
  };

  return (
    <>
      {loading ? (
        <p>идет загрузка...</p>
      ) : (
        <div>
          <h1 className={styles.todoListH1}>ToDo-List</h1>
          <div className={styles.inputAndButton}>
            <input
              onChange={handleChange}
              value={post}
              type="text"
              placeholder="напишите ваш текст..."
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleClick}
            >
              Add
            </button>
          </div>
          <div className={styles.todosSize}>
            {postTodo.map((item) => {
              return (
                <div className={styles.todoList}>
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    onChange={() => handleChecked(item._id, item.completed)}
                    checked={item.completed}
                  />{" "}
                  {item.text}{" "}
                  <button
                    className={styles.badge}
                    onClick={() => handleClickDelete(item._id)}
                  >
                    ❌
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
