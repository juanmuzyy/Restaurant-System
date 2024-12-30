import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.scss'



export const metadata: Metadata = {
  title: "Sujeito Pizza - A melhor pizzaria ",
  description: "A melhor pizzaria da região",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  >
        {children}
      </body>
    </html>
  );
}