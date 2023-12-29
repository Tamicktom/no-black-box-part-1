import draw from "./draw";

class SketchPad {
  canvas = document.createElement("canvas");
  ctx = this.canvas.getContext("2d")!;
  #isDrawing = false;
  paths: NumberTuple[][] = [];

  undoBtn = document.createElement("button");

  constructor(container: HTMLElement, size = 512) {
    this.canvas.width = size;
    this.canvas.height = size;

    this.canvas.style.backgroundColor = "white";
    this.canvas.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";

    container.appendChild(this.canvas);

    const lineBreak = document.createElement("br");
    container.appendChild(lineBreak);

    this.undoBtn.innerText = "Undo";
    container.appendChild(this.undoBtn);

    this.#isDrawing = false;
    this.paths = [];

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      const mouse = this.#getMousePosition(e);
      this.paths.push([mouse]);
      this.#isDrawing = true;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.#isDrawing) {
        this.#isDrawing = true;
        const mouse = this.#getMousePosition(e);
        const lastPath: number[][] = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#redraw();
      }
    });

    this.canvas.addEventListener("mouseup", () => {
      this.#isDrawing = false;
    });

    this.canvas.ontouchstart = (e) => {
      const loc = e.touches[0];
      this.canvas.dispatchEvent(
        new MouseEvent("mousedown", {
          clientX: loc.clientX,
          clientY: loc.clientY,
        })
      );
    };

    this.canvas.ontouchmove = (e) => {
      const loc = e.touches[0];
      this.canvas.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: loc.clientX,
          clientY: loc.clientY,
        })
      );
    };

    this.canvas.ontouchend = () => {
      this.canvas.dispatchEvent(new MouseEvent("mouseup", {}));
    };

    this.undoBtn.addEventListener("click", () => {
      this.paths.pop();
      this.#redraw();
    });

    this.undoBtn.classList.add(
      "px-4",
      "py-2",
      "bg-gray-200",
      "rounded-lg",
      "shadow-md",
      "hover:bg-gray-300",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-gray-400",
      "focus:ring-opacity-50",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
      "disabled:shadow-none",
      "disabled:bg-gray-200",
      "disabled:hover:bg-gray-200",
      "transition-all",
      "duration-200"
    );
  }

  #redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);

    if (this.paths.length === 0) {
      this.undoBtn.disabled = true;
    } else {
      this.undoBtn.disabled = false;
    }
  }

  #getMousePosition(e: MouseEvent | TouchEvent): NumberTuple {
    const rectangle = this.canvas.getBoundingClientRect();
    if (e instanceof MouseEvent) {
      return [e.clientX - rectangle.left, e.clientY - rectangle.top];
    } else {
      const loc = e.touches[0];
      return [loc.clientX - rectangle.left, loc.clientY - rectangle.top];
    }
  }

  reset() {
    this.paths = [];
    this.#redraw();
  }
}

const container = document.querySelector<HTMLDivElement>(
  "#sketchPadContainer"
)!;
let sketchpad: SketchPad = new SketchPad(container);

let index = 0;
const labels = ["pikachu", "bulbasaur", "charmander", "squirtle", "mew"];

type Data = {
  student: string;
  session: number;
  drawings: {
    label: string;
    paths: NumberTuple[][];
  }[];
};

const data: Data = {
  student: "",
  session: new Date().getTime(),
  drawings: [],
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
  studentInput.classList.add("invisible");

  const label = labels[index];
  instructions.innerText = `Draw a ${label}`;
  advanceBtn.innerText = "Next";
  advanceBtn.onclick = next;
  advanceBtn.disabled = false;
}

function next() {
  if (sketchpad.paths.length === 0) return alert("Please draw something");

  const draw = labels[index];
  data.drawings.push({
    label: draw,
    paths: sketchpad.paths,
  });
  sketchpad.reset();

  if (index + 1 < labels.length) {
    index++;
    const nextLabel = labels[index];
    instructions.innerText = `Draw a ${nextLabel}`;
  } else {
    container.classList.add("invisible");
    instructions.innerText = "Thank you for participating!";
    advanceBtn.innerHTML = "Save";
    advanceBtn.onclick = save;
  }
}

function save() {
  advanceBtn.classList.add("invisible");
  instructions.innerText =
    "Take your downloaded file and place it in the 'drawings' folder in the root of this project";

  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
  );
}
