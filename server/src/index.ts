import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia().get("/", () => "Hello Elysia");

app.use(cors());

const dataSchema = t.Object({
  student: t.String(),
  session: t.Number(),
  drawings: t.Array(
    t.Object({
      label: t.String(),
      paths: t.Array(t.Array(t.Array(t.Number()))),
    })
  ),
});

//receave data on /post
app.post(
  "/post",
  ({ body }) => {
    //save data to .json file
    const storage = "./dataset/";
    const fileName = `data-${body.session}.json`;
    Bun.write(storage + fileName, JSON.stringify(body));

    return {
      message: "data saved",
    };
  },
  {
    body: dataSchema,
  }
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
