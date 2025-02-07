"use client";

/**
 * A page for displaying an interactive codeblock screen w/ display of console logs
 *  -[] Code Block
 *  -[] ConsoleLog Reports
 *  -[] Testing?
 *  -[] Tabs for Python & TypeScript
 *
 */

import { CodeBlock } from "@/app/_components/shared/CodeBlock";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createMockConsole, MockConsoleInterface } from "@/lib/console";
import { AlertCircle, Play } from "lucide-react";
import { useState } from "react";

interface EditorState {
  code: {
    typescript: string;
    python: string;
  };
  output: string[];
  error: string | null;
  isRunning: boolean;
}

type ActiveTabType = "typescript" | "python";

// Helper function to strip type annotations for runtime execution
const stripTypeAnnotations = (code: string): string => {
  return code
    .replace(/:\s*[a-zA-Z\[\]]+/g, "") // Remove type annotations
    .replace(/<[^>]+>/g, "") // Remove generic type parameters
    .replace(/function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/g, "function $1(") // Clean up function declarations
    .replace(/!\./g, ".") // Remove non-null assertions before property access
    .replace(/!/g, ""); // Remove remaining non-null assertions
};

const initialTypeScriptCode = `function twoSum(nums: number[], target: number): number[] {
    // Map for storing obj w/ indices
    // Key: Number from array Value: index of that number
    const numMap = new Map<number, number>();
    
    // iterate through the array once
    for (let i = 0; i < nums.length; i++) {
        // current numVal at 'i'
        const currentNum = nums[i];
        
        // find the complement num to equal the target value
        const complementNum = target - currentNum;
        
        // does complementNum exist within our map?
        // if yes
        if (numMap.has(complementNum)) {
            // Get the index of the complement number (we know it exists)
            const complementIndex = numMap.get(complementNum);
            if (complementIndex !== undefined) {
                return [complementIndex, i];
            }
        }
        
        // if not?
        // add the current indice and value to map
        numMap.set(currentNum, i);
    }
    // Throw error if no two nums add up to target
    throw new Error(\`Within \${nums} no two values summate to \${target}\`);
}

// Test cases
try {
    console.log("Test 1:", twoSum([2, 7, 11, 15], 9));  // Should output [0, 1]
    console.log("Test 2:", twoSum([3, 2, 4], 6));       // Should output [1, 2]
    console.log("Test 3:", twoSum([3, 3], 6));          // Should output [0, 1]
    console.log("Test 4:", twoSum([1, 2, 3, 4], 10));   // Should throw error
} catch (error) {
    if (error instanceof Error) {
        console.log("Error:", error.message);
    } else {
        console.log("An unknown error occurred");
    }
}`;

const initialPythonCode = `# Python-like pseudocode (runs as JS/TS)
def twoSum(nums, target):
    # Dictionary for number:index pairs
    num_map = {}
    
    # Loop through array once
    for i in range(len(nums)):
        current_num = nums[i]
        complement = target - current_num
        
        # Check if complement exists in map
        if complement in num_map:
            return [num_map[complement], i]
            
        # Add current number and index to map
        num_map[current_num] = i
    
    # No solution found
    raise Error(f"Within {nums} no two values summate to {target}")

# Test cases
try:
    print("Test 1:", twoSum([2, 7, 11, 15], 9))  # Should output [0, 1]
    print("Test 2:", twoSum([3, 2, 4], 6))       # Should output [1, 2]
    print("Test 3:", twoSum([3, 3], 6))          # Should output [0, 1]
    print("Test 4:", twoSum([1, 2, 3, 4], 10))   # Should throw error
except Exception as error:
    print("Error:", str(error))`;

export default function ScratchPadPage() {
  // ! Start of Stratch
  /**
   * Given an integer `n` and return any array contain `n` unique numbers such that they add up to 0
   *
   * @params n - number
   * @returns number[] - Number array with all integers from the Initial integer that when summed = 0;
   */

  function sumZero(n: number): number[] {
    // add positive number on even index 0-2-4-6,etc, negative on odd index 1,3,5. If n is odd last number is 0 itself
    // arr for holding numbers
    let returnArr: number[] = [];

    let startNum: number = 1;

    /* Example Situation: 
    n = 4
    i=0; [-1]
    i=1; [-1, 1]  -> startNum ++
    i=2; [-1, 1, -2, 2]
    */

    for (let i = 0; i < n - 1; i++) {
      // even index, but odd n value
      if (i % 2 === 0) {
        returnArr.push(-startNum);
      } else {
        returnArr.push(startNum);
        startNum++;
      }
    }

    // if n is odd lastNum = 0;
    let lastNum: number;
    if (n % 2 !== 0) {
      lastNum = 0;
      returnArr.push(lastNum);
    } else {
      returnArr.push(startNum);
    }

    // return w/ number[]
    console.log("returnArr: ", returnArr);
    return returnArr;
  }

  sumZero(5);
  // ! End of Stratch

  const [activeTab, setActiveTab] = useState<ActiveTabType>("typescript");
  const [state, setState] = useState<EditorState>({
    code: {
      typescript: initialTypeScriptCode,
      python: initialPythonCode,
    },

    output: [],
    error: null,
    isRunning: false,
  });

  const runCode = async () => {
    setState((prev) => ({ ...prev, isRunning: true, output: [], error: null }));

    // Create type console with new logs array
    const logs: string[] = [];
    const mockConsole = createMockConsole(logs);

    try {
      // Strip type annotations if we're running TypeScript code
      const codeToRun =
        activeTab === "typescript"
          ? stripTypeAnnotations(state.code[activeTab])
          : state.code[activeTab];

      // Create and run the function with our mock console
      const runnable = new Function("console", codeToRun) as (
        console: MockConsoleInterface
      ) => void;

      runnable(mockConsole);

      setState((prev) => ({
        ...prev,
        output: logs,
        isRunning: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isRunning: false,
      }));
    }
  };

  // Code Block information Function

  const handleTabChange = (value: ActiveTabType) => {
    setActiveTab(value);
  };
  return (
    <Card className="w-2/3 flex flex-col mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Code Editor</span>
          <button
            onClick={runCode}
            disabled={state.isRunning}
            className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed"
          >
            <Play size={16} />
            Run Code
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange as (value: string) => void}
        >
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="typescript">
              TypeScript
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="python">
              Python
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            <textarea
              value={state.code[activeTab]}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  code: {
                    ...prev.code,
                    [activeTab]: e.target.value,
                  },
                }))
              }
              className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-md"
              spellCheck="false"
            />

            <div className="bg-gray-900 rounded-md p-4 min-h-24">
              <h3 className="text-lg font-semibold text-white mb-2">Output:</h3>
              {state.output.length > 0 ? (
                <pre className="text-green-400 font-mono">
                  {state.output.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </pre>
              ) : state.error ? (
                <Alert
                  variant="destructive"
                  className="bg-red-900 border-red-600"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-200 font-mono">
                    {state.error}
                  </AlertDescription>
                </Alert>
              ) : (
                <p className="text-gray-400">Run your code to see the output</p>
              )}
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
