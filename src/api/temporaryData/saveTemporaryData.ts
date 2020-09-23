import { OutputData } from "@editorjs/editorjs";
import { defaults } from "./common";

export default function saveTemporaryData(data: OutputData) {
    localStorage.setItem(defaults.localStorageKey, JSON.stringify(data));
}