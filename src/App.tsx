import React from "react";
import EditorJs from "react-editor-js";
import { Footnote, FootnoteMaker } from "editorjs-footnotes";
import { API, OutputData } from "@editorjs/editorjs";

import styles from "./App.module.css";
import * as api from "./api";

function App() {
  return (
    <div className={styles["App"]}>
      <EditorJs
        data={api.loadTemporaryData()}
        autofocus
        holder="editor-js-holder-1"
        tools={{
          FootnoteMaker,
          footnoteParagraph: {
            class: Footnote,
            inlineToolbar: ["link", "bold", "italic"], // don't allow footnotes to add footnotes
          },
        }}
        onChange={(_: API, data?: OutputData) => {
          if (!data) {
            return;
          }

          api.saveTemporaryData(data);
        }}
      >
        <div className={styles["editor-js-holder"]} id="editor-js-holder-1" />
      </EditorJs>
    </div>
  );
}

export default App;
