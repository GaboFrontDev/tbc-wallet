import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={'/admin'}> Admin </Link>
      <Link href={'/account'}> Consultar Saldo </Link>
      <Link href={'/qr'}> Mi cuenta </Link>
    </main>
  );
}
