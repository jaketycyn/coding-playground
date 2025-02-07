---
id: graph-theory-basics
title: "Graph Theory Fundamentals"
description: "Understanding graph representations, traversal algorithms, and basic graph problems"
categories:
  - algorithms
  - graph-theory
  - data-structures
status: published
created: "2025-01-25T09:30:00Z"
lastUpdated: "2025-02-07T11:20:00Z"
---

# Graph Theory Fundamentals

# Binary Search: A Deep Dive

Binary search is one of the most fundamental and efficient searching algorithms in computer science. In this article, we'll explore its implementation, time complexity, and various applications.

## Prerequisites

- Basic understanding of arrays
- Time complexity concepts
- Basic mathematics (logarithms)

## Core Concept

Binary search works by repeatedly dividing the search space in half. Given a sorted array, we can find any element using at most log₂(n) comparisons.

## Implementation

Here's a basic implementation in TypeScript:

```ts
// some comment
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

## Time Complexity

- Time Complexity: O(log n)
- Space Complexity: O(1)

## Common Variations

1. Finding the first occurrence
2. Finding the last occurrence
3. Finding the closest element
4. Finding in rotated sorted array

## Practice Problems

1. LeetCode 704: Binary Search
2. LeetCode 35: Search Insert Position
3. LeetCode 33: Search in Rotated Sorted Array

## Further Reading

- Advanced Binary Search Techniques
- Binary Search on Answer concept
- Binary Search in real-world applications
