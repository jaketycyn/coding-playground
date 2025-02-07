import MarkDownContent from "@/app/_components/shared/MarkdownContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LearningArticle as LearningArticleProps } from "@/lib/learn-utils";

const LearningArticle = ({
  title,
  content,
  metadata,
}: LearningArticleProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {metadata && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {metadata.datePublished && (
              <time dateTime={metadata.datePublished}>
                {new Date(metadata.datePublished).toLocaleDateString()}
              </time>
            )}
            {metadata.category && (
              <span className="rounded-full bg-muted px-2.5 py-0.5">
                {metadata.category}
              </span>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {/*  Version 1 - generic */}
        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}

        {/*  Version 2 custom */}

        <MarkDownContent content={content} />
      </CardContent>
    </Card>
  );
};

export default LearningArticle;
