import type { QuestionBankType, QuestionCount } from "@/lib/types";

export type DiagnosisConfig = {
  type: QuestionBankType;
  label: string;
  title: string;
  heading: string;
  description: string;
  badge: string;
  choiceCount: 2 | 4;
  questionTotal: number;
  thumbnail: string;
  accentClass: string;
  createPath: string;
  countOptions: QuestionCount[];
};

export const FOUR_CHOICE_COUNT_OPTIONS: QuestionCount[] = [10, 20, 30];

export const DIAGNOSIS_CONFIGS: DiagnosisConfig[] = [
  {
    type: "standard",
    label: "定番のワカリテ",
    title: "定番のワカリテ",
    heading: "わたしのこと、\n本当にわかってる？",
    description: "質問に答えて、友達にワカリテ診断を送ろう。\nあなたの一番の「ワカリテ」は誰？",
    badge: "20〜100問でチェック",
    choiceCount: 2,
    questionTotal: 300,
    thumbnail: "/standard-wakarite-thumbnail.png",
    accentClass: "diagnosis-card-standard",
    createPath: "/create",
    countOptions: [20, 30, 50, 75, 100]
  },
  {
    type: "ultimate",
    label: "究極の2択ワカリテ",
    title: "究極の2択ワカリテ",
    heading: "本人も悩みまくる!?\n究極の2択",
    description: "恋愛、人生、お金、もしもの選択など、本人の価値観が見える究極の2択診断です。",
    badge: "2択・10〜30問",
    choiceCount: 2,
    questionTotal: 50,
    thumbnail: "/ultimate-wakarite-thumbnail-v2.png",
    accentClass: "diagnosis-card-ultimate",
    createPath: "/create/ultimate",
    countOptions: [10, 20, 30]
  },
  {
    type: "private",
    label: "プライベートワカリテ",
    title: "プライベートワカリテ",
    heading: "誰も知らない!?\nプライベートの実態",
    description: "寝方、スマホ、家での過ごし方など、近い人ほど盛り上がるプライベート診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/private-wakarite-thumbnail.png",
    accentClass: "diagnosis-card-private",
    createPath: "/create/private",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "vtuber",
    label: "2択VTuberワカリテ",
    title: "2択VTuberワカリテ",
    heading: "リスナーは当たられる!?\n2択VTuberワカリテを作ろう",
    description: "リスナーや友達のVTuberにワカリテ診断をやってもらうために、あなたの2択VTuberワカリテを作りませんか？",
    badge: "配信で盛り上がる2択",
    choiceCount: 2,
    questionTotal: 100,
    thumbnail: "/vtuber-wakarite-thumbnail-2choice.png",
    accentClass: "diagnosis-card-vtuber",
    createPath: "/create/vtuber",
    countOptions: [20, 30, 50, 75, 100]
  },
  {
    type: "vtuber4",
    label: "4択VTuberワカリテ",
    title: "4択VTuberワカリテ",
    heading: "意外と難しい!?\n4択VTuberワカリテを作ろう",
    description: "リスナーや友達にワカリテ診断をやってもらうために、あなたの4択VTuberワカリテを作りませんか？",
    badge: "配信で盛り上がる4択",
    choiceCount: 4,
    questionTotal: 100,
    thumbnail: "/vtuber4-wakarite-thumbnail.png",
    accentClass: "diagnosis-card-private",
    createPath: "/create/vtuber-4choice",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "otaku_oshikatsu",
    label: "オタク度高めの推し活ワカリテ",
    title: "オタク度高めの推し活ワカリテ",
    heading: "オタク度高めな推し活事情\n本当にわかってる？",
    description: "グッズ量、現場、祭壇、認知欲まで、ガチめな推し活レベルがにじみ出る4択診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/diagnosis-thumbnails/otaku-oshikatsu-wakarite.png",
    accentClass: "diagnosis-card-private",
    createPath: "/create/otaku-oshikatsu",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "oshikatsu",
    label: "推し活ワカリテ",
    title: "推し活ワカリテ",
    heading: "わたしの推し活事情\n本当にわかってる？",
    description: "推しの好きなところ、グッズ、ライブ、SNSの追い方まで、推し活スタイルを当ててもらう診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/diagnosis-thumbnails/oshikatsu-wakarite.png",
    accentClass: "diagnosis-card-standard",
    createPath: "/create/oshikatsu",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "moshimo",
    label: "もしもワカリテ",
    title: "もしもワカリテ",
    heading: "わたしの「もしも」のとき\n本当にわかってる？",
    description: "お金、超能力、恋愛、人生の選択など、もしもの場面で出る本音を楽しむ4択診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/diagnosis-thumbnails/moshimo-wakarite.png",
    accentClass: "diagnosis-card-ultimate",
    createPath: "/create/moshimo",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "renai",
    label: "恋愛ワカリテ",
    title: "恋愛ワカリテ",
    heading: "わたしの恋愛事情\n本当にわかってる？",
    description: "好きになるきっかけ、理想のデート、嫉妬や距離感まで、恋愛観を当ててもらう4択診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/diagnosis-thumbnails/renai-wakarite.png",
    accentClass: "diagnosis-card-standard",
    createPath: "/create/renai",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "ura",
    label: "裏の顔ワカリテ",
    title: "裏の顔ワカリテ",
    heading: "わたしの裏の顔\n本当にわかってる？",
    description: "本音と建前、嫉妬、秘密、怒ったときの反応など、普段見えにくい一面を楽しむ診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/diagnosis-thumbnails/ura-wakarite.png",
    accentClass: "diagnosis-card-private",
    createPath: "/create/ura",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "food",
    label: "食べ物ワカリテ",
    title: "食べ物ワカリテ",
    heading: "わたしの食べ物の好み\n本当にわかってる？",
    description: "ラーメン、寿司、スイーツ、飲み物まで、食の好みをどれだけ知っているか試せる4択診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/diagnosis-thumbnails/food-wakarite.png",
    accentClass: "diagnosis-card-vtuber",
    createPath: "/create/food",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "school",
    label: "学校ワカリテ",
    title: "学校ワカリテ",
    heading: "わたしの学校事情\n本当にわかってる？",
    description: "授業中、休み時間、テスト、行事、放課後まで、学校での自分を当ててもらう4択診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/diagnosis-thumbnails/school-wakarite.png",
    accentClass: "diagnosis-card-vtuber",
    createPath: "/create/school",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "work",
    label: "仕事ワカリテ",
    title: "仕事ワカリテ",
    heading: "わたしの仕事事情\n本当にわかってる？",
    description: "働き方、職場の人間関係、ミスした時の反応、仕事観まで、仕事での自分を知れる診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/diagnosis-thumbnails/work-wakarite.png",
    accentClass: "diagnosis-card-vtuber",
    createPath: "/create/work",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "smartphone",
    label: "スマホの中身ワカリテ",
    title: "スマホの中身ワカリテ",
    heading: "わたしのスマホ事情\n本当にわかってる？",
    description: "SNS、写真フォルダ、検索履歴、通知、返信速度など、スマホの中身から性格が見える4択診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/diagnosis-thumbnails/smartphone-wakarite.png",
    accentClass: "diagnosis-card-vtuber",
    createPath: "/create/smartphone",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  },
  {
    type: "money",
    label: "お金の使い方ワカリテ",
    title: "お金の使い方ワカリテ",
    heading: "わたしのお金の使い方\n本当にわかってる？",
    description: "貯金、買い物、旅行、プレゼント、奢り方まで、お金の価値観を当ててもらう4択診断です。",
    badge: "4択・10〜30問",
    choiceCount: 4,
    questionTotal: 50,
    thumbnail: "/diagnosis-thumbnails/money-wakarite.png",
    accentClass: "diagnosis-card-ultimate",
    createPath: "/create/money",
    countOptions: FOUR_CHOICE_COUNT_OPTIONS
  }
];

export const ADDITIONAL_DIAGNOSIS_CONFIGS = DIAGNOSIS_CONFIGS.filter((config) =>
  ["vtuber4", "otaku_oshikatsu", "oshikatsu", "moshimo", "renai", "ura", "food", "school", "work", "smartphone", "money"].includes(config.type)
);

export function getDiagnosisConfig(type: QuestionBankType) {
  return DIAGNOSIS_CONFIGS.find((config) => config.type === type) || DIAGNOSIS_CONFIGS[0];
}

export function getDiagnosisConfigBySlug(slug: string) {
  return DIAGNOSIS_CONFIGS.find((config) => config.createPath === `/create/${slug}`);
}
