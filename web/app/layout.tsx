import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Nextart Community",
  description: "Nextart Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
