export interface Solution {
  code: string;
  approach: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface LeetCodeProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  problemNumber: number;
  categories: string[];
  description: string; // Added for problem.md content
  solutions: {
    typescript: Solution[];
    python: Solution[];
  };
}

export interface ProblemMetadata {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  problemNumber: number;
  categories: string[];
  timeComplexity: string;
  spaceComplexity: string;
}
