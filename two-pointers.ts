// 1. Remove Duplicates from Sorted Array (Easy)
// Given a sorted array, remove the duplicates in-place such that each element appears only once.
// Return the new length of the array.
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}
// Test Cases
console.log(removeDuplicates([1, 1, 2, 3, 3, 4])); // Normal Case: [1, 2, 3, 4]
console.log(removeDuplicates([])); // Edge Case: Empty array

// 2. Two Sum II - Input Array is Sorted (Easy)
// Given a sorted array and a target number, return indices of the two numbers that add up to target.
function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}
// Test Cases
console.log(twoSumSorted([2, 7, 11, 15], 9)); // Normal Case: [0, 1]
console.log(twoSumSorted([1, 2, 3, 4], 10)); // Edge Case: No valid pairs

// 3. Container With Most Water (Medium)
// Given an array representing heights of vertical lines, find two lines that together with the x-axis form a container that holds the most water.
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const area = (right - left) * Math.min(height[left], height[right]);
    maxArea = Math.max(maxArea, area);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}
// Test Cases
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Normal Case
console.log(maxArea([1, 1])); // Edge Case: Minimal height difference

// 4. Three Sum (Medium)
// Given an integer array, return all unique triplets that sum up to zero.
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Avoid duplicates

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        // Avoid duplicates for left and right
        while (nums[left] === nums[left - 1]) left++;
        while (nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
// Test Cases
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // Normal Case
console.log(threeSum([0, 0, 0, 0])); // Edge Case: All elements are the same
