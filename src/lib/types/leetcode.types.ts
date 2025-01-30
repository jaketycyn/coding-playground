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
  categories: string[]; // could be made into its own type later
  solutions: {
    typescript?: Solution[];
    python: Solution[];
  };
}
