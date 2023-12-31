//* Libraries imports
import { t } from "elysia";

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
