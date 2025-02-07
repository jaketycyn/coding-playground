import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

// Register common languages
const languages = {
  javascript: true,
  typescript: true,
  jsx: true,
  tsx: true,
  python: true,
  java: true,
  cpp: true,
  c: true,
  "c++": true,
  ruby: true,
  go: true,
  rust: true,
  php: true,
  shell: true,
  bash: true,
  sql: true,
  json: true,
  yaml: true,
  markdown: true,
  html: true,
  css: true,
  scss: true,
  less: true,
  xml: true,
};

export async function markdownToHtml(markdown: string) {
  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, {
        allowDangerousHtml: true,
        handlers: {},
      })
      .use(rehypePrism, {
        showLineNumbers: true,
        ignoreMissing: true,
        aliases: {
          js: "javascript",
          ts: "typescript",
          py: "python",
        },
      })
      .use(rehypeSlug)
      .use(rehypeStringify, {
        allowDangerousHtml: true,
        quoteSmart: true,
        closeSelfClosing: true,
        omitOptionalTags: false,
        entityReferences: {
          useShortestReferences: true,
        },
        entities: {
          useNamedReferences: true,
        },
      })
      .process(markdown);

    return result.toString();
  } catch (error) {
    console.error("Error processing markdown:", error);
    throw error;
  }
}

// Helper function to check if a language is supported
export function isLanguageSupported(lang: string): boolean {
  return lang.toLowerCase() in languages;
}

// Helper function to get supported languages
export function getSupportedLanguages(): string[] {
  return Object.keys(languages);
}
