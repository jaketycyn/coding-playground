import { getProblemsList } from "@/lib/problems";
import Link from "next/link";
import NewProblemForm from "./_components/NewProblemForm";
import { ProblemCard } from "./_components/ProblemCard";

export default async function LeetCodePage() {
  // get leet code problems
  const problems = await getProblemsList();

  console.log("problems", problems);
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
            <ProblemCard problem={problem} />
          </Link>
        ))}
      </div>
    </div>
  );
}
