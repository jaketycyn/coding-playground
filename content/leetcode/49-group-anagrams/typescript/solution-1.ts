/**
 * 49: Group Anagrams
 * @approach approachDescription
 * @description moreDetailedDescription
 * @timeComplexity O(n²) | O(log₂n) | O(logₙn) | O(nlogn) | O(1)
 * @spaceComplexity O(n²) | O(log₂n) | O(logₙn) | O(nlogn) | O(1)
 */

export function groupAnagrams(strs: string[]): string[][] {
  // map for storing strs
  let anagramMap = new Map<string, string[]>();

  // iterate
  strs.forEach((str) => {
    // sortedStr creation from str
    let sortedStr = [...str].sort().join("");

    // find group
    let anagramGroup = anagramMap.get(sortedStr) ?? [];

    anagramMap.set(sortedStr, [...anagramGroup, str]);
  });

  return [...anagramMap.values()];
}
