import React from "react";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  return (
    <Card className="relative bg-zinc-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-zinc-400">{language}</span>
        </div>
        <button
          className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          <Copy size={14} />
          Copy
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-zinc-100">{code}</code>
      </pre>
      <div className="absolute top-0 right-0 px-4 py-2 text-xs text-zinc-400" />
    </Card>
  );
};

export default CodeBlock;
