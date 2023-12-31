export type NumberTuple = [number, number];
export type DrawFunction = (
  ctx: CanvasRenderingContext2D,
  path: NumberTuple[],
  color?: string
) => void;
export type DrawFunctions = (
  ctx: CanvasRenderingContext2D,
  paths: NumberTuple[][],
  color?: string
) => void;
