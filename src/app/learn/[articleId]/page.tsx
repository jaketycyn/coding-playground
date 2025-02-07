import { getLearningArticle } from "@/lib/learn-utils";
import LearningArticle from "../_components/LearningArticle";

interface ArticlePageProps {
  params: {
    articleId: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getLearningArticle(params.articleId);

  if (!article) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
      </div>
    );
  }

  return <LearningArticle {...article} />;
}
