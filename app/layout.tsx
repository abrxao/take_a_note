"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ModeToggle from "@/components/ModeToggleButton";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/queryClient";
import Container from "@/components/Container";
import NewNoteDrawer from "@/components/NewNoteDrawer";

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
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
