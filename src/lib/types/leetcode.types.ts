export interface LeetCodeProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  problemNumber: number;
  categories: string[];
  solution: {
    typescript?: string;
    python?: string;
  };
  timeComplexity: string;
  spaceComplexity: string;
}
