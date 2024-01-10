"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ModeToggle from "@/components/ModeToggleButton";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/queryClient";
import Container from "@/components/Container";

const inter = Inter({ subsets: ["latin"] });

/* export const metadata: Metadata = {
  title: "Take a note",
  description: "Simple way to not forget the a 'million' ideia.",
}; */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header>
              <Container className="border-b border-zinc-300 dark:border-zinc-600 flex justify-between w-full">
                <h1 className="text-2xl font-bold">Take a note</h1>

                <ModeToggle />
              </Container>
            </header>
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
