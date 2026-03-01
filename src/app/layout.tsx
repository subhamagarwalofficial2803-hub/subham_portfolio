import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL('https://subhamagarwal.me'),
  title: 'Subham Agarwal | Senior Java Backend Engineer | Spring Boot & Microservices',
  description: 'Senior Java Backend Engineer with 5+ years of experience building scalable microservices, secure REST APIs, and production-ready enterprise systems using Spring Boot and Java.',
  openGraph: {
    title: 'Subham Agarwal | Senior Java Backend Engineer',
    description: 'Senior Java Backend Engineer with 5+ years of experience building scalable microservices, secure REST APIs, and production-ready enterprise systems.',
    images: ['/assets/images/hero-image.png'],
    type: 'website',
    url: 'https://subhamagarwal.me',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
