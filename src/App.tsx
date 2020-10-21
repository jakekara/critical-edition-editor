import React, { useEffect, useState } from "react";

import { Box, Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

// import styles from "./App.module.css";
import * as api from "./api";

import { LocalStorageBar } from "./components/LocalStorageBar";
import { EditorJSWrapper } from "./components/EditorJSWrapper";

function App() {
  // const [data, setData] = useState<any>(api.loadTemporaryData());
  const [refreshRequired, setRefreshRequired] = useState<boolean>(false);

  useEffect(() => {
    console.log("Checking whether a refresh is needed");
    if (refreshRequired) {
      console.log("Doing a refresh");
      setRefreshRequired(false);
    }
    return;
  }, [refreshRequired]);

  const refresh = () => {
    console.log("Setting refresh required");
    setRefreshRequired(true);
  };

  const saveData = (newData: any) => {
    api.saveTemporaryData(newData);
    // setData(newData);
  };

  const getData = () => {
    return api.loadTemporaryData();
    // return data;
  };

  console.log("Rendering App with data", getData());

  return (
    <React.Fragment>
      <CssBaseline />
      <div>
        <LocalStorageBar
          data={getData()}
          getData={getData}
          setData={(data) => {
            saveData(data);
            refresh();
          }}
        />
        <Container>
          <Box m={5}>
            <EditorJSWrapper data={getData()} saveData={saveData} />
          </Box>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
