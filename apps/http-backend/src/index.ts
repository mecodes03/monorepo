import express from "express";
import cors from "cors";
import { prisma } from "@repo/db/client";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/user", async (req, res) => {
  console.log("get request");
  const { username } = req.body;
  if (!username) {
    res.json({ res: "not enough material" });
    return;
  }

  try {
    if (typeof username !== "string") {
      res.send({ res: "invalid type" });
      return;
    }

    const user = await prisma.user.findFirst({ where: { username } });
    res.json({ res: "created", user });
  } catch (err) {
    res.json({ res: "error" });
  }

  res.json({ response: "this your response buddy" });
});

app.post("/add", async (req, res) => {
  const { name, username } = req.body;
  if (!name || !username) {
    res.json({ res: "not enough material" });
    return;
  }

  try {
    if (typeof name !== "string" || typeof username !== "string") {
      res.send({ res: "invalid type" });
      return;
    }

    await prisma.user.create({ data: { name, username } });
    res.json({ res: "created" });
  } catch (err) {
    res.json({ res: "error" });
  }
});

app.listen(PORT, () => {
  console.log("http backend is running on port 4000");
});
