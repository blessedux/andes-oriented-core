import Link from "next/link";
import { Blocks, FileText, GanttChartSquare, ShieldCheck, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WikiShell } from "@/components/wiki-shell";
import { getAllDocs, getDocsBySection } from "@/lib/docs";

export default function DocsHomePage() {
  const docs = getAllDocs();
  const groupedDocs = getDocsBySection(docs);
  const sectionMeta = {
    "Why This Technology": {
      icon: Sparkles,
      subtitle:
        "Understand the practical and strategic value of AndesOriCore versus traditional structural logging methods.",
    },
    Architecture: {
      icon: Blocks,
      subtitle: "Core geometry models, truth layers, and structural data foundations.",
    },
    "User Flow": {
      icon: GanttChartSquare,
      subtitle: "End-to-end measurement flow across capture, editing, and persistence.",
    },
    Licenses: {
      icon: ShieldCheck,
      subtitle: "Licensing scope, proprietary boundaries, and authorized usage.",
    },
    "Implementing Our Tech": {
      icon: FileText,
      subtitle: "Technical implementation details for teams integrating the platform.",
    },
  } as const;

  return (
    <WikiShell docs={docs}>
      <Card className="bg-background/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>AndesOriCore Technical Documentation</CardTitle>
          <CardDescription>
            This wiki explains what the platform does, why it is differentiated, and how key
            proprietary algorithms operate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            The documentation in this repository is generated from markdown files in{" "}
            <code>apps/wiki/docs</code>. It is intended for users, technical teams, and decision
            makers evaluating platform capabilities.
          </p>
          <p>
            Start with Why This Technology, then continue with architecture, user flow, licensing,
            and implementation details.
          </p>
          <div className="space-y-5">
            {groupedDocs.map((group) => {
              const meta = sectionMeta[group.section];
              const Icon = meta.icon;
              return (
                <section key={group.section} className="rounded-lg border bg-background/35 p-4 backdrop-blur-md">
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">{group.section}</h3>
                  </div>
                  <p className="mb-3 text-xs">{meta.subtitle}</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {group.docs.map((doc) => (
                      <Link
                        key={doc.slug}
                        href={`/docs/${doc.slug}`}
                        className="rounded-lg border bg-background/35 p-3 backdrop-blur-md hover:bg-muted/60"
                      >
                        <p className="font-medium text-foreground">{doc.title}</p>
                        {doc.description ? <p className="mt-1 text-xs">{doc.description}</p> : null}
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </WikiShell>
  );
}
