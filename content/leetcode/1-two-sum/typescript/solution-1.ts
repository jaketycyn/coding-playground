/**
 * @approach Nested Loops/Brute Force
 * @description Using two nested loops to check every pairing
 * @timeComplexity 0(n)²
 * @spaceComplexity O(1)
 */

function twoSum(nums: number[], target: number): number[] {
  // outer loop
  for (let i = 0; i < nums.length; i++) {
    // inner loop
    for (let j = 0; j < nums.length; j++) {
      // prevent the same number comparing against itself
      if ((i = j)) continue;

      // sum of i & j w/ reference to target
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }

  return [];
}
