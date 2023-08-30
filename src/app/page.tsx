import Link from "next/link";
import Title from "./components/Title";
import LinkWithAction from "./components/LinkWithAction";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-16">
      <LinkWithAction href={"/admin"}>
        <Title className="text-[45px]">Admin</Title>
      </LinkWithAction>
      <LinkWithAction href={"/qr"}>
        <Title className="text-[45px]">Mi Cuenta</Title>
      </LinkWithAction>
    </main>
  );
}