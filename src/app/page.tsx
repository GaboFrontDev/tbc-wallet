import Link from "next/link";
import Title from "./components/Title";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-16">
      <Link className="my-2 w-full" href={"/admin"}>
        <Title className="text-[45px]">Admin</Title>
      </Link>
      <Link className="my-2" href={"/qr"}>
        <Title className="text-[45px]">Mi Cuenta</Title>
      </Link>
    </main>
  );
}
