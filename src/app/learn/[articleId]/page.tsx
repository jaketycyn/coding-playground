import { getLearningArticle } from "@/lib/learn-utils";
import LearningArticle from "@/app/learn/_components/LearningArticle";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ articleId: string }> | { articleId: string };
}

export default async function ArticlePage({ params }: PageProps) {
  // Await and validate params
  const resolvedParams = await params;
  const articleId = resolvedParams.articleId;

  if (!articleId) {
    notFound();
  }

  try {
    const article = await getLearningArticle(articleId);

    if (!article) {
      notFound();
    }

    return (
      <div className="container mx-auto py-6">
        <LearningArticle {...article} />
      </div>
    );
  } catch (error) {
    console.error(`Error loading article:`, error);
    notFound();
  }
}

// Generate static params for known routes
export async function generateStaticParams() {
  return [{ articleId: "binary-search" }, { articleId: "graph-theory-basics" }];
}
