import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkGfm) // Support GFM (tables, autolinks, task lists, strikethrough)
    .use(remarkRehype, { allowDangerousHtml: true }) // Turn markdown into HTML
    .use(rehypePrism) // Syntax highlighting
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeStringify, { allowDangerousHtml: true }) // Serialize HTML
    .process(markdown);

  return result.toString();
}
