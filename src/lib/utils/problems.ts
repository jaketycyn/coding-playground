import { LeetCodeProblem, Solution } from "../types/leetcode.types";
import fs from "fs/promises";
import path from "path";

async function parseSolutionFile(filePath: string): Promise<Solution> {
  try {
    const content = await fs.readFile(filePath, "utf-8");

    // Parse JSDoc/docstring comments to get metadata
    const metadataRegex = /@(\w+)\s+(.+)/g;
    const comments = content.match(/\/\*\*([\s\S]*?)\*\/|"""([\s\S]*?)"""/);
    const metadata: Record<string, string> = {};

    if (comments) {
      const commentContent = comments[1] || comments[2];
      let match;
      while ((match = metadataRegex.exec(commentContent)) !== null) {
        metadata[match[1]] = match[2].trim();
      }
    }

    return {
      code: content,
      approach: metadata.approach || "Unknown Approach",
      description: metadata.description || "",
      timeComplexity:
        metadata.complexity?.split(",")[0]?.split(":")[1]?.trim() || "Unknown",
      spaceComplexity:
        metadata.complexity?.split(",")[1]?.split(":")[1]?.trim() || "Unknown",
    };
  } catch (error) {
    console.error(`Error parsing solution file ${filePath}:`, error);
    return {
      code: "// Solution not available",
      approach: "Unknown",
      description: "",
      timeComplexity: "Unknown",
      spaceComplexity: "Unknown",
    };
  }
}

export async function getProblemsList(): Promise<LeetCodeProblem[]> {
  try {
    const contentDir = path.join(process.cwd(), "content", "leetcode");

    // Check if directory exists
    try {
      await fs.access(contentDir);
    } catch {
      console.log("Content directory does not exist yet");
      return [];
    }

    const problemDirs = await fs.readdir(contentDir);

    // Excluded directories
    const EXCLUDED_DIRECTORIES = ["_template", "_templates", ".templates"];

    const problems = await Promise.all(
      problemDirs
        // Skip template directors
        .filter((dir) => !EXCLUDED_DIRECTORIES.includes(dir))
        .map(async (dir) => {
          try {
            const problemPath = path.join(contentDir, dir);

            // Rest of your existing validation logic...
            const stats = await fs.stat(problemPath);
            if (!stats.isDirectory()) {
              console.log(`Skipping ${dir} - not a directory`);
              return null;
            }

            // Verify and read metadata.json
            const metadataPath = path.join(problemPath, "metadata.json");
            try {
              const metadataContent = await fs.readFile(metadataPath, "utf-8");
              if (!metadataContent.trim()) {
                console.log(`Skipping ${dir} - empty metadata.json`);
                return null;
              }
              const metadata = JSON.parse(metadataContent);

              // ... rest of your existing code for solutions
              const solutionsPath = path.join(problemPath, "solutions");
              // ... (rest of the solution reading code)

              return {
                ...metadata,
                solutions: { typescript: [], python: [] }, // simplified for example
              };
            } catch (error) {
              if (dir.startsWith("_")) {
                // Template files can be incomplete, that's ok
                console.log(`Skipping template directory ${dir}`);
              } else {
                console.error(`Error processing problem ${dir}:`, error);
              }
              return null;
            }
          } catch (error) {
            console.error(`Error processing problem ${dir}:`, error);
            return null;
          }
        })
    );

    return problems
      .filter((problem): problem is LeetCodeProblem => problem !== null)
      .sort((a, b) => a.problemNumber - b.problemNumber);
  } catch (error) {
    console.error("Error getting problems list:", error);
    return [];
  }
}

export async function getProblemById(
  id: string
): Promise<LeetCodeProblem | null> {
  try {
    const contentDir = path.join(process.cwd(), "content", "leetcode");
    const problemPath = path.join(contentDir, id);

    // Check if directory exists
    try {
      await fs.access(problemPath);
    } catch {
      console.log(`Problem directory ${id} does not exist`);
      return null;
    }

    // Read metadata
    const metadata = JSON.parse(
      await fs.readFile(path.join(problemPath, "metadata.json"), "utf-8")
    );

    // Read solutions
    const solutionsPath = path.join(problemPath, "solutions");
    let typescriptSolutions: string[] = [];
    let pythonSolutions: string[] = [];

    try {
      typescriptSolutions = await fs.readdir(
        path.join(solutionsPath, "typescript")
      );
    } catch {
      console.log(`No TypeScript solutions for ${id}`);
    }

    try {
      pythonSolutions = await fs.readdir(path.join(solutionsPath, "python"));
    } catch {
      console.log(`No Python solutions for ${id}`);
    }

    const solutions = {
      typescript: await Promise.all(
        typescriptSolutions.map((file) =>
          parseSolutionFile(path.join(solutionsPath, "typescript", file))
        )
      ),
      python: await Promise.all(
        pythonSolutions.map((file) =>
          parseSolutionFile(path.join(solutionsPath, "python", file))
        )
      ),
    };

    // Read problem description
    let description = "";
    try {
      description = await fs.readFile(
        path.join(problemPath, "problem.md"),
        "utf-8"
      );
    } catch {
      console.log(`No problem.md found for ${id}`);
    }

    return {
      ...metadata,
      description,
      solutions,
    };
  } catch (error) {
    console.error(`Error fetching problem ${id}:`, error);
    return null;
  }
}
