import { Syne, DM_Sans, Space_Mono, Fraunces } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-d',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-b',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-m',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic'],
  variable: '--font-q',
  display: 'swap',
});

export const metadata = {
  title: 'TheStriveAds — The Living Library · 360° Marketing Agency, Dubai',
  description:
    'TheStriveAds is a brand-new 360° marketing agency in Dubai backed by 30+ years of global experience. Media buying, OOH/DOOH, social media, PR, events — all under one roof.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable} ${fraunces.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
