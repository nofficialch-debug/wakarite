export function getTitle(percentage: number) {
  if (percentage === 100) {
    return {
      title: "神ワカリテ",
      comment: "もはや本人レベル。何も説明しなくてもわかってそう。"
    };
  }
  if (percentage >= 80) {
    return {
      title: "ガチワカリテ",
      comment: "かなりわかってる！相当仲がいい証拠かも。"
    };
  }
  if (percentage >= 60) {
    return {
      title: "なかなかのワカリテ",
      comment: "結構わかってる！あと少しでガチ勢。"
    };
  }
  if (percentage >= 40) {
    return {
      title: "にわかワカリテ",
      comment: "知ってるようで、意外と知らないかも？"
    };
  }
  return {
    title: "誰ですか？",
    comment: "もうちょっと仲良くなろう。"
  };
}

export function calculatePercentage(score: number, total: number) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}
