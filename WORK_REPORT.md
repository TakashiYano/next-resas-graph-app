# 作業内容

## 環境構築（作業時間：1時間30分）

- TypeScript × Next.js × PandaCSS のセットアップ
- ESLint、Prettier 設定
- Pre Commit 設定

### TypeScript × Next.js 設定

Next.js 13 app directory

- ルーティング
  - ルーティングに対応するファイルは page.tsx
  - 共通されたレイアウトを担当する layout.tsx
  - ローディング UI を表示する loading.ysx
- レンダリング
  - App Router 内のコンポーネントはデフォルトで Server Component
  - Client Component として扱いたい場合には "use client" をファイルの先頭で宣言
- データフェッチング
  - Server Component で async/await を使用してデータを取得
  - データの取得時にキャッシュやリクエストの重複排除を活用するため fetch API を利用
- キャッシュ
  - fetch API 用いてデータを取得する際にはデフォルトで Next.js による HTTP キャッシュが有効
- Server Component
  - クライアントに JavaScript を送信しない
  - データベースや API エンドポイントへのアクセスをより近い場所で行う
- Client Component
  - useState を利用して状態管理をする
  - イベントハンドラを利用してインタラクティブなアクションを行う

絶対パス指定

- インポート文を書くときに@でsrc配下を参照できるようにする

```json
// tsconfig.json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  },
  .
  .
  .
}
```

環境変数の設定

- NEXT*PUBLIC*という接頭語をつけた環境変数は、ブラウザサイドのコードでアクセス可能
- .env.local ファイルをプロジェクトのルートディレクトリに作成
- .gitignoreファイルに .env.local を追加

```
// .env.local
NEXT_PUBLIC_API_URL=your-api-key
```

環境変数の型定義

- Next.js で環境変数を利用するときは process.env を通じて参照する
- TypeScript を用いている場合には環境変数の型を定義することで、型安全にコードを書く

```ts
// type/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_KEY: string;
  }
}
```

### ESLint・Prettier

npm scripts 追加

```json
// package.json
{
  "scripts": {
    "lint": "conc -g \"yarn:lint:*\"",
    "lint:eslint": "next lint",
    "lint:prettier": "prettier --check .",
    "fix": "yarn fix:eslint && yarn fix:prettier",
    "fix:eslint": "next lint --fix",
    "fix:prettier": "prettier --write ."
  }
}
```

※scripts の prepare は特殊で、npm install の前に自動で実行されます。

VSCode 設定で ESLint と Prettier の自動整形が動作するようにする

```json
// settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

VSCode 拡張設定で code-spell-checkerを導入するようにする

```json
// extensions.json
{
  "recommendations": ["streetsidesoftware.code-spell-checker"]
}
```

対象ファイルのみデフォルトエクスポートするように設定を追加

```js
// .eslintrc.js
const srcTsFiles = ["src/**/*.ts", "src/**/*.tsx"];
const nextConventionFiles = [
  "src/app/**/default.tsx",
  "src/app/**/error.tsx",
  "src/app/**/layout.tsx",
  "src/app/**/loading.tsx",
  "src/app/**/not-found.tsx",
  "src/app/**/page.tsx",
  "src/app/**/route.tsx",
  "src/app/**/template.tsx",
];

module.exports = {
  overrides: [
    {
      files: srcTsFiles,
      rules: { "import/no-default-export": "error" },
      excludedFiles: nextConventionFiles,
    },
  ],
};
```

ESLint との競合ルール調整用パッケージ導入、インポートをソートするパッケージを導入

```bash
$ yarn add -D eslint-config-prettier @ianvs/prettier-plugin-sort-imports
```

- ESLint 設定ファイルに追加

```js
// .eslintrc.js
module.exports = {
  extends: ["prettier"],
};
```

- Prettier 設定ファイルに追加

```js
// prettier.config.js
module.exports = {
  // prettier
  printWidth: 100,

  // @ianvs/prettier-plugin-sort-imports
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "^@vercel/(.*)$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.1.6",
};
```

未使用のインポートを見つけて削除するパッケージを導入

```bash
$ yarn add -D eslint-plugin-unused-imports
```

- ESLint 設定ファイルに追加

```js
// .eslintrc.js
module.exports = {
  plugins: ["unused-imports"],
  rules: {
    "unused-imports/no-unused-imports": ["error"],
  },
};
```

オブジェクトおよび TypeScript タイプのキーをアルファベット順にソートするパッケージを導入

```bash
$ yarn add -D eslint-plugin-sort-keys-custom-order
```

- ESLint 設定ファイルに追加

```js
// .eslintrc.js
const srcTsFiles = ["src/**/*.ts", "src/**/*.tsx"];
const orderedKeys = ["children", "className"];

module.exports = {
  plugins: ["sort-keys-custom-order"],
  overrides: [
    {
      files: srcTsFiles,
      rules: {
        "sort-keys-custom-order/type-keys": ["error", { orderedKeys }],
        "sort-keys-custom-order/object-keys": ["error", { orderedKeys }],
      },
    },
  ],
};
```

インラインでタイプをインストールする設定を追加

```bash
$ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

- ESLint 設定ファイルに追加

```js
// .eslintrc.js
module.exports = {
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
  },
};
```

### PandaCSS

- 同じ内容のCSSが重複しないように必要なCSSだけビルドされ、それらが記載されたCSSファイルを読み込む形になっている

```json
// package.json
{
  "scripts": {
    "prepare": "panda codegen"
  }
}
```

※ yarn installの実行時に、panda codegenが実行されることで、styled-systemに各設定ファイルが自動で作成

- 自動で生成されたstyled-systemはGitで管理する必要がないため、.gitignoreに下記記述を追加

```
.gitignore
styled-system
```

- ブレークポイントの数値設定はpanda.config.tsでカスタマイズ

```ts
// panda.config.ts
theme: {
 extend: {
   breakpoints: {
     sm: '640px',
     md: '768px',
     lg: '1024px',
     xl: '1280px',
     '2xl': '1536px'
   }
 }
},
```

### husky・lint-staged

- lint を強制しないと、忘れたり面倒になって適当なコードのままcommit, pushしてしまうことがあった
- 複数人で開発している場合はルールを共有するためにも有効

```json
// package.json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

※scripts の prepare は特殊で、yarn install の前に自動で実行

- .ts .tsx ファイルにコミット前に eslint, prettier を実行

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": "yarn fix"
  }
}
```

## 各コンポーネントとUIモック作成（作業時間：3時間00分）

- コンポーネント作成
  - ヘッダー
  - チェックボックス
  - 都道府県チェックボックス
  - 総人口推移グラフ
- 型定義作成
  - 都道府県一覧
  - 人口構成
- UIモック作成

### ディレクトリ構成とコンポーネント

- ディレクトリ・ファイル名は単数形
- Next.js のレイアウトを使う
- pages は最低限
  - SG, SSR などをさせる
  - SEO 対策
- 全部ライブラリの概念で作る
  - index.ts は re-export を行うだけ
- ライブラリ利用側は直接参照しない
  - すべて index.ts から import する
- コンポーネントを3種類に分ける
  - 共有コンポーネントは component
  - pages 固有のコンポーネントは \_component
  - 分割するだけのコンポーネントは同一ファイル内

### グラフライブラリ

RESAS API の人口構成 API から取得するデータ形式（data の総人口部分のみ抜粋）

- RESAS API の人口構成 API は1都道府県ずつのリクエストで、取得済み情報とマージが必要になる

```json
{
  "data": [
    {
      "label": "総人口",
      "data": [
        {
          "year": 1980,
          "value": 12817
        },
        {
          "year": 1985,
          "value": 12707
        },
        {
          "year": 1990,
          "value": 12571
        },
        {
          "year": 1995,
          "value": 12602
        },
        {
          "year": 2000,
          "value": 12199
        },
        {
          "year": 2005,
          "value": 11518
        },
        {
          "year": 2010,
          "value": 10888
        },
        {
          "year": 2015,
          "value": 10133
        },
        {
          "year": 2020,
          "value": 9302
        },
        {
          "year": 2025,
          "value": 8431
        },
        {
          "year": 2030,
          "value": 7610
        },
        {
          "year": 2035,
          "value": 6816
        },
        {
          "year": 2040,
          "value": 6048
        },
        {
          "year": 2045,
          "value": 5324
        }
      ]
    }
  ]
}
```

データ形式が合わせやすいため、RechartsではなくHighchartsを選択する

- Rechartsのデータ形式

```json
{
  "data": [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    }
  ]
}
```

- Highchartsのデータ形式

```json
{
  "series": [
    {
      "name": "Installation",
      "data": [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    },
    {
      "name": "Manufacturing",
      "data": [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    },
    {
      "name": "Sales & Distribution",
      "data": [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    },
    {
      "name": "Project Development",
      "data": [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    },
    {
      "name": "Other",
      "data": [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }
  ]
}
```

## RESAS API と結合、ロジック作成（作業時間：4時間00分）

- RESAS API と結合するロジック作成
  - 都道府県一覧 API
  - 人口構成 API
- ローディングとエラー時の UI 作成
  - 都道府県一覧 API
  - 人口構成 API
- コンポーネント作成
  - アラート
  - トースト

### データフェッチング

- Server Component 内で行う
  - データベースなどバックエンドのリソースに直接アクセスできる
  - アクセストークンなどの機密情報をクライアントに露出しない
  - データの取得とレンダリングを同一環境下で行うのでクライアントとサーバーの通信と、クライアント上のメインスレッドの作業を削減できる
  - 複数のデータフェッチングを 1 つのリクエストで行うことができる
  - データソースにより近い場所でデータを取得することで、レイテンシを削減できる
- Fetch API は Web API にネイティブで備わっている機能であるが、Next.js で使う際には拡張されている
  - 自動的にリクエストの重複排除する
  - デフォルトで動的関数（cookies(), headers(), useSearchParams()）の前に呼ばれるリクエストが HTTP キャッシュされる
  - 独自のキャッシュ戦略として revalidate をサポートする
- デフォルトでは fetch を使用すると自動的にデータを取得した後にキャッシュ
  - fetch を実行するたびに新しいデータを取得するようにするには、cache: "no-store" を設定

総人口APIの仕様書

- 仕様を見ると県コードは一つずつしか指定できない
- よってチェックボックスをクリックしたら総人口APIを呼ぶような作りになる
- 一度APIを呼んだ県はそのレスポンスを保存しておいて無駄なリクエストをへらす

### 状態管理

React Hooks

- 個人的に使っている状態管理ライブラリ SWR を検討したが、人口構成 API から取得できるデータが1都道府県ずつであること（複数都道府県を1リクエストでとれない）と相性が悪いため、useReducer で実装することとした

### ローディングとエラー時の UI について

- Next.js 13 では App Router 内の loading.tsx という特殊なファイルがローディング UI を表示する役割
- サーバーでデータを取得している最中（= サーバーコンポーネントの Promise が解決するまで）に表示され、レンダリングが完了すると新しいコンテンツを表示
- 同じディレクトリ内の page.tsx をラップするように配置するので、ヘッダーなどのレイアウトは即座に表示
- Suspense における fallback と同じ

```tsx
<html lang="ja">
  <head />
  <body>
    <Provider>
      <Header />
      <Main>
        <Suspense fallback={<Loading />}>
          {/* children には page.tsx のコンテンツが挿入される */}
          {children}
        </Suspense>
      </Main>
      <Footer />
    </Provider>
  </body>
</html>
```

- サーバーコンポーネント内で例外が throw された場合、error.tsx の内容が表示
- 同じディレクトリ内にある page.tsx ファイルを Error Boundary でラップ

```tsx
<html lang="ja">
  <head />
  <body>
    <Provider>
      <Header />
      <Main>
        <ErrorBoundary fallback={<Error />}>
          {/* children には page.tsx のコンテンツが挿入される */}
          {children}
        </Suspense>
      </Main>
      <Footer />
    </Provider>
  </body>
</html>
```

人口構成 API

- API リクエストラッパーのカスタムフックで、読み込み中フラグとエラーメッセージの stateを保持
- 読み込み中も現状のグラフは表示したままにする
- エラー時については、すでに取得済み情報がある状態 + 新たな取得がエラー の時に、取得済み情報はグラフ表示したままにしたいので、エラー表示はトーストでアラートにする

## デプロイ（作業時間：30分）

- Vercel と連携
- Vercel にデプロイ
- 動作確認
