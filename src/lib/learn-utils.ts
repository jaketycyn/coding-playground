import fs from "fs/promises";
import path from "path";
import { markdownToHtml } from "./mdx-utils";

export interface LearningArticle {
  title: string;
  content: string;
  metadata?: {
    datePublished?: string;
    category?: string;
  };
}

/**
 * Retrieves a learning article by its ID
 * @param articleId - The identifier for the article
 * @returns Promise<LearningArticle | null>
 */
export async function getLearningArticle(
  articleId: string
): Promise<LearningArticle | null> {
  try {
    // Construct the path to the article
    const contentDir = path.join(process.cwd(), "content", "learn");
    const articlePath = path.join(contentDir, `${articleId}.md`);

    // Read the markdown file
    const content = await fs.readFile(articlePath, "utf-8");

    // Split the content into frontmatter and body if it exists
    const [, frontmatter, body] = content.match(
      /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    ) || [null, "", content];

    // Parse frontmatter if it exists
    const metadata = frontmatter ? parseFrontmatter(frontmatter) : {};

    // Convert markdown content to HTML
    const processedContent = await markdownToHtml(body);

    return {
      title: metadata.title || articleId,
      content: processedContent,
      metadata: {
        datePublished: metadata.datePublished,
        category: metadata.category,
      },
    };
  } catch (error) {
    console.error(`Error fetching article ${articleId}:`, error);
    return null;
  }
}

/**
 * Simple frontmatter parser
 * @param frontmatter - YAML frontmatter string
 * @returns Record<string, string>
 */
function parseFrontmatter(frontmatter: string): Record<string, string> {
  const lines = frontmatter.split("\n");
  const metadata: Record<string, string> = {};

  for (const line of lines) {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      metadata[key.trim()] = valueParts.join(":").trim();
    }
  }

  return metadata;
}
