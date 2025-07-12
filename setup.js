// setupMangaShelf.js

const readline = require("readline");

/**
 * 外部から選択ソート関数を受け取り、入力と実行を制御する
 * @param {Function} sortFn - 選択ソート関数
 */
module.exports = function setupMangaShelf(sortFn) {
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
    console.log("Enterキーを押すと、マンガの巻数順に並べ替えます。");

    rl.once("line", () => {
      sortFn(shelf); // ← main.js の selectionSort を実行
      console.log("巻数順に整った本棚:", shelf);
      rl.close();
    });
  });
};

// ヘルパー関数：シャッフルされたマンガ棚を生成
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
