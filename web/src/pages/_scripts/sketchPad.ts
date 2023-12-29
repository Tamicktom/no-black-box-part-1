import draw from "./draw";

class SketchPad {
  canvas = document.createElement("canvas");
  ctx = this.canvas.getContext("2d")!;
  #isDrawing = false;
  paths: NumberTuple[][] = [];
  constructor(container: HTMLElement, size = 512) {
    this.canvas.width = size;
    this.canvas.height = size;

    this.canvas.style.backgroundColor = "white";
    this.canvas.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";

    container.appendChild(this.canvas);

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
  }

  #redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);
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
}

const container = document.querySelector<HTMLDivElement>("#sketchPadContainer");

if (container) {
  new SketchPad(container);
}
