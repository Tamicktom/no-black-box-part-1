import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia().get("/", () => "Hello Elysia");

app.use(cors());

//receave data on /post
app.post(
  "/post",
  ({ body }) => {
    //save data to .json file
    const storage = "./dataset/";
    const fileName = `${body.student}-${body.session}.json`;
    Bun.write(storage + fileName, JSON.stringify(body));

    return {
      message: "data saved",
    };
  },
  {
    body: t.Object({
      student: t.String(),
      session: t.Number(),
      drawings: t.Array(
        t.Object({
          label: t.String(),
          paths: t.Array(t.Array(t.Array(t.Number()))),
        })
      ),
    }),
  }
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
