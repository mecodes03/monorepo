import { prisma } from "@repo/db/client";

export default async function Home() {
  const user = (await prisma.user.findFirst())?.username ?? "not found";
  return <div>the user's username is - : {user}</div>;
}
