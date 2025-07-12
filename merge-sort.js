// main.js

let stepCounter = 1;

/**
 * マンガの巻数リストをマージソートで並べ替える（説明付き）
 * @param {number[]} shelf - 並べ替える巻数の配列
 * @param {number} depth - 再帰の深さ（内部用）
 * @returns {number[]} 並べ替えた配列
 */
function mergeSort(shelf, depth = 0) {
  if (shelf.length <= 1) return shelf;

  const indent = "  ".repeat(depth);
  const first = shelf[0];
  const last = shelf[shelf.length - 1];
  const mid = Math.floor(shelf.length / 2);
  const left = shelf.slice(0, mid);
  const right = shelf.slice(mid);

  console.log(`${indent}Step ${stepCounter++}: ${shelf.length}冊（${first}〜${last}巻）を`);
  console.log(`${indent}→ 左に${left.length}冊、右に${right.length}冊 分ける`);

  const sortedLeft = mergeSort(left, depth + 1);
  const sortedRight = mergeSort(right, depth + 1);
  const merged = merge(sortedLeft, sortedRight);

  console.log(`${indent}→ 左右をまとめて ${merged.length}冊の並びに整理`);

  return merged;
}

/**
 * 2つの並んだ配列をひとつに結合
 */
function merge(left, right) {
  const result = [];
  let l = 0;
  let r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }

  return result.concat(left.slice(l)).concat(right.slice(r));
}

// 実行スタート
require("./setup")(mergeSort, { isImmutable: true });
