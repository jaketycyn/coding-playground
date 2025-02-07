"use client";
import { useMarkdown } from "@/lib/hooks/useMarkdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkDownContent = ({ content, className = "" }: MarkdownContentProps) => {
  const { html, isLoading, error } = useMarkdown(content);

  if (isLoading) {
    return <div className="text-foreground">...</div>;
  }

  if (error) {
    return (
      <div className="text-destructive">
        Error processing markdown: {error.message}
      </div>
    );
  }

  return (
    <div
      className={`prose prose-lg prose-invert max-w-none
          prose-headings:text-foreground
          prose-p:text-foreground
          prose-strong:text-foreground
          prose-ul:text-foreground
          prose-ol:text-foreground
          prose-blockquote:text-foreground
          prose-code:text-foreground
          ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkDownContent;
