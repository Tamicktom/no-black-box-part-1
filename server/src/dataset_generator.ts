//* Libraries imports
import { t } from "elysia";
import fs from "node:fs";

//* Local imports
import constants from "./constants";

const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;

fileNames.map((fileName) => {
  //process only .json files
  if (fileName.includes(".json")) {
    console.log(`Processing ${fileName}...`);
  }
});
