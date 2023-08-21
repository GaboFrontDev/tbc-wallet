import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link className='my-2' href={'/admin'}> Admin </Link>
      <Link className='my-2' href={'/qr'}> Mi cuenta </Link>
    </main>
  );
}
