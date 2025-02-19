import { getProblemsList } from "@/lib/problems";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          <Link key={problem.id} href={`/leetcode/${problem.id}`}>
            {/* Card component later */}
            <Card className="rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors duration-200 overflow-hidden">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>
                  <span className="mr-2">#{problem.problemNumber}</span>
                  {problem.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 flex items-center justify-center ">
                {problem.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="text-white mx-1 "
                  >
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
