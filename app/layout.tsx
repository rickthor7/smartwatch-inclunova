import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'INCLUNOVA Smartwatch — Tiny Smart Learning Companion',
  description: 'Prototipe antarmuka smartwatch pembelajaran inklusif anak sekolah berbasis Next.js dengan frame interaktif.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
