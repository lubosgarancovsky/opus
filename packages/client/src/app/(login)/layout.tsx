import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import '../globals.css';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Login | Opus',
  description: 'Project managment tool'
};

export default async function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
