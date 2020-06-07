import express, { json } from "express";
import cors from "cors";
import path from "path";
import { errors } from "celebrate";

import routes from "./routes";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(json());
app.use(routes);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(errors());

app.listen(port, () => {
  console.log(`⚡️ Server listening on http://localhost:${port}`);
});
