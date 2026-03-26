import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { CopyMarkdownButton } from "@/components/copy-markdown-button";
import { DocsMarkdown } from "@/components/docs-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WikiShell } from "@/components/wiki-shell";
import { getAllDocs, getDocBySlug } from "@/lib/docs";

type DocPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const docs = getAllDocs();
  const doc = getDocBySlug(slug);

  if (!doc) notFound();

  const currentIndex = docs.findIndex((item) => item.slug === doc.slug);
  const prevDoc = currentIndex > 0 ? docs[currentIndex - 1] : null;
  const nextDoc = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null;

  return (
    <WikiShell docs={docs} activeSlug={doc.slug}>
      <Card className="bg-background/50 backdrop-blur-xl">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>{doc.title}</CardTitle>
            <CopyMarkdownButton content={doc.content} />
          </div>
        </CardHeader>
        <CardContent>
          <DocsMarkdown content={doc.content} />
          <div className="mt-10 flex items-center justify-between border-t pt-6">
            {prevDoc ? (
              <Button asChild variant="outline">
                <Link href={`/docs/${prevDoc.slug}`}>
                  <ChevronLeft className="mr-2 h-4 w-4 text-muted-foreground" />
                  Previous
                </Link>
              </Button>
            ) : (
              <div />
            )}
            {nextDoc ? (
              <Button asChild variant="outline">
                <Link href={`/docs/${nextDoc.slug}`}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </CardContent>
      </Card>
    </WikiShell>
  );
}
