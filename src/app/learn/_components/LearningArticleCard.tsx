"use client";
import { Badge } from "@/app/_components/shared/Badges";
import MarkDownContent from "@/app/_components/shared/MarkdownContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BaseArticle } from "@/lib/types/articles";
import Link from "next/link";

const LearningArticleCard = ({
  id,
  title,
  description,
  categories,
  status,
  content,
  created,
  lastUpdated,
}: BaseArticle) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="group relative">
      <Link href={`/learn/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View article: {title}</span>
      </Link>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle className="group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Created: {formatDate(created)}</span>
            <span className="mx-2">•</span>
            <span>Updated: {formatDate(lastUpdated)}</span>
          </div>
          <div className="flex flex-wrap gap-2 relative z-20 pointer-events-auto">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/learn/category/${category.toLowerCase()}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  variant="default"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LearningArticleCard;
