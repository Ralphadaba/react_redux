import Link from 'next/link';

import Header from '@/components/header';

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/about">About Us</Link></p>
    </main>
  );
}

//  <p><Link href="/about">About Us</Link></p>  // The <Link> here, unlike the previous <a> in Next ensures we maintain a Single Page Application when we navigate and unlike, React-router, it maintains the "href" and not "to"
