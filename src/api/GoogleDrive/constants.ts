/**
 * Constants for the API connection
 */
export const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    "https://www.googleapis.com/discovery/v1/apis/people/v1/rest",
];
export const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";
export const API_KEY = process.env.REACT_APP_GAPI_API_KEY;
export const CLIENT_ID = process.env.REACT_APP_GAPI_CLIENT_ID;
