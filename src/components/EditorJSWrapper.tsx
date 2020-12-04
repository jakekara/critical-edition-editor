import React, { useState } from "react";

import EditorJs from "react-editor-js";
// import * as Paragraph from "editorjs-paragraph-with-alignment";
import * as Header from "@editorjs/header";
import * as Delimiter from "@editorjs/delimiter";
import { OutputData } from "@editorjs/editorjs";

import {
  Footnote,
  FootnoteMaker,
  TypedParagraph,
  sortBlocks,
} from "editorjs-footnotes";

// import { API, OutputData } from "@editorjs/editorjs";

import styles from "./EditorJSWrapper.module.css";
import ControlBar from "./ControlBar";
import { Paper } from "@material-ui/core";

/** */
export function EditorJSWrapper(props: {
  data: any;
  saveData(data: any): void;
}) {
  const [instanceRef, setInstanceRef] = useState<any>();

  const clearData = () => {
    if (instanceRef) {
      instanceRef.clear();
    }
  };

  return (
    <div>
      {" "}
      {instanceRef ? (
        <ControlBar
          sortBlocks={() => {
            sortBlocks(instanceRef);
          }}
          instanceRef={instanceRef}
          clearData={clearData}
        />
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
            delimiter: {
              class: Delimiter,
            },
            paragraph: {
              class: TypedParagraph,
              inlineToolbar: true,
              config: {
                placeholder: "Click here to start typing",
              },
            },
            FootnoteMaker,
            footnoteParagraph: {
              class: Footnote,
              inlineToolbar: ["link", "bold", "italic"], // don't allow footnotes to add footnotes
            },
          }}
          onChange={(_: any, data?: OutputData) => {
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
