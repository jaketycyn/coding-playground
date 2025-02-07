import MarkDownContent from "@/app/_components/shared/MarkdownContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { LearningArticle as LearningArticleProps } from "@/lib/learn-utils";

const LearningArticle = ({
  title,
  content,
  metadata,
}: LearningArticleProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {metadata && (
          <div className="text-sm text-muted-foreground">
            {metadata.datePublished && <span>{metadata.datePublished}</span>}
            {metadata.category && <span>{metadata.category}</span>}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <MarkDownContent content={content} className="px-4" />
      </CardContent>
    </Card>
  );
};

export default LearningArticle;
