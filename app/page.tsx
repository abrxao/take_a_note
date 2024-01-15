import ModeToggleButton from "@/components/ModeToggleButton";
import Container from "@/components/Container";
import UserNotesSection from "@/sections/UserNotesSection";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import TagFilter from "@/components/TagFilter";

export const metadata: Metadata = {
  title: "Take a note",
  description: "Simple way to not forget the a 'million' ideia.",
};

export default function Home() {
  return (
    <>
      <header>
        <Container className="border-b border-zinc-300 dark:border-zinc-600 flex justify-between w-full">
          <h1 className="text-xl lg:text-2xl font-bold" translate="no">
            Take a note
          </h1>
          <div className="flex gap-2">
            <TagFilter />
            <ModeToggleButton />
          </div>
        </Container>
      </header>
      <Container className="py-0 lg:py-0">
        <main className="min-h-screen">
          <UserNotesSection />
        </main>
      </Container>
      <Toaster />
    </>
  );
}
