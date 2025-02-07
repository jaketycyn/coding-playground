import { useMarkdown } from "@/lib/hooks/useMarkdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkDownContent = ({ content, className = "" }: MarkdownContentProps) => {
  const { html, isLoading, error } = useMarkdown(content);

  if (isLoading) {
    return <div className="">...</div>;
  }

  if (error) {
    return <div className="">Error processing markdown: {error.message}</div>;
  }

  return (
    <div
      className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkDownContent;
