import React from "react";
import Todo from "./Todo";
import styles from "./style.module.css";
//style={{ margin: "auto", textAlign: "center", alingItems: "center" }}
function App() {
  return (
    <div className={styles.app}>
      <Todo />
    </div>
  );
}

export default App;
