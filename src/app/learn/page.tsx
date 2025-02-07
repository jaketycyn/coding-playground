import { getArticles } from "@/lib/articles/service";
import LearningArticleCard from "./_components/LearningArticleCard";

export default async function LearnDashboard() {
  const learnArticles = await getArticles({
    type: "learn",
    status: "published",
    includeContent: true,
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learnArticles.map((article) => (
          <LearningArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
