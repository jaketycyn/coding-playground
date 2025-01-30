"use client";

import React, { useState } from "react";
import { createProblem } from "@/app/actions/create-problem";

interface FormStatus {
  loading: boolean;
  error?: string;
  success?: boolean;
}

/**
 * Form Component for creating new problems
 * This is a client component
 */

export default function NewProblemForm() {
  // State management for form
  const [problemId, setProblemId] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [status, setStatus] = useState<FormStatus>({ loading: false });

  /**
   * Handle form submission
   * @param e - Form Event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Set loading state
    setStatus({ loading: true });

    try {
      // Call the server action
      const result = await createProblem({ problemId, problemTitle });

      if (result.success) {
        // Reset form and show success message
        setStatus({ loading: false, success: true });
        setProblemId("");
      } else {
        // Show error message
        setStatus({ loading: false, error: result.error });
      }
    } catch (error) {
      setStatus({
        loading: false,
        error: "An unexpected error occured",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex flex-col items-center"
    >
      <div>
        <label htmlFor="problemId" className="block text-sm font-medium">
          #
        </label>
        <input
          type="text"
          id="problemId"
          value={problemId}
          onChange={(e) => setProblemId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black text-xl font-semiBold pl-2"
          placeholder="problem-id"
          disabled={status.loading}
        />
        <label htmlFor="problemId" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="problemTitle"
          value={problemTitle}
          onChange={(e) => setProblemTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black text-xl font-semiBold pl-2"
          placeholder="problem-title"
          disabled={status.loading}
        />
      </div>
      <button
        type="submit"
        disabled={status.loading || !problemId}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        {status.loading ? "Creating..." : "Create Problem"}
      </button>
      {status.error && <p className="text-red-600">{status.error}</p>}
      {status.success && (
        <p className="text-green-600">Problem Created successfully</p>
      )}
    </form>
  );
}
