import path from "path";
import { BaseArticle, ArticleOptions } from "../types/articles";
import {
  validateArticleFile,
  readArticleFile,
  getArticleFiles,
  matchesFilters,
  sortArticlesByDate,
} from "./utils";

export async function getArticles(
  options: ArticleOptions
): Promise<BaseArticle[]> {
  if (!options.type) {
    throw new Error("Article type is required");
  }

  const contentDir = path.join(process.cwd(), "content", options.type);

  try {
    // Get all markdown files in the directory
    const files = await getArticleFiles(contentDir);

    // Read and parse each file
    const articles = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(contentDir, file);

        if (!(await validateArticleFile(filePath))) {
          return null;
        }

        return readArticleFile(filePath);
      })
    );

    // Filter out nulls and apply any filters from options
    const validArticles = articles.filter(
      (article): article is BaseArticle =>
        article !== null &&
        matchesFilters(article, {
          status: options.status,
          category: options.category,
          search: options.search,
        })
    );

    // Sort by date and return
    return sortArticlesByDate(validArticles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticleById(
  type: "learn" | "blog" | "project",
  id: string
): Promise<BaseArticle | null> {
  const contentDir = path.join(process.cwd(), "content", type);
  const filePath = path.join(contentDir, `${id}.md`);

  if (!(await validateArticleFile(filePath))) {
    return null;
  }

  return readArticleFile(filePath);
}
