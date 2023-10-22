# RESAS API App

## 構成

- TypeScript
- Next.js 13 app directory

API

- [RESAS API](https://opendata.resas-portal.go.jp/)

## 環境構築

RESAS API に登録して、API Key を取得 + .env.example をコピーして値をセットする（初回のみ）

```bash
$ cp .env.example .env.local
```

ライブラリインストール + Pre Commit 設定反映

```bash
$ yarn install
```

ビルド実行

```bash
$ yarn build
```

起動

```bash
$ yarn start
```

ブラウザでアクセス

```
localhost:3000
```
