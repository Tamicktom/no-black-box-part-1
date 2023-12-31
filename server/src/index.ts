//* Libraries imports
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

//* Local imports
import { dataSchema } from "./schemas/raw";

const app = new Elysia().get("/", () => "Hello Elysia");

app.use(cors());

//receave data on /post
app.post(
  "/post",
  ({ body }) => {
    //save data to .json file
    const storage = "./data/raw/";
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
