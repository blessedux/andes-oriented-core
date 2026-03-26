import Link from "next/link";
import { ReactNode } from "react";
import { Blocks, FileText, GanttChartSquare, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SiteFooter } from "@/components/site-footer";
import { DocItem, getDocsBySection } from "@/lib/docs";
import { cn } from "@/lib/utils";

type WikiShellProps = {
  docs: DocItem[];
  activeSlug?: string;
  children: ReactNode;
};

export function WikiShell({ docs, activeSlug, children }: WikiShellProps) {
  const groupedDocs = getDocsBySection(docs);

  const sectionIcon = {
    "Why This Technology": Sparkles,
    Architecture: Blocks,
    "User Flow": GanttChartSquare,
    Licenses: ShieldCheck,
    "Implementing Our Tech": FileText,
  } as const;

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b bg-background/60 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
            <Link href="/docs" className="font-semibold tracking-tight">
              AndesOriCore Wiki
            </Link>
            <Badge variant="secondary">Licensed Technology</Badge>
          </div>
        </header>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_1fr]">
          <aside>
            <Card className="bg-background/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Platform architecture and proprietary workflows.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {groupedDocs.map((group) => {
                  const Icon = sectionIcon[group.section];
                  return (
                    <div key={group.section} className="space-y-1">
                      <p className="px-2 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {group.section}
                      </p>
                      {group.docs.map((doc) => (
                        <Link
                          key={doc.slug}
                          href={`/docs/${doc.slug}`}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                            activeSlug === doc.slug && "bg-muted font-medium",
                          )}
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span>{doc.title}</span>
                        </Link>
                      ))}
                    </div>
                  );
                })}
                <Separator className="my-2" />
                <Link href="/docs" className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
                  Wiki home
                </Link>
              </CardContent>
            </Card>
          </aside>
          <main>{children}</main>
        </div>
        <SiteFooter />
      </div>
    </div>
  );
}
