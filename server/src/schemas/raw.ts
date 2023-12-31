//* Libraries imports
import { t } from "elysia";
import z from "zod";

export const dataSchema = t.Object({
  student: t.String(),
  session: t.Number(),
  drawings: t.Array(
    t.Object({
      label: t.String(),
      paths: t.Array(t.Array(t.Array(t.Number()))),
    })
  ),
});

export const dataSchemaZod = z.object({
  student: z.string(),
  session: z.number(),
  drawings: z.array(
    z.object({
      label: z.string(),
      paths: z.array(z.array(z.array(z.number()))),
    })
  ),
});
