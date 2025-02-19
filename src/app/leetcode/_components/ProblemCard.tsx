import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/app/_components/shared/Badges";

interface ProblemCardProps {
  problem: {
    id: string;
    problemNumber: number;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    categories: string[];
  };
}

type Difficulty = "Easy" | "Medium" | "Hard";
type BadgeVariant = "success" | "warning" | "error" | "default" | "outline";

const getDifficultyVariant = (difficulty: Difficulty): BadgeVariant => {
  switch (difficulty) {
    case "Easy":
      return "success";
    case "Medium":
      return "warning";
    case "Hard":
      return "error";
    default:
      return "default";
  }
};

export const ProblemCard = ({ problem }: ProblemCardProps) => {
  return (
    <Card className="rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors duration-200 overflow-hidden">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>
          <span className="mr-2">#{problem.problemNumber}</span>
          {problem.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-slate-300 flex items-center justify-center ">
        {/*  Difficulty */}
        <Badge
          variant={getDifficultyVariant(problem.difficulty as Difficulty)}
          className="font-semibold"
        >
          {problem.difficulty}
        </Badge>
        {/* Categories */}
        {problem.categories.map((category) => (
          <Badge key={category} variant="outline" className="text-white mx-1 ">
            {category}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
};
