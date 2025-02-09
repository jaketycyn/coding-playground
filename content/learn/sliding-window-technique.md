---
id: sliding-window-technique
title: "The Sliding Window Technique"
description: "Understanding the sliding window alogirhtm pattern, its implementation, and common applications"
categories:
  - algorithms
  - arrays
  - strings
status: published
created: "2025-02-07T14:30:00Z"
lastUpdated: "2025-02-07T11:20:00Z"
---

# The Sliding Window Technique

The sliding window technique is a powerful algorithmic patter used to solve array or string problems with contiguous sequences. Instead of repeatedly computing on overlapping elements, we maintain a "window" that slides through the data, updating our calculations incrementally.

## Core Concept:

Imagine you're sitting in a train with a digital camera fixed on a tripod, looking out the window. Your camera has a memory card that can hold exactly K photos - when it's full and you take a new photo, the oldest photo is automatically deleted. As the train moves along the tracks, you're creating a time-lapse of your journey.

This perfectly illustrates how a sliding window algorithm works:

Your camera's memory card represents your "window" of data. As the train moves forward (like iterating through an array), three things happen:

1. You capture a new photo through the window (adding a new element)
2. The oldest photo gets deleted to make space (removing an element)
3. Your camera maintains its collection of K recent photos (maintaining state)

Just as your camera efficiently captures the journey by keeping only the most recent K photos rather than storing every scene it's ever passed, a sliding window algorithm maintains only the relevant portion of data it needs to process at any given time.

## Types of Sliding Windows

### 1. Fixed-Size Window

- The window size remains constant throughout (k is static)
- Used when looking for patterns of a specific length
  - Ex: Finding maximum sum of any 3 consecutive elements

#### Generic Implementation:

```ts
/**
 * Fixed Sliding Window Function
 * Given an array of integers, find the maximum sum of a fixed sliding window
 *
 * @param arr - array of numbers to calculate the maximum sum of a fixed sliding window
 * @param k - number of elements in the window
 * @returns the maximum sum of a fixed sliding window
 */

function fixedSlidingWindow(arr: number[], k: number): number {
  if (arr.length < k) return 0;
  // 1. Initialize window calculations
  let windowSum = 0;

  // 2. Calculate first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  // 3. Slide window and maintain result
  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    // Remove leftmost element
    windowSum -= arr[i - k];
    // Add rightmost element
    windowSum += arr[i];
    // Update result
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

#### Advanced TypeScript Implementation:

```ts
function maxSumFixedWindow(arr: number[], k: number): number {
  if (arr.length < k) return 0;

  // initialize the sum of first window
  let windowSum = arr
    .slice(0, k) // get the first k elements
    .reduce((sum, num) => sum + num, 0);

  let maxSum = windowSum;

  // Slide the window from left to right
  for (let i = k; i < arr.length; i++) {
    // remove left element &
    windowSum -= arr[i - k];
    // add right
    windowSum += arr[i];
    // update
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```
