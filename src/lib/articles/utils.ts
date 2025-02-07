// src/lib/articles/utils.ts
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { BaseArticle } from "../types/articles";

/**
 * Validates that a file exists and is a markdown file
 */
export async function validateArticleFile(filePath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(filePath);
    return stats.isFile() && filePath.endsWith(".md");
  } catch (err) {
    return false;
  }
}

/**
 * Reads and parses an article file, returning both metadata and content
 */
export async function readArticleFile(
  filePath: string
): Promise<BaseArticle | null> {
  try {
    const content = await fs.readFile(filePath, "utf-8");

    if (!content.trim()) return null;

    const { data, content: articleContent } = matter(content);

    // Validate required fields
    if (!data.id || !data.title) {
      console.warn(`Missing required metadata in ${filePath}`);
      return null;
    }

    return {
      ...data,
      content: articleContent,
    } as BaseArticle;
  } catch (err) {
    console.error(`Error reading article file ${filePath}:`, err);
    return null;
  }
}

/**
 * Gets all markdown files in a directory
 */
export async function getArticleFiles(
  directoryPath: string
): Promise<string[]> {
  try {
    const files = await fs.readdir(directoryPath);
    return files.filter(
      (file) =>
        file.endsWith(".md") && !file.startsWith("_") && !file.startsWith(".")
    );
  } catch (err) {
    console.error(`Error reading directory ${directoryPath}:`, err);
    return [];
  }
}

/**
 * Extracts a slug from a filename
 */
export function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

/**
 * Checks if an article matches the given filters
 */
export function matchesFilters(
  article: BaseArticle,
  options: {
    status?: "draft" | "published";
    category?: string;
    search?: string;
  }
): boolean {
  if (options.status && article.status !== options.status) {
    return false;
  }

  if (options.category && !article.categories.includes(options.category)) {
    return false;
  }

  if (options.search) {
    const searchTerm = options.search.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchTerm) ||
      article.description.toLowerCase().includes(searchTerm)
    );
  }

  return true;
}

/**
 * Sort articles by date (newest first)
 */
export function sortArticlesByDate(articles: BaseArticle[]): BaseArticle[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
}
