import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers, Sidebar } from '@/components';
import { auth } from '@/auth';
import '../globals.css';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Opus',
  description: 'Project managment tool'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <Providers session={session}>
        <body className={font.className}>
          <Sidebar />
          <div className="ml-48 p-12">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
