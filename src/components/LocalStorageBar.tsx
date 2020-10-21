import React from "react";

import { AppBar, Button, Toolbar } from "@material-ui/core";

export function LocalStorageBar(props: {
  data: any;
  getData: () => any;
  setData: (data: any) => void;
}) {
  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Button
            // variant="outlined"
            // color="primary"
            color="inherit"
            id="save"
            onClick={async () => {
              const data = props.getData();
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
            Export
          </Button>
          <Button
            // variant="outlined"
            color="inherit"
            onClick={() => {
              const button: HTMLButtonElement | null = document.querySelector(
                "input#file-selector"
              );
              if (!button) {
                return;
              }
              console.log("Clicking");
              button.click();
            }}
          >
            Import
          </Button>
          <input
            style={{ display: "none" }}
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
                props.setData(data);
                console.log("Set data to ", data);
              });
              reader.readAsText(files[0]);
            }}
          ></input>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
