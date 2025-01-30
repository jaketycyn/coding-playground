import path from "path";
import fs from "fs/promises";

/**
 * Creates a new problem directory from a template
 * @param problemId - The identifier for the new problem (e.g., 'two-sum')
 * @returns Promise<boolean> - true if successful, false otherwise
 */
export async function createProblemFromTemplate(
  problemId: string
): Promise<boolean> {
  try {
    // Define the paths we'll be working with
    const contentDir = path.join(process.cwd(), "content", "leetcode");
    const templateDir = path.join(
      process.cwd(),
      "content",
      "leetcode",
      "_template"
    );
    const newProblemDir = path.join(contentDir, problemId);

    // Debug logging
    console.log("Creating new problem:", {
      contentDir,
      templateDir,
      newProblemDir,
    });

    // Verify template directory exists
    try {
      await fs.access(templateDir);
    } catch (error) {
      console.error("Template directory missing!");
      return false;
    }

    // Check if problem directory already exists
    try {
      await fs.access(newProblemDir);
      console.error("Problem directory already exists");
      return false;
    } catch (error: unknown) {
      if (
        !(error instanceof Error && "code" in error && error.code === "ENOENT")
      ) {
        // If error is not "directory doesn't exist", re-throw it
        throw error;
      }
      // If we get here, the directory doesn't exist, which is what we want
    }

    /**
     * Helper function to recursively copy a directory and its contents
     * @param src - Source directory path
     * @param dest - Destination directory path
     */
    async function copyDir(src: string, dest: string) {
      // Create the destination directory
      await fs.mkdir(dest, { recursive: true });

      // Read all entries in the source directory
      const entries = await fs.readdir(src, { withFileTypes: true });

      console.log("Copying from:", src, "to:", dest);

      // Process each entry (file or directory)
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          // If it's a directory, recursively copy it
          await copyDir(srcPath, destPath);
        } else {
          // If it's a file, copy it directly
          await fs.copyFile(srcPath, destPath);
          console.log("Copied file:", entry.name);

          // Update timestamps in metadata if applicable
          if (entry.name === "metadata.json") {
            const metadata = JSON.parse(await fs.readFile(destPath, "utf-8"));
            metadata.timestamps.created = new Date().toISOString();
            metadata.timestamps.lastUpdated = new Date().toISOString();
            await fs.writeFile(destPath, JSON.stringify(metadata, null, 2));
          }
        }
      }
    }

    // Copy template to new problem directory
    await copyDir(templateDir, newProblemDir);
    console.log("Successfully created problem:", problemId);
    return true;
  } catch (error) {
    console.error("Error creating problem:", error);
    return false;
  }
}

/**
 * Verifies that a leetcode problem was created correctly with all required files
 * @param problemId - The identifier of the problem to verify
 * @returns Promise<boolean> - true if the problem is valid, false otherwise
 */

export async function verifyProblemCreation(
  problemId: string
): Promise<boolean> {
  try {
    const problemDir = path.join(
      process.cwd(),
      "content",
      "leetcode",
      problemId
    );

    // Check if main problem directory exists
    try {
      await fs.access(problemDir);
    } catch (error) {
      console.error("Problem directory does not exist:", problemDir);
      return false;
    }

    // Get list of files in the problem directory
    const files = await fs.readdir(problemDir);

    // Define required files and directories
    const requiredItems = [
      "metadata.json",
      "problem.md",
      "typescript",
      "python",
    ];

    // Check for missing required items
    const missingItems = requiredItems.filter((item) => !files.includes(item));

    if (missingItems.length > 0) {
      console.error("Missing required items:", missingItems);
      return false;
    }

    // Verify language-specific solution files
    try {
      // Check TypeScript solution
      const tsFiles = await fs.readdir(path.join(problemDir, "typescript"));
      if (!tsFiles.includes("solution-1.ts")) {
        console.error("Missing TypeScript Solution files");
        return false;
      }

      // Check Python solution
      const pyFiles = await fs.readdir(path.join(problemDir, "python"));
      if (!pyFiles.includes("solution-1.py")) {
        console.error("Missing Python Solution files");
        return false;
      }

      // Verify metadata.json structure
      const metadata = JSON.parse(
        await fs.readFile(path.join(problemDir, "metadata.json"), "utf-8")
      );

      // Check required metadata fields
      const requiredMetadataFields = [
        "title",
        "difficulty",
        "category",
        "topics",
        "companies",
        "links",
        "timestamps",
      ];

      const missingFields = requiredMetadataFields.filter(
        (field) => !(field in metadata)
      );

      if (missingFields.length > 0) {
        console.error("Missing required metadata fields:", missingFields);
        return false;
      }

      // Verify problem.md exists and has content
      const problemMd = await fs.readFile(
        path.join(problemDir, "problem.md"),
        "utf-8"
      );

      if (!problemMd.trim()) {
        console.error("Problem.md is empty");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error verifying solution files:", error);
      return false;
    }
  } catch (error) {
    console.error("Error during verificaton:", error);
    return false;
  }
}
