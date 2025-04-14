import type React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Food & Drink App",
  description: "Discover the best food and drink options",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${roboto.className} bg-black text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
