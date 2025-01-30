import { getProblemsList } from "@/lib/utils/problems";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../_components/shared/Card";
import { Badge } from "../_components/shared/Badges";
import NewProblemForm from "./_components/NewProblemForm";

export default async function LeetCodePage() {
  // get leet code problems
  const problems = await getProblemsList();

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">LeetCode Problems</h1>
        <p className="text-gray-600 mt-2">
          Practice coding problems with solutions in TypeScript and Python
        </p>
      </div>
      {/* Content */}
      <div className="grid gap-4">
        {/* //! TEST MOVE LATER  Create new pRoblem form test */}
        <NewProblemForm />
        {/* Problems list */}
        {problems.map((problem) => (
          <Link
            key={problem.id}
            href={`/leetcode/${problem.id}`}
            className="block transition-colors hover:bg-gray-50"
          >
            {/* Card component later */}
            <Card className="hover:bg-gray-50 text-black">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>
                  <span>#{problem.problemNumber}</span>
                  {problem.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {problem.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
