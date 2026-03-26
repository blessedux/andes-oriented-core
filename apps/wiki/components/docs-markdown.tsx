import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type DocsMarkdownProps = {
  content: string;
};

export function DocsMarkdown({ content }: DocsMarkdownProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
