import { prisma } from "@repo/db/client";

export default async function Home() {
  const user = (await prisma.user.findFirst())?.username ?? "not found";
  return <div>username: {user}</div>;
}
