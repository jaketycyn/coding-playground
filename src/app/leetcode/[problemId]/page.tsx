import { CodeBlock } from "@/app/_components/shared/CodeBlock";
import { getProblemById } from "@/lib/utils/problems";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    problemId: string;
  };
}

export default async function ProblemPage({ params }: PageProps) {
  const problem = await getProblemById(params.problemId);

  if (!problem) {
    notFound();
  }

  return (
    <div>
      {/* Problem Header */}
      <div className="mb-8">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-gray-600 font-mono">
            ${problem.problemNumber}
          </span>
          <h1 className="text-3xl font-bold">{problem.title}</h1>
        </div>
        {/* Labels/Badges */}
        {/* Problem Description */}
        <div>
          <div>
            <h3>Problem Description</h3>
            {/* <p>{problem.solutions.typescript}</p> */}
          </div>
        </div>

        {/* Solutions */}
        <div>
          {problem.solutions.typescript?.map((solution, index) => (
            <div>
              <div>
                {/* Solution Title */}
                <div>
                  Solution {index + 1}: {solution.approach}
                </div>
              </div>
              {/* Solution Description */}
              <div>{solution.description}</div>
              {/* Complexities */}
              <div>
                <div>{solution.timeComplexity}</div>
                <div>{solution.spaceComplexity}</div>
              </div>

              {/*  Code Block */}
              <CodeBlock
                code={solution.code}
                language="typescript"
                showLineNumbers
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
