//* Libraries imports
import fs from "node:fs";

//* Local imports
import constants from "./constants";
import { dataSchemaZod } from "./schemas/raw";

type Sample = {
  id: number;
  label: string;
  student_name: string;
  student_id: number;
};

const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples: Sample[] = [];
let id = 1;

fileNames.map((fileName) => {
  //process only .json files
  if (fileName.includes(".json")) {
    const content = fs.readFileSync(constants.RAW_DIR + "/" + fileName);
    const data = JSON.parse(content.toString());
    const { session, drawings, student } = dataSchemaZod.parse(data);
    for (let label in drawings) {
      samples.push({
        id,
        label,
        student_name: student,
        student_id: session,
      });
      id++;
    }
  }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));
