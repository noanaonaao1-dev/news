# 芸能フロントライン (Geino Frontline)

Astro v5 + TypeScript で構築された、SEO・Google News 最適化済みの完全静的芸能ニュースサイトです。

## 🚀 特徴
- **フルSSG**: Cloudflare Pages に最適化された高速な静的配信
- **SEO最適化**: JSON-LD (NewsArticle), パンくずリスト, canonical, OGP, Twitter Card 対応
- **Google News対応**: `news-sitemap.xml` の自動生成、セマンティックな記事構造
- **パフォーマンス**: Lighthouse 高スコアを目指した設計（画像CLS対策、WebP推奨、LazyLoad）
- **広告対応**: Monetag（Vignette/Tag）を全ページに自動挿入

## 🛠 技術スタック
- **Framework**: Astro v5
- **Styling**: Tailwind CSS
- **Content**: Astro Content Collections (Markdown)
- **Deployment**: Cloudflare Pages

## 📁 ディレクトリ構成
```
/
├── src/
│   ├── content/posts/   # 記事（Markdown）
│   ├── components/      # UIコンポーネント（Layout, Seo, Header等）
│   ├── pages/           # ページ、RSS、Sitemap生成
│   └── utils/           # カテゴリ定義、ユーティリティ
├── public/              # 静的アセット（ロゴ、プレースホルダー）
└── astro.config.mjs     # サイト設定
```

## 📝 記事の書き方
`src/content/posts/` に `.md` ファイルを作成します。以下のフロントマターが必須です：

```md
---
title: "記事タイトル"
date: "2026-02-13T08:00:00+09:00"
category: "actress"
tags: ["タグ1", "タグ2"]
author: "編集部"
description: "記事の説明文（120文字程度）"
image: "https://news-8ea.pages.dev/placeholder.webp"
canonical: "https://news-8ea.pages.dev/post/slug"
---
```

## 🚢 デプロイ手順 (Cloudflare Pages)

1. **GitHubリポジトリにプッシュ**:
   このプロジェクトを GitHub リポジトリにアップロードします。

2. **Cloudflare Pagesの設定**:
   - Cloudflare ダッシュボードで "Workers & Pages" > "Create application" > "Pages" > "Connect to Git" を選択。
   - リポジトリを選択。
   - **ビルド設定**:
     - Framework preset: `Astro`
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Node.js version: `18` 以上を指定（Environment variables で `NODE_VERSION: 20` 等を設定）

3. **環境変数の設定**:
   - `SITE` (オプション): `https://news-8ea.pages.dev` (astro.config.mjs で設定済みですが上書き可能)

## 🖼 画像の管理 (Cloudflare R2)

本プロジェクトは画像を Cloudflare R2 等の外部CDNから配信することを想定しています。

1. **R2バケットの作成**: Cloudflare ダッシュボードで R2 バケットを作成。
2. **カスタムドメインの設定**: `news-8ea.pages.dev` 等をバケットに接続（または R2 の公開URLを使用）。
3. **アップロード**: 画像を `images/2026/` などの階層でアップロード。
4. **記事への記載**: Markdown の `image` フィールドに R2 の URL を記載します。

## 💰 広告 (Monetag) の設置

本プロジェクトでは、`src/layouts/Layout.astro` 内に Monetag の Vignette および Tag スクリプトが全ページ共通で埋め込まれています。

1. [Monetag](https://monetag.com/) でサイトを登録。
2. すでにコード内に設定されている Zone ID (`10606549`, `10606570`) を、ご自身の ID に必要に応じて差し替えてください。
3. サイト認証用の meta タグ（`monetag`）は `src/pages/index.astro` に記載されています。

## 📰 Google News Publisher Center への申請

Google News に掲載するには、[Publisher Center](https://publishercenter.google.com/) で以下の設定が必要です。

- **基本情報**: サイト名、ロゴ（512x512 px推奨）
- **コンテンツ**:
  - セクション1: `https://news-8ea.pages.dev/news-sitemap.xml` (Feed または Sitemap として登録)
- **確認が必要なページ**:
  - 運営者情報: `/about`
  - プライバシーポリシー: `/policy`
  - お問い合わせ: `/contact`

## 🔐 管理者パネル

本サイトには、記事の追加・更新・デプロイを行うための管理画面（`/admin`）が実装されています。
GitHub と Cloudflare KV の両方に記事データを保存することで、デプロイを待たずにサイトへ即時反映される「ハイブリッド方式」を採用しています。

### 必要な環境変数
Cloudflare Pages の「設定」>「環境変数」で以下の変数を設定してください：

#### 基本設定
- `SITE_URL`: サイトの公開URL (例: `https://news-8ea.pages.dev`)。サイトマップ、canonical、JSON-LD 等に使用されます。

#### 管理画面 (SSR)
- `ADMIN_PASSWORD`: 管理画面へのログインパスワード
- `GITHUB_TOKEN`: GitHub の Personal Access Token (`repo` スコープが必要)
- `GITHUB_REPO`: 対象のリポジトリ名（例: `username/repository-name`）
- `DEPLOY_HOOK_URL`: Cloudflare Pages の「設定」>「ビルド & デプロイ」>「デプロイフック」で作成した URL

#### 広告設定 (Monetag) - オプション
未設定の場合はデフォルト値が使用されます。
- `MONETAG_VERIFICATION_ID`: サイト認証用メタタグの ID
- `MONETAG_ZONE_ID_1`: スクリプト1の Zone ID
- `MONETAG_SCRIPT_SRC_1`: スクリプト1のソース URL
- `MONETAG_ZONE_ID_2`: スクリプト2の Zone ID
- `MONETAG_SCRIPT_SRC_2`: スクリプト2のソース URL

### Cloudflare Pages の設定
即時反映と管理画面の動作のため、以下の設定が必要です：

1. **KV プレフィックスのバインド**:
   - Cloudflare ダッシュボードで KV 名前空間を新規作成（例：`geino_posts_kv`）。
   - Pages プロジェクトの「設定」>「関数」>「KV 名前空間のバインディング」で、**変数を `POSTS_KV`** にして作成した KV をバインドしてください。
2. **Compatibility Flag**: 「設定」>「関数」>「互換性フラグ」で `nodejs_compat` を追加してください（Workers 環境での安定動作のため）。
3. **Node.js バージョン**: `NODE_VERSION` を `20` 以上に設定することを推奨します。

### デプロイ回数の削減方法
1. Cloudflare Pages の「ビルド設定」で「自動デプロイ」をオフにします。
2. 管理者パネル（`/admin`）から記事を書きます。「GitHubとKVに保存」を押すと、**その瞬間にサイト上に記事が表示されます。**
3. 記事が数本溜まったタイミング、または内部的な整合性を整えたいタイミングで、管理画面トップの「🚀 サイトを更新（デプロイ）」ボタンを押して手動でビルド（GitHubファイルの静的化）を実行してください。

## 🧪 ローカル開発

```bash
npm install
npm run dev
```

ビルド確認:
```bash
npm run build
```
`dist/` フォルダ内に `sitemap.xml`, `news-sitemap.xml`, `rss.xml` 等が含まれていることを確認してください。
