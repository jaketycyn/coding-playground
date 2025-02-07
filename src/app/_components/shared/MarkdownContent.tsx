"use client";

import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import CodeBlock from "./CodeBlock";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent: FC<MarkdownContentProps> = ({ content, className }) => {
  return (
    <ReactMarkdown
      className={cn("space-y-6", className)}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1
            className="scroll-m-20 text-4xl font-bold tracking-tight"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
        ),
        li: ({ node, ...props }) => <li className="leading-7" {...props} />,
        a: ({ node, ...props }) => (
          <a
            className="font-medium underline underline-offset-4 hover:text-primary"
            {...props}
          />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="mt-6 border-l-2 border-muted pl-6 italic"
            {...props}
          />
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || "");

          if (inline) {
            return (
              <code
                className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
                {...props}
              >
                {children}
              </code>
            );
          }

          const language = match ? match[1] : "plaintext";
          const code = String(children).replace(/\n$/, "");

          return (
            <div className="relative my-6 rounded-lg">
              <CodeBlock code={code} language={language} />
            </div>
          );
        },
        pre: ({ node, ...props }) => (
          <pre className="overflow-x-auto" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
