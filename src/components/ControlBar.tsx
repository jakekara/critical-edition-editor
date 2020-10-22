import React, { useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  // StylesProvider,
} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import EditorJS from "@editorjs/editorjs";
import styles from "./ControlBar.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      maxWidth: 400,
      width: "90%",
      backgroundColor: theme.palette.background.paper,
      // border: "2px solid #000",
      borderRadius: 4,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function ControlBar(props: {
  instanceRef: EditorJS;
  clearData: () => void;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const classes = useStyles();
  const modalStyle = getModalStyle();

  const setOpen = () => setShowModal(true);
  const setClosed = () => setShowModal(false);

  if (!props.instanceRef) {
    return null;
  }

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <div>Really delete your draft?</div>
      <div className={styles.ButtonRow}>
        <div className={styles.ButtonWrapper}>
          {" "}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              props.clearData();
              setClosed();
            }}
          >
            Yes
          </Button>
        </div>
        <div className={styles.ButtonWraper}>
          {" "}
          <Button variant="contained" color="primary" onClick={setClosed}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Modal onClose={setClosed} open={showModal}>
        {modalBody}
      </Modal>
      <Button onClick={setOpen} variant="contained">
        Clear
      </Button>
    </div>
  );
}
