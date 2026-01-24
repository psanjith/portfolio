import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prakul.dev"),
  title: "Prakul Sanjith | Full-Stack Developer & AI Engineer",
  description: "Building AI workflow tools and reliable full-stack products across TypeScript/React and Python. Portfolio showcasing LinkMCP, AI Resume Generator, and OOP Banking System.",
  keywords: ["Full-Stack Developer", "AI Engineer", "TypeScript", "React", "Python", "Next.js", "Web Development"],
  authors: [{ name: "Prakul Sanjith" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://prakul.dev",
    title: "Prakul Sanjith | Full-Stack Developer & AI Engineer",
    description: "Building AI workflow tools and reliable full-stack products across TypeScript/React and Python. Portfolio showcasing LinkMCP, AI Resume Generator, and OOP Banking System.",
    siteName: "Prakul Sanjith Portfolio",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Prakul Sanjith Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakul Sanjith | Full-Stack Developer & AI Engineer",
    description: "Building AI workflow tools and reliable full-stack products across TypeScript/React and Python.",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://prakul.dev",
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f8fafc" />
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
