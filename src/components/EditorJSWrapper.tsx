import React from "react";

import EditorJs from "react-editor-js";

import { Footnote, FootnoteMaker } from "editorjs-footnotes";
import { API, OutputData } from "@editorjs/editorjs";

export function EditorJSWrapper(props: {
  data: any;
  saveData(data: any): void;
}) {
  return (
    <EditorJs
      enableReInitialize
      data={props.data}
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

        props.saveData(data);
        console.log("Saving data", data);
      }}
    >
      <div id="editor-js-holder-1" />
    </EditorJs>
  );
}
