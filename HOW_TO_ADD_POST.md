# 記事の追加方法

このガイドでは、「芸能フロントライン」に新しいニュース記事を追加する手順を説明します。

## 1. 新しいMarkdownファイルの作成

`src/content/posts/` ディレクトリ内に新しい `.md` ファイルを作成します。
ファイル名は `YYYY-MM-DD-slug.md` の形式を推奨します（例: `2026-02-14-new-movie.md`）。

## 2. フロントマターの設定

ファイルの先頭に、以下の形式で記事のメタデータを記述します。

```md
---
title: "記事のタイトル（32文字前後を推奨）"
date: "2026-02-14T09:00:00+09:00"
category: "actress"
tags: ["タグ1", "タグ2"]
author: "編集部"
description: "記事の要約を120文字程度で。検索結果やSNSで表示されます。"
image: "https://news-8ea.pages.dev/placeholder.webp"
canonical: "https://news-8ea.pages.dev/post/new-movie"
---
```

### フィールド詳細
- **title**: 記事のタイトル。h1タグとして使用されます。（必須）
- **date**: 公開日時。ISO 8601 形式（JSTは `+09:00`）で記述してください。（必須）
- **category**: `actress`, `actor`, `idol`, `movie`, `tv`, `music`, `scandal` から選択。（必須）
- **tags**: 関連するキーワードの配列。（必須）
- **author**: 執筆者名（通常は「編集部」）。（任意、デフォルトは「編集部」）
- **description**: SEO用の説明文。（必須）
- **image**: R2などのCDNにアップロードした画像のフルURL。（任意。設定しない場合はデフォルト画像が表示されます）
- **canonical**: 記事の正規URL。`/post/ファイル名のslug` の形式。（任意）

## 3. 本文の構成と埋め込み

記事はセッション分けせず、通常の段落構成で記述してください。
Google News の掲載を考慮し、正確な事実関係を優先して記述することを推奨します。

### SNSの埋め込み (X/Instagram)
本文中に X (旧Twitter) や Instagram の埋め込みコードをそのまま貼り付けることができます。
スクリプトは自動的に読み込まれます。

**例 (X):**
```html
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">...</p>&mdash; ユーザー名 (@user) <a href="https://twitter.com/user/status/...">...</a></blockquote>
```

## 4. 画像の準備

1. 画像を WebP 形式に変換します。
2. Cloudflare R2 等の CDN サーバーにアップロードします。
3. そのURLをフロントマターの `image` フィールドに貼り付けます。

## 5. デプロイ

ファイルを保存して GitHub にプッシュすると、Cloudflare Pages によって自動的にビルドとデプロイが行われます。
`news-sitemap.xml` も自動的に更新され、Google News に通知されます。
