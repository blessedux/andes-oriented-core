import Link from "next/link";

import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-24 text-center md:px-6 md:py-32">
      <div className="container max-w-3xl">
        <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          AndesOriCore Wiki
        </h1>
        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          Structural geology intelligence, documentation, and architecture in one place.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild className="bg-[#587CE9] hover:bg-[#4367d6]">
            <Link href="/docs">Documentation</Link>
          </Button>
          <Button variant="outline" className="border-gray-700" asChild>
            <Link href="https://github.com/blessedux/andes-oriented-core" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
