type Constants = {
  DATA_DIR: string;
  RAW_DIR: string;
  DATASET_DIR: string;
  JSON_DIR: string;
  IMG_DIR: string;
  SAMPLES: string;
};

const constants: Constants = {
  DATA_DIR: "",
  RAW_DIR: "",
  DATASET_DIR: "",
  JSON_DIR: "",
  IMG_DIR: "",
  SAMPLES: "",
};

constants.DATA_DIR = "../data";
constants.RAW_DIR = `${constants.DATA_DIR}/raw`;
constants.DATASET_DIR = `${constants.DATA_DIR}/dataset`;
constants.JSON_DIR = `${constants.DATASET_DIR}/json`;
constants.IMG_DIR = `${constants.DATASET_DIR}/img`;
constants.SAMPLES = `${constants.DATASET_DIR}/samples.json`;

export default constants;
