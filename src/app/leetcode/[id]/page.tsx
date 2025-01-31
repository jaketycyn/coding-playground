import { CodeBlock } from "@/app/_components/shared/CodeBlock";
import { markdownToHtml } from "@/lib/utils/mdx-utils";
import { getProblemById } from "@/lib/utils/problems";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

// Async component to handle the problem data fetching
async function ProblemContent({ id }: { id: string }) {
  const problem = await getProblemById(id);

  if (!problem) {
    notFound();
  }

  // Convert markdown to HTML
  const contentHtml = await markdownToHtml(problem.description);

  return (
    <div>
      <div className="mb-8 flex flex-col items-center">
        {/* Problem Header */}
        <div className="flex items-baseline gap-3 mb-2 ">
          <span className="text-gray-600 font-mono">
            {problem.problemNumber}
          </span>
          <h1 className="text-3xl font-bold">{problem.title}</h1>
        </div>

        {/* Difficulty Badge */}
        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium
            ${
              problem.difficulty === "Easy"
                ? "bg-green-100 text-green-800"
                : problem.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {problem.difficulty}
          </span>
        </div>

        {/* Categories */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {problem.categories.map((category, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Problem Description */}
        <div
          className="prose prose-invert max-w-none
            prose-headings:text-white
            prose-p:text-gray-300
            prose-strong:text-white
            prose-ul:text-gray-300
            prose-ol:text-gray-300
            prose-pre:bg-gray-900
            prose-code:text-gray-300
            prose-a:text-blue-400
            prose-blockquote:text-gray-300
            prose-blockquote:border-gray-700
            prose-hr:border-gray-700"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Solutions */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Solutions</h2>

          {/* TypeScript Solutions */}
          {problem.solutions.typescript.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl">TypeScript Solutions</h3>
              {problem.solutions.typescript.map((solution, index) => (
                <div
                  key={index}
                  className="mb-8 bg-white rounded-lg shadow-sm border p-6"
                >
                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      Approach {index + 1}: {solution.approach}
                    </h4>
                    <p>{solution.description}</p>
                    <div>
                      <span>Time: {solution.timeComplexity} | Space: </span>
                      <span>{solution.spaceComplexity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Python Solutions */}
        </div>
      </div>
    </div>
  );
}
export default async function ProblemPage({ params }: PageProps) {
  const id = await Promise.resolve(params.id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProblemContent id={id} />
    </Suspense>
  );
}
