// 1. Maximum Sum Subarray of Size K (Easy)
// Given an array of integers and an integer K, find the maximum sum of any contiguous subarray of size K.
function maxSumSubarray(arr, k) {
  if (arr.length < k) return 0;
  let maxSum = 0;
  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }
  maxSum = currentSum;
  for (let i = k; i < arr.length; i++) {
    currentSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}
// Test Cases
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // Normal Case
console.log(maxSumSubarray([1, 2], 3)); // Edge Case: k is greater than array length

// 2. Longest Substring Without Repeating Characters (Medium)
// Given a string, find the length of the longest substring without repeating characters.
function lengthOfLongestSubstring(s) {
  const seen = new Map<string, number>();
  let maxLength = 0;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (seen.has(char) && seen.get(char)! >= left) {
      left = seen.get(char)! + 1;
    }
    seen.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}
// Test Cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Normal Case
console.log(lengthOfLongestSubstring("")); // Edge Case: Empty string

// 3. Longest Repeating Character Replacement (Medium)
// Given a string and an integer K, find the longest substring that can be obtained by replacing at most K characters.
function characterReplacement(s, k) {
  const freq = new Map<string, number>();
  let left = 0;
  let maxLength = 0;
  let maxFrequency = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    freq.set(char, (freq.get(char) || 0) + 1);

    // Track the highest frequency character
    maxFrequency = Math.max(maxFrequency, freq.get(char)!);

    // If the window is invalid, shrink it
    if (right - left + 1 - maxFrequency > k) {
      freq.set(s[left], freq.get(s[left])! - 1);
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
// Test Cases
console.log(characterReplacement("AABABBA", 1)); // Normal Case
console.log(characterReplacement("A", 2)); // Edge Case: Single character string

// 4. Minimum Window Substring (Hard)
// Given a string S and a string T, find the minimum window in S which contains all characters of T.
function minWindow(s, t) {
  if (t.length > s.length) return "";
  const target = new Map<string, number>();
  const window = new Map<string, number>();
  for (const char of t) {
    target.set(char, (target.get(char) || 0) + 1);
  }
  let left = 0,
    matched = 0;
  let minLength = Infinity;
  let minWindow = "";
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    window.set(char, (window.get(char) || 0) + 1);
    if (target.has(char) && window.get(char)! <= target.get(char)!) {
      matched++;
    }
    while (matched === t.length) {
      const windowLength = right - left + 1;
      if (windowLength < minLength) {
        minLength = windowLength;
        minWindow = s.substring(left, right + 1);
      }
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar)! - 1);
      if (target.has(leftChar) && window.get(leftChar)! < target.get(leftChar)!) {
        matched--;
      }
      left++;
    }
  }
  return minWindow;
}
// Test Cases
console.log(minWindow("ADOBECODEBANC", "ABC")); // Normal Case
console.log(minWindow("a", "aa")); // Edge Case: No valid substring
