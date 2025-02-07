export type ArticleType = "learn" | "blog" | "project";

export interface ArticleOptions {
  type: "learn" | "blog" | "project";
  status?: "draft" | "published";
  category?: string;
  search?: string;
  includeContent?: boolean;
}

export interface BaseArticle {
  id: string;
  title: string;
  description: string;
  categories: string[];
  status: "draft" | "published";
  content?: string;
  created: string;
  lastUpdated: string;
}
