import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import QueryProvider from "../components/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LogPulse | Dashboard",
  description: "Real-time error tracking and observability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required by next-themes
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-zinc-50 dark:bg-zinc-950`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
