# ワカリテ

自分についての問題を作り、友達にリンクを送って、どれくらい理解されているか挑戦してもらうMVP版です。

## セットアップ

1. Supabaseで新規プロジェクトを作成します。
2. `supabase/schema.sql` のSQLをSupabase SQL Editorで実行します。
3. `.env.example` を参考に `.env.local` を作成します。
4. 依存関係をインストールして開発サーバーを起動します。

```bash
pnpm install
pnpm dev
```

## .env.local

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`SUPABASE_SERVICE_ROLE_KEY` はサーバー側だけで使います。ブラウザに出さないでください。

## ページ

- `/`
- `/create`
- `/create/questions`
- `/create/complete`
- `/w/[slug]`
- `/w/[slug]/play`
- `/w/[slug]/result`
- `/manage/[slug]?token=...`
