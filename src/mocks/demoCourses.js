export const demoCourses = [
  {
    id: "japanese-n5",
    level: "01 / NỀN TẢNG",
    title: "Tiếng Nhật sơ cấp N5",
    description: "Bắt đầu từ bảng chữ cái, từng bước giao tiếp trong những tình huống gần gũi.",
    schedule: "12 tuần · 3 buổi / tuần",
    price: "2.400.000",
    priceValue: 2400000,
    tone: "course-lilac",
    glyph: "あ",
    translations: {
      ja: {
        level: "01 / 基礎",
        title: "初級日本語 N5",
        description: "文字の学習から始め、身近な場面で使う日本語を少しずつ学びます。",
        schedule: "12週間 · 週3回",
      },
    },
  },
  {
    id: "conversation",
    level: "02 / GIAO TIẾP",
    title: "Giao tiếp tiếng Nhật",
    description: "Luyện phản xạ nói và cách diễn đạt tự nhiên trong công việc, cuộc sống.",
    schedule: "10 tuần · 2 buổi / tuần",
    price: "2.800.000",
    priceValue: 2800000,
    tone: "course-peach",
    glyph: "話",
    translations: {
      ja: {
        level: "02 / 会話",
        title: "日本語会話",
        description: "仕事や日常生活で自然に話すための会話力を練習します。",
        schedule: "10週間 · 週2回",
      },
    },
  },
  {
    id: "jlpt-n4",
    level: "03 / MỤC TIÊU JLPT",
    title: "Luyện thi JLPT N4",
    description: "Củng cố kiến thức, làm quen dạng đề và xây dựng kế hoạch ôn tập hiệu quả.",
    schedule: "14 tuần · 3 buổi / tuần",
    price: "3.200.000",
    priceValue: 3200000,
    tone: "course-sage",
    glyph: "合",
    translations: {
      ja: {
        level: "03 / JLPT対策",
        title: "JLPT N4 対策",
        description: "知識を整理し、出題形式に慣れながら学習計画を立てます。",
        schedule: "14週間 · 週3回",
      },
    },
  },
];

export function getCourseText(course, locale, key) {
  return course.translations?.[locale]?.[key] ?? course[key];
}
