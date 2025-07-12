// ★ 選択ソートの主役だけをここに残す ★

function selectionSort(shelf) {
  const total = shelf.length;

  for (let pos = 0; pos < total - 1; pos++) {
    console.log(`本棚の${pos + 1}番目に置くべき巻を探しています…`);

    let minIndex = pos;

    for (let j = pos + 1; j < total; j++) {
      if (shelf[j] < shelf[minIndex]) {
        minIndex = j;
      }
    }

    [shelf[pos], shelf[minIndex]] = [shelf[minIndex], shelf[pos]];
  }
}

// ↓ 実行の呼び出しだけ残す（他の制御は外部）
require("./setup")(selectionSort);
