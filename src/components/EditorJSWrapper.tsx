import React, { useState } from "react";

import EditorJs from "react-editor-js";
import * as Paragraph from "editorjs-paragraph-with-alignment";
import * as Header from "@editorjs/header";
import EditorJS from "@editorjs/editorjs";

import { Footnote, FootnoteMaker } from "editorjs-footnotes";
import { API, OutputData } from "@editorjs/editorjs";

import styles from "./EditorJSWrapper.module.css";
import ControlBar from "./ControlBar";
import { Paper } from "@material-ui/core";

/** */
export function EditorJSWrapper(props: {
  data: any;
  saveData(data: any): void;
}) {
  const [instanceRef, setInstanceRef] = useState<EditorJS>();

  const clearData = () => {
    if (instanceRef) {
      instanceRef.clear();
    }
  };

  return (
    <div>
      {" "}
      {instanceRef ? (
        <ControlBar instanceRef={instanceRef} clearData={clearData} />
      ) : null}
      <Paper>
        <EditorJs
          instanceRef={(ref) => {
            setInstanceRef(ref);
          }}
          enableReInitialize
          data={props.data}
          autofocus={true}
          holder="editor-js-holder-1"
          tools={{
            header: Header,
            paragraph: {
              class: Paragraph,
              inlineToolbar: true,
            },
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

            props.saveData(data);
            console.log("Saving data", data);
          }}
        >
          <div className={styles.Holder} id="editor-js-holder-1" />
        </EditorJs>
      </Paper>
    </div>
  );
}
