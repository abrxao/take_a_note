import ModeToggleButton from "@/components/ModeToggleButton";
import Container from "@/components/Container";
import UserNotesSection from "@/sections/UserNotesSection";
import { Metadata } from "next";
import NewNoteDrawer from "@/components/NewNoteDrawer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Take a note",
  description: "Simple way to not forget the a 'million' ideia.",
};

export default function Home() {
  return (
    <>
      <header>
        <Container className="border-b border-zinc-300 dark:border-zinc-600 flex justify-between w-full">
          <h1 className="text-2xl font-bold">Take a note</h1>

          <ModeToggleButton />
        </Container>
      </header>
      <Container>
        <main className="min-h-screen">
          <div className="my-4">
            <NewNoteDrawer />
          </div>
          <UserNotesSection />
        </main>
      </Container>
      <Toaster />
    </>
  );
}
