const draw: Record<string, DrawFunction> = {};

draw.path = (ctx, path, color = "black") => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(...path[0]);
  for (const point of path) {
    ctx.lineTo(...point);
  }
  ctx.stroke();
};

export default draw;