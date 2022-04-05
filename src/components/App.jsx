import React from "react";
import Todo from "./Todos";
import styles from "./style.module.css";
//style={{ margin: "auto", textAlign: "center", alingItems: "center" }}
function App() {
  return (
    <div className={styles.app}>
      <Todos />
    </div>
  );
}

export default App;
