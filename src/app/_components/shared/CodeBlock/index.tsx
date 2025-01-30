interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language, showLineNumbers }: CodeBlockProps) {
  return (
    <pre className="relative rounded-lg bg-muted p-4 overflow-x-auto">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}
