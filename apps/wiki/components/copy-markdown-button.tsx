"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type CopyMarkdownButtonProps = {
  content: string;
};

export function CopyMarkdownButton({ content }: CopyMarkdownButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button variant="secondary" size="sm" onClick={onCopy}>
      {copied ? "Copied full markdown" : "Copy full markdown"}
    </Button>
  );
}
