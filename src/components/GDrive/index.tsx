import React, { ReactElement, useEffect, useState } from "react";
import { GoogleDrive } from "../../api/GoogleDrive";
import { CloudLoggedInStatus } from "../../api/CloudStorageApi";

function LogInOutButton(options: {
  loggedIn: boolean;
  logIn: (options: any) => void;
  logOut: () => void;
}): ReactElement {
  const { loggedIn, logIn, logOut } = options;
  const buttonText = loggedIn ? "Log out" : "Log in";
  const buttonAction = loggedIn ? logOut : logIn;

  return <button onClick={buttonAction}>{buttonText}</button>;
}

export function GDrive(): ReactElement {
  const [loggedInStatus, updateLoggedInStatus] = useState<CloudLoggedInStatus>({
    loggedIn: false,
  });
  //   const [initiatedClient, setInitiatedClient] = useState<boolean>(false);
  const [gdrive, setGDrive] = useState<GoogleDrive | undefined>();

  useEffect(() => {
    if (gdrive) {
      console.warn("useEffect called unnecessarily");
      return;
    }
    // if (initiated){ return }

    setGDrive(
      new GoogleDrive({
        updateLoggedInStatus,
      })
    );
  }, [gdrive]);

  if (!gdrive) {
    return <div>Loading...</div>;
  }

  if (loggedInStatus.loggedIn) {
    console.log(
      gdrive
        .listFiles({})
        .then((files) => {
          console.log("Resolved files");
          files.forEach((f) => {
            console.log(f.isFolder ? "Folder" : "File", f);
          });
        })
        .catch((error) => {
          console.error("Error loading files", error);
        })
    );
  }
  return (
    <div>
      <div>
        You are {loggedInStatus.loggedIn ? "" : "not"} signed in{" "}
        {loggedInStatus.user ? `as the ${loggedInStatus.user.name}` : ""}
      </div>

      <LogInOutButton
        loggedIn={loggedInStatus.loggedIn}
        logIn={gdrive.login}
        logOut={gdrive.logout}
      />
    </div>
  );
}
