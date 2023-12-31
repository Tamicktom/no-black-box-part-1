import { SketchPad } from "./sketchPad";
import { generatePngFromPaths } from "./draw";

const LABELS: string[] = ["circle", "square", "triangle", "heart", "star"];
let index: number = 0;

const container = document.querySelector<HTMLDivElement>(
  "#sketchPadContainer"
)!;

let sketchpad: SketchPad = new SketchPad(container);

type Data = {
  student: string;
  session: number;
  drawings: {
    label: string;
    paths: NumberTuple[][];
  }[];
  pngs: string[];
};

const data: Data = {
  student: "",
  session: new Date().getTime(),
  drawings: [],
  pngs: [],
};

const studentInput = document.querySelector<HTMLInputElement>("#student")!;
const advanceBtn = document.querySelector<HTMLButtonElement>("#advanceBtn")!;
const instructions = document.querySelector<HTMLSpanElement>("#intructions")!;

advanceBtn.addEventListener("click", () => {
  if (studentInput.value) {
    data.student = studentInput.value;
    studentInput.disabled = true;
    advanceBtn.disabled = true;
    start();
  }
});

function start() {
  if (!data.student) return alert("Please enter your name");
  const sketchPadContainer = document.querySelector<HTMLDivElement>(
    "#sketchPadContainer"
  )!;
  sketchPadContainer.classList.remove("invisible");
  studentInput.classList.add("invisible", "pointer-events-none", "hidden");

  const label = LABELS[index];
  instructions.innerText = `Draw a ${label}`;
  advanceBtn.innerText = "Next";
  advanceBtn.onclick = next;
  advanceBtn.disabled = false;
}

function next() {
  if (sketchpad.paths.length === 0) return alert("Please draw something");

  const draw = LABELS[index];
  generatePngFromPaths(sketchpad.paths).then((png) => {
    data.drawings.push({
      label: draw,
      paths: sketchpad.paths,
    });
    data.pngs.push(png);
    sketchpad.reset();

    if (index + 1 < LABELS.length) {
      index++;
      const nextLabel = LABELS[index];
      instructions.innerText = `Draw a ${nextLabel}`;
    } else {
      container.classList.add("invisible", "pointer-events-none", "hidden");
      instructions.innerText = "Thank you for participating!";
      advanceBtn.innerHTML = "Save";
      save();
    }
  });
}

function save() {
  advanceBtn.classList.add("invisible");

  const body = new FormData();

  body.append("student", data.student);
  body.append("session", data.session.toString());
  body.append("drawings", JSON.stringify(data.drawings));
  //convert pngs to files
  const pngs = data.pngs.map((png, i) => {
    const blob = fetch(png).then((res) => {
      res.blob().then((blob) => {
        
      });
    });
  });

  const url = "http://192.168.100.10:3000/post";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body,
  };

  fetch(url, options)
    .then((res) => res.json())
    .then(() => {
      instructions.innerText = "Your drawing has been saved!";
    })
    .catch((err) => {
      console.error(err);
      instructions.innerText = "Something went wrong :(";
    });
}
