const initialState = {
  todo: [],
  error: null,
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "posts/load/fullfiled":
      return {
        ...state,
        todo: action.payload,
        loading: false,
      };
    case "posts/load/add/fulfilled":
      return {
        ...state,
        todo: [...state.todo, action.payload],
        loading: false,
      };
    case "posts/load/rejected":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case "post/load/delete/fulfilled":
      return {
        ...state,
        todo: state.todo.filter((item) => item._id !== action.payload),
        loading: false,
      };
    case "post/load/patch/fulfilled":
      return {
        ...state,
        todo: state.todo.map((item) => {
          if (item._id === action.payload) {
            item.completed = !item.completed;
            return item;
          }
          return item;
        }),
        loading: false,
      };
    case "load/get/pending":
      return {
        ...state,
        loading: true,
      };
    case "load/add/pending":
      return {
        ...state,
        loading: true,
      };
    case "load/delete/pending":
      return {
        ...state,
        loading: true,
      };
    case "load/patch/pending":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export const loadTodoGet = () => {
  return async (dispatch) => {
    dispatch({ type: "load/get/pending" });
    try {
      const res = await fetch("http://localhost:3001/todo");
      const posts = await res.json();
      dispatch({ type: "posts/load/fullfiled", payload: posts });
    } catch (e) {
      dispatch({ type: "posts/load/rejected", payload: e.toString() });
    }
  };
};
export const loadTodoAdd = (text) => {
  return async (dispatch) => {
    dispatch({ type: "load/add/pending" });
    try {
      const res = await fetch("http://localhost:3001/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text, completed: false }),
      });
      const posts = await res.json();
      dispatch({ type: "posts/load/add/fulfilled", payload: posts });
    } catch (e) {
      dispatch({ type: "posts/load/rejected", payload: e.toString() });
    }
  };
};
export const loadDeleteTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: "load/delete/pending" });
    try {
      await fetch(`http://localhost:3001/todo/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "post/load/delete/fulfilled", payload: id });
    } catch (error) {
      dispatch({ type: "posts/load/rejected", payload: error.toString() });
    }
  };
};
export const loadPatchTodo = (id, completed) => {
  return async (dispatch) => {
    dispatch({ type: "load/patch/pending" });
    try {
      const res = await fetch(`http://localhost:3001/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ completed: !completed }),
      });
      dispatch({ type: "post/load/patch/fulfilled", payload: id });
    } catch (error) {
      dispatch({
        type: "posts/load/patch/rejected",
        payload: error.toString(),
      });
    }
  };
};
