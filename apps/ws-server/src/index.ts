import { WebSocketServer } from "ws";
import { prisma } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async function (ws, request) {
  const url = request.url;
  if (!url) {
    ws.send(JSON.stringify({ res: "not enough material" }));
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const username = queryParams.get("username");
  if (!username) {
    ws.send(JSON.stringify({ res: "not enough material" }));
    return;
  }

  try {
    if (typeof username !== "string") {
      ws.send(JSON.stringify({ res: "invalid type" }));
      return;
    }

    const user = await prisma.user.findFirst({ where: { username } });
    ws.send(JSON.stringify({ res: "created", user }));

    ws.on("message", function (data, _) {
      ws.send(`we got you bro ${user?.username}`);
    });

    ws.on("close", function () {
      console.log("user closed");
    });
  } catch (err) {
    ws.send(JSON.stringify({ res: "error" }));
  }
});
