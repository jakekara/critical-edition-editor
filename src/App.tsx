import React, { useState } from "react";
import EditorJs from "react-editor-js";
import { Footnote, FootnoteMaker } from "editorjs-footnotes";
import { API, OutputData } from "@editorjs/editorjs";

import styles from "./App.module.css";
import * as api from "./api";

function App() {
  const [data, setData] = useState<any>(api.loadTemporaryData());
  console.log("Rendering with data", data);

  return (
    <div className={styles["App"]}>
      <button
        id="save"
        onClick={async () => {
          const data = api.loadTemporaryData();
          if (!data) {
            return;
          }

          const fileName = "critical-edition";
          const json = JSON.stringify(data);
          const blob = new Blob([json], { type: "application/json" });
          const href = await URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = href;
          link.download = fileName + ".json";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        Export draft
      </button>
      <input
        type="file"
        id="file-selector"
        accept=".json"
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          const target = evt.target as HTMLInputElement;
          const files = target.files;
          if (!files) {
            return;
          }
          if (files) console.log(`${files[0]}`);

          const reader = new FileReader();
          reader.addEventListener("load", (evt) => {
            console.log("Loaded data", evt.target?.result);
            let data = evt.target?.result;
            if (typeof data !== "string") {
              return;
            }
            if (!data) {
              return;
            }
            data = JSON.parse(data);
            setData(data);
            console.log("Set data to ", data);
          });
          reader.readAsText(files[0]);
        }}
      ></input>
      <EditorJs
        enableReInitialize
        data={data}
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
          console.log("Saving data", data);
        }}
      >
        <div className={styles["editor-js-holder"]} id="editor-js-holder-1" />
      </EditorJs>
    </div>
  );
}

export default App;
