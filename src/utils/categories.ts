export const CATEGORIES = {
  actress: '女優',
  actor: '俳優',
  idol: 'アイドル',
  movie: '映画',
  tv: 'テレビ',
  music: '音楽',
  scandal: 'スキャンダル',
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
