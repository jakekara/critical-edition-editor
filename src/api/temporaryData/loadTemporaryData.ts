import { OutputData, OutputBlockData } from "@editorjs/editorjs";
import { defaults } from "./common";

export default function loadTemporaryData(): OutputData | undefined {
  const data = localStorage.getItem(defaults.localStorageKey);
  if (!data) {
    return;
  }

  const parsedData = JSON.parse(data);

  let version: string | undefined;
  let blocks: Array<OutputBlockData> = [];
  let time: number | undefined;

  if (parsedData.version && typeof parsedData.version === "string") {
    version = parsedData.version;
  }
  if (parsedData.time && typeof parsedData.time === "number") {
    time = parsedData.time;
  }
  if (parsedData.blocks && Array.isArray(parsedData.blocks)) {
    parsedData.blocks.forEach((b: OutputBlockData) => {
      if (!b.data || !b.type) {
        console.warn("Invalid block data", b);
      }
      blocks.push(b);
    });
  }

  const ret = {
    version,
    blocks,
    time,
  };

  return ret;
}
