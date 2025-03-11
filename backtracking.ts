// 1. Generate Parentheses (Medium)
// Given an integer n, generate all combinations of well-formed parentheses with n pairs.
function generateParenthesis(n) {
  const result: string[] = [];
  function backtrack(open: number, close: number, current: string) {
    if (current.length === n * 2) {
      result.push(current);
      return;
    }
    if (open < n) {
      backtrack(open + 1, close, current + "(");
    }
    if (close < open) {
      backtrack(open, close + 1, current + ")");
    }
  }
  backtrack(0, 0, "");
  return result;
}
// Test Cases
console.log(generateParenthesis(3)); // Normal Case
console.log(generateParenthesis(0)); // Edge Case: No parentheses needed

// 2. Permutations (Medium)
// Given an array of distinct integers, return all possible permutations.
function permute(nums) {
  const result: number[][] = [];
  const used: boolean[] = Array(nums.length).fill(false);
  function backtrack(temp: number[]) {
    if (temp.length === nums.length) {
      result.push([...temp]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      temp.push(nums[i]);
      backtrack(temp);
      used[i] = false;
      temp.pop();
    }
  }
  backtrack([]);
  return result;
}
// Test Cases
console.log(permute([1, 2, 3])); // Normal Case
console.log(permute([])); // Edge Case: Empty array

// 3. Combination Sum (Medium)
// Given an array of integers and a target, return all unique combinations where numbers sum to target.
function combinationSum(candidates, target) {
  const result: number[][] = [];
  function backtrack(start: number, current: number[], sum: number) {
    if (sum > target) return;
    if (sum === target) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, sum + candidates[i]);
      current.pop();
    }
  }
  backtrack(0, [], 0);
  return result;
}
// Test Cases
console.log(combinationSum([2, 3, 6, 7], 7)); // Normal Case
console.log(combinationSum([2, 4], 7)); // Edge Case: No valid combinations

// 4. Word Search (Medium)
// Given an m x n grid of letters and a word, check if the word exists in the grid using adjacent letters.
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function backtrack(i: number, j: number, index: number): boolean {
    if (index === word.length) return true;
    if (i < 0 || j < 0 || i >= rows || j >= cols || board[i][j] !== word[index]) {
      return false;
    }
    const temp = board[i][j];
    board[i][j] = "#";
    const found =
      backtrack(i + 1, j, index + 1) ||
      backtrack(i - 1, j, index + 1) ||
      backtrack(i, j + 1, index + 1) ||
      backtrack(i, j - 1, index + 1);
    board[i][j] = temp;
    return found;
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === word[0] && backtrack(i, j, 0)) {
        return true;
      }
    }
  }
  return false;
}
// Test Cases
console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
); // Normal Case
console.log(exist([["A"]], "B")); // Edge Case: Single letter grid with a different word
