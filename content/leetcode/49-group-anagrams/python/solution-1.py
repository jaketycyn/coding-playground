'''
Problem: 49-Group-Anagrams
@approach approachDescription
@description moreDetailedDescription
where n = number of strings in input array, k = maximum length of any string in the input array
@time Complexity: O(n * k * log k) 
@spaceComplexity 0(n*k)
'''

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # collection
        anagram_groups = {}

        # iterate
        for currStr in strs:
            # sortedStr
            sortedStr =  ''.join(sorted(currStr))
            
            # look at collection
            # if sortedStr exists already
            if sortedStr in anagram_groups:
                # append current string value to the key of sortedStr
                anagram_groups[sortedStr].append(currStr)
            else:
                # otherwise, create new entry w/ key of sortedStr: value of currStr 
                anagram_groups[sortedStr] = [currStr]


        # return the collection converted into an array of an array of strings
        return list(anagram_groups.values())
