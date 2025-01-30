"use server";

import {
  createProblemFromTemplate,
  verifyProblemCreation,
} from "@/lib/utils/problem-creator";

export interface CreateProblemProps {
  problemId: string;
  problemTitle: string;
}

interface CreateProblemResponse {
  success: boolean;
  error?: string;
}

/**
 * Server action to create a new problem
 * Server actions are Next.js 13+ feature that allows running server-side code from client components
 */

export async function createProblem({
  problemId,
  problemTitle,
}: CreateProblemProps): Promise<CreateProblemResponse> {
  // Validate the problem ID Format
  // Only alloow lowercase letteres, numbers, and hyphens
  // if (!problemId.match(/^[a-z0-9-]+$/)) {
  //   return {
  //     success: false,
  //     error: "Invalid problem ID format",
  //   };
  // }

  // Call out utility function
  const success = await createProblemFromTemplate({ problemId, problemTitle });

  if (success) {
    // Verify the creation
    const verified = await verifyProblemCreation({ problemId, problemTitle });
    if (!verified) {
      return {
        success: false,
        error: "Failed to verify problem creation",
      };
    }
  }
  // Return a structured response
  return {
    success,
    error: success ? undefined : "Failed to create problem",
  };
}
