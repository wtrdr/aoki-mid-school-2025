// setupMangaShelf.js

const readline = require("readline");

/**
 * マンガ棚の準備とソート実行
 * @param {Function} sortFn - ソート関数（破壊的 or 非破壊的）
 * @param {Object} options - 設定オプション
 * @param {boolean} options.isImmutable - 元の配列を変更しないか
 */
module.exports = function setupMangaShelf(sortFn, { isImmutable = false } = {}) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("本棚にあるマンガの巻数（冊数）を入力してください: ", (input) => {
    const count = parseInt(input);
    if (isNaN(count) || count <= 0) {
      console.log("正の整数を入力してください。");
      rl.close();
      return;
    }

    const shelf = createShuffledShelf(count);
    console.log("今の本棚の並び:", shelf);
    console.log("Enterキーを押すと、マンガの巻数順に並べ替えます（マージソート）");

    rl.once("line", () => {
      const result = sortFn(shelf);
      console.log("巻数順に整った本棚:", isImmutable ? result : shelf);
      rl.close();
    });
  });
};

function createShuffledShelf(count) {
  const shelf = Array.from({ length: count }, (_, i) => i + 1);
  return shuffle(shelf);
}

function shuffle(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
