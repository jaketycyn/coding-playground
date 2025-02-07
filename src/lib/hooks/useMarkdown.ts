import { useState, useEffect } from "react";
import { markdownToHtml } from "../mdx-utils";

export function useMarkdown(content: string) {
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function processMarkdown() {
      try {
        setIsLoading(true);
        const processed = await markdownToHtml(content);
        setHtml(processed);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to process markdown")
        );
      } finally {
        setIsLoading(false);
      }
    }

    processMarkdown();
  }, [content]);

  return { html, isLoading, error };
}
