import React from "react";

import styles from "./App.module.css";

import EditorJs from "react-editor-js";

function App() {
  return (
    <div className={styles["App"]}>
      <EditorJs autofocus holder="editor-js-holder-1">
        <div className={styles["editor-js-holder"]} id="editor-js-holder-1" />
      </EditorJs>
    </div>
  );
}

export default App;
