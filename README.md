# 目次

- 説明
- 技術スタック
- 事前準備
- インストール手順
- ローカル起動
- Docker 操作
- テスト
- デプロイ
- Tips
- 注意点
  Firestore rules を設定すること
- 今後
  firebase storage の設定

# 説明

当リポジトリは Next.js と Firebase で開発を行う方のために作成しました。  
環境構築の手順で躓かないようになるべく簡単に開発を進められることを目指しています。  
主な技術は技術スタックに記載しています。  
他のライブラリや技術を使いたい場合はここでは説明しませんので、他のリポジトリやサイトをご参考ください。

# 技術スタック

- フロント
  - [Next.js](https://nextjs.org/)
  - [Recoil](https://recoiljs.org/) (React の状態管理)
  - TypeScript
  - [MUI](https://mui.com/)
- バックエンド（Firebase）
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Cloud Functions(Node.js + TypeScript)
  - Firebase Cloud Messaging
  - Firebase Analytics
- インフラ
  - [Vercel](https://vercel.com/)

# 事前準備

このプロジェクトを利用するには以下のソフトウェアが必須となります。
まだインストールしていない方はご自身の環境にインストールしてください。

- Docker
- docker-comopse

# インストール手順

それではインストール手順に入ります。順番に実施していってください。

git clone 実行

```bash
git clone https://github.com/paths-are/nextjs-firebase-on-docker.git
```

フロントの依存関係インストール

```bash
docker-compose run --rm nextjs-app yarn
```

# テスト

e2e(Playwright)テスト
※`pages/_app.tsx` の`<Notify />`をコメントアウトしないと上手く作動しません。  
原因は調査中。

```bash
docker-compose run --rm pw yarn test:e2e:with-head
```

# tips

workbox のログを非表示にしたいとき

# メモ

SampleAfterLoginContainer は profile に変更
