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
import Todo from "./Todo";

const Todos = () => {
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
              return <Todo id={item.id} completed={item.completed}  key={item.id}/>;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Todos;

Todo.PropTypes = {
  post: PropTypes.String,
};
