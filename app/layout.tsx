import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { primaryFont, scriptFont, gorgeousFont } from './fonts'
import StyledComponentsRegistry from './registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Celebrate With Us - The Wedding of Roberta and Michael",
  description: "Celebrate With Us - The Wedding of Roberta and Michael",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${primaryFont.variable} ${scriptFont.variable} ${gorgeousFont.variable}`}>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
