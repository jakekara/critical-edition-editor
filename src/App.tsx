import React, { useState } from "react";

import { Box, Container, Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

// import styles from "./App.module.css";
import * as api from "./api";
import { GDrive } from "./components/GDrive";

import { LocalStorageBar } from "./components/LocalStorageBar";
import { EditorJSWrapper } from "./components/EditorJSWrapper";

function App() {
  const [data, setData] = useState<any>(api.loadTemporaryData());
  console.log("Rendering with data", data);

  return (
    <React.Fragment>
      <CssBaseline />
      <GDrive />
      <div>
        <LocalStorageBar
          data={data}
          getData={api.loadTemporaryData}
          setData={setData}
        />
        <Container>
          <Box m={5}>
            <Paper>
              <EditorJSWrapper data={data} saveData={api.saveTemporaryData} />
            </Paper>
          </Box>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
