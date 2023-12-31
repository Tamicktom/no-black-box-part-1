type NumberTuple = [number, number];
type DrawFunction = (
  ctx: CanvasRenderingContext2D,
  path: NumberTuple[],
  color?: string
) => void;
type DrawFunctions = (
  ctx: CanvasRenderingContext2D,
  paths: NumberTuple[][],
  color?: string
) => void;
