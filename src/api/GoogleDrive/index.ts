import { gapi } from "gapi-script";
import { config } from "dotenv";
import { DISCOVERY_DOCS, SCOPES, API_KEY, CLIENT_ID } from "./constants";
import { CloudItem, CloudStorageAPI, CloudUser, CloudLoggedInStatus, CloudStorageAPIOptions } from "../CloudStorageApi"
config(); // I just don't like mixing import and require

export class GoogleDrive implements CloudStorageAPI<CloudStorageAPIOptions> {
    protected _clientInitialized: boolean;
    protected _loggedInStatusCallback: (status: CloudLoggedInStatus) => void;

    constructor(options: { updateLoggedInStatus: (status: CloudLoggedInStatus) => void }) {

        this._clientInitialized = false;
        this._loggedInStatusCallback = options.updateLoggedInStatus;

        this.listFiles = this.listFiles.bind(this);
        this.load = this.load.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.setLoggedInStatus = this.setLoggedInStatus.bind(this);

        this.load()

    }

    protected setLoggedInStatus(loggedIn: boolean) {

        interface GoogleNameObject {
            displayName: string,
            metadata: { primary: boolean }
        }

        let newStatus: CloudLoggedInStatus = {
            loggedIn
        }

        if (!loggedIn) {
            this._loggedInStatusCallback(newStatus);
            return;
        }

        gapi.client.people.people
            .get({
                resourceName: "people/me",
                "requestMask.includeField": "person.names",
            })
            .then((response: { result: { names: Array<GoogleNameObject> } }) => {
                const names = response.result.names.filter((n) => {
                    console.log("Filtering ", n);
                    return n.metadata.primary === true;
                });
                if (names.length !== 1) {
                    return;
                }
                const name = names[0];
                newStatus.user = {
                    name: name.displayName,
                    id: name.displayName
                }
                this._loggedInStatusCallback(newStatus)
            })
    }

    login(options: any): void {
        gapi.auth2.getAuthInstance().signIn();
    }
    logout(): void {
        gapi.auth2.getAuthInstance().signOut();
    }

    listFiles(options: {
        parentDirectory?: string
    }): Promise<Array<CloudItem>> {
        const parentDir = options.parentDirectory || "root"

        return new Promise((resolve, reject) => {
            if (!gapi.client) {
                reject("no client")
            }
            gapi.client.drive.files
                .list({
                    pageSize: 10,
                    fields: "*", // TODO - Refine this in production //"nextPageToken, files(id, name)",
                })
                .then(function (response: { result: { files: any; }; }) {
                    const files: Array<CloudItem> = (response.result.files || []).map((f: { id: string, name: string, mimeType: string }): CloudItem => {
                        const { id, name } = f;
                        return { id, name, isFolder: f.mimeType === "application/vnd.google-apps.folder" }
                    });
                    resolve(files);
                })
                .catch(function (error: any) {
                    reject(error)
                });
        });

    }

    load(): void {

        gapi.load("client:auth2", () => {
            if (this._clientInitialized) {
                return;
            }

            console.log("gapi.client", gapi.client);

            gapi.client
                .init({
                    apiKey: API_KEY,
                    client_id: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                })
                .then(() => {
                    // Listen for sign-in state changes.
                    gapi.auth2
                        .getAuthInstance()
                        .isSignedIn.listen(this.setLoggedInStatus);

                    // Handle the initial sign-in state.
                    this.setLoggedInStatus(
                        gapi.auth2.getAuthInstance().isSignedIn.get()
                    );

                    this._clientInitialized = true;

                })
                .catch((err: any) => {
                    console.error("Caught error", err);
                });
        });
    }
}
