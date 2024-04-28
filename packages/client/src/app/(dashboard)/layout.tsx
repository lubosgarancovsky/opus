import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Providers, Sidebar } from '@/components';
import { auth } from '@/auth';
import '../globals.css';

const font = Nunito({ subsets: ['latin'] });

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
          <div className="grid grid-cols-12">
            <nav className="col-span-2 bg-white">
              <Sidebar />
            </nav>
            <div className="col-span-10 p-12">{children}</div>
          </div>
        </body>
      </Providers>
    </html>
  );
}
