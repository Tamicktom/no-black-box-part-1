const draw: {
  path: DrawFunction;
  paths: DrawFunctions;
} = {
  path: (ctx, path, color = "black") => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(...path[0]);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(...path[i]);
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  },
  paths: (ctx, paths, color = "black") => {
    for (const path of paths) {
      draw.path(ctx, path, color);
    }
  },
};

const generatePngFromPaths = (paths: NumberTuple[][]): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw.paths(ctx, paths);
    const url = canvas.toDataURL("image/png");
    resolve(url);
  });
};

export { draw, generatePngFromPaths };
