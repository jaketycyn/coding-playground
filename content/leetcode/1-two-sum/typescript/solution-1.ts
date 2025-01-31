/**
 * Problem: 1-two-sum
 * @approach Brute force
 * @description Using two nested loops to find the two numbers that add up to the target
 * @timeComplexity O(n²) | O(log₂n) | O(logₙn) | O(nlogn) | O(1)
 * @spaceComplexity O(n²) | O(log₂n) | O(logₙn) | O(nlogn) | O(1)
 */

export function solutionTwoSum(nums: number[], target: number): number[] {
  // outer for loop
  for (let i = 0; i < nums.length; i++) {
    // inner loop
    for (let j = 0; j < nums.length; j++) {
      // do not let the same number being added to make target pass it through via continue
      if (i === j) continue;
      // check if sum of i & j = target; if so return [i, j]
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }

  // nothing works - which is not expecte
  return [];
}
