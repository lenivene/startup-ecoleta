import express, { json } from "express";

const app = express();
const port = process.env.PORT || 3333;

app.use(json());

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.listen(port, () => {
  console.log(`⚡️ Server listening on http://localhost:${port}`);
});
