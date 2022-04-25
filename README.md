# 目次

- 説明
- 技術スタック
- 事前準備
- インストール手順
- ローカル開発に利用するコマンド
- テスト
- デプロイ
- Tips

# 説明

当リポジトリは Next.js と Firebase で開発を行う方のために作成しました。  
ローカル環境構築の手順で躓かないように、なるべく簡単に環境構築でき、開発に集中できることを目指しています。  
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

- [Docker](https://docs.docker.com/get-docker/)
- [docker-comopse](https://docs.docker.com/compose/install/)

# インストール手順

それではインストール手順に入ります。順番に実施していってください。

## Git Clone

```bash
git clone https://github.com/paths-are/nextjs-firebase-on-docker.git
cd nextjs-firebase-on-docker
```

## Next.js アプリ 設定

依存関係インストール

```bash
docker-compose run --rm nextjs-front-app yarn
```

## Firebase 設定

```bash
docker-compose run --rm firebase-backend bash
firebase login --no-localhost
firebase init
firebase projects:create # project 新規作成 任意のIDを入力してプロジェクトを作成してください。分かりやすいID名だとGood。
firebase use --add # 作成したIDを選択します。Aliasには`default`と入力します。
firebase init # functions, emulators の設定をします。
```

<details><summary>firebase use --add 詳細</summary>

```bash
root@cb03503aac75:/opt/workspace# firebase use --add
? Which project do you want to add? nextjs-develop
? What alias do you want to use for this project? (e.g. staging) default

Created alias default for nextjs-develop.
Now using alias default (nextjs-develop)

```

</details>
<details><summary>firebase init 詳細</summary>

```bash
root@cb03503aac75:/opt/workspace# firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

Youre about to initialize a Firebase project in this directory:

/opt/workspace

Before we get started, keep in mind:

- You are currently outside your home directory
- You are initializing within an existing Firebase project directory

? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. Functions: Configure a Cloud Functions directory and its files, Emulators: Set up local
emulators for Firebase products

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

i Using project nextjs-develop (nextjs-develop)

=== Functions Setup

A functions directory will be created in your project with sample code
pre-configured. Functions can be deployed with firebase deploy.

? What language would you like to use to write Cloud Functions? TypeScript
? Do you want to use ESLint to catch probable bugs and enforce style? Yes
? File functions/package.json already exists. Overwrite? No
i Skipping write of functions/package.json
? File functions/.eslintrc.js already exists. Overwrite? No
i Skipping write of functions/.eslintrc.js
? File functions/tsconfig.json already exists. Overwrite? No
i Skipping write of functions/tsconfig.json
? File functions/tsconfig.dev.json already exists. Overwrite? No
i Skipping write of functions/tsconfig.dev.json
? File functions/src/index.ts already exists. Overwrite? No
i Skipping write of functions/src/index.ts
? File functions/.gitignore already exists. Overwrite? No
i Skipping write of functions/.gitignore
? Do you want to install dependencies with npm now? Yes

> protobufjs@6.11.2 postinstall /opt/workspace/functions/node_modules/protobufjs
> node scripts/postinstall

added 393 packages from 278 contributors and audited 393 packages in 10.439s

67 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities

=== Emulators Setup
? Which Firebase emulators do you want to set up? Press Space to select emulators, then Enter to confirm your choices. Authentication Emulator, Functions Emulator
i Port for auth already configured: 9099
i Port for functions already configured: 5001
i Emulator UI already enabled with port: 4000
? Would you like to download the emulators now? Yes
i ui: downloading ui-v1.6.5.zip...

i Writing configuration info to firebase.json...
i Writing project information to .firebaserc...

✔ Firebase initialization complete!

```

</details>

## Firebase コンソール画面でのセットアップ

[firebase](https://firebase.google.com/)にログインして、先ほど作成したプロジェクトのコンソール画面に遷移しましょう。  
その後、下記のそれぞれについて設定を行います。

- プロジェクト設定

  1. `プロジェクトの概要 >プロジェクトの設定 > 全般 > マイアプリ > Web `をクリック
  1. アプリのニックネームを入力
  1. アプリを登録
  1. 表示された firebaseConfig 情報を.env ファイルに書き込む

- Firebase Authentication 設定

  1. `メール / パスワード` と `メールリンク（パスワードなしでログイン）`を有効化
  1. `Google プロバイダー` を有効化

- Cloud Firestore 設定

  1. `データベースの作成 > テスト環境 > asia-notheast1(東京)` を選択

- Analytics 設定

  1. analytics を有効にする
  1. `プロジェクトの概要 >プロジェクトの設定 > 全般 > マイアプリ > firebaseConfig `に表示されている `measurementId` の値を.env に書き込む

- Cloud Messaging 設定

  1. `プロジェクトの概要 > プロジェクトの設定 > Cloud Messaging > ウェブプッシュ証明書 > Generate key pair `をクリック
  1. 鍵ペアの値をコピーして.env の`NEXT_PUBLIC_VAPID_KEY=`に貼り付け

- 課金設定
  1. Spark プラン → Blaze プランへとアップグレード（Cloud Functions を利用するには従量制にする必要がある）

設定が完了したら、cloud functions をデプロイしてみましょう。

```bash
cd functions
npm run deploy
```

最後の方に `✔ Deploy complete!` と表示されれば正しくデプロイできています。  
helloWorld 関数の URL が表示されているはずなので試しにその URL にアクセスしてみます。  
例）https://us-central1-nextjs-develop.cloudfunctions.net/helloWorld  
画面に `Hello world from functions!` と表示され  
Firestore の test コレクションにデータが入っていれば OK です。

Firebase のコンテナからは exit しましょう。

```bash
exit
```

## 環境構築が正常にできたかの確認

長かったと思いますが以上で Nextjs アプリと Firebase 側の設定は完了です。  
以下のコマンドを実行して正しく動くか確認してみましょう。

```bash
docker-compose up # docker-compose.yml のあるフォルダで実施
```

localhost:3000 へアクセスし以下を確認してみましょう。
下記が確認できれば問題なく動いてると思います。

- sample リンククリックで/sample へ遷移
- google ログインで Google アカウントでのログインができること
- メールアドレスで登録で自分のメールへログイン用のリンクが送信され、リンククリックでログインできること
- アカウントが作成されたら Firestore/${uid}/にプロフィール情報が保存されること。（cloud functions の処理）
- ログイン後は自分の名前とメールアドレスが表示され、名前は編集可能なこと
- Cloud Messaging が正常に動くこと
  - 下記のリクエストを送信すると localhost:3000 で通知を受け取る（localhost:3000 を開いていれば画面の alert、開いてなければブラウザに通知が来る）

```bash
# CURLコマンドでリクエスト
curl --location --request POST 'https://fcm.googleapis.com/fcm/send' \
--header 'Content-Type: application/json' \
--header 'Authorization: key=<※１．サーバーキー>' \
--data-raw '{
    "registration_ids": [
        "<※２．FCM token>"
    ],
    "notification": {
        "title": "something",
        "body": "hello nextjs & firebase"
    }
}'
```

※１．サーバーキー は `プロジェクトの概要 > プロジェクトの設定 > Cloud Messaging > Cloud Messaging API（レガシー）> サーバーキー` の値です。  
※２．FCM token は localhost:3000 で通知を有効にすると取得できます。ブラウザからの通知を有効にした際に Firestore に保存しています。`users/${uid}/ドキュメント`の中にある fcmToken の値です。

```bash

# 成功時のレスポンス
{
    "multicast_id": 5114610874119500327,
    "success": 1,
    "failure": 0,
    "canonical_ids": 0,
    "results": [
        {
            "message_id": "ae2b112b-9cb7-4efc-ab40-547f0ee2d78e"
        }
    ]
}

```

どうでしょう？上手く確認できましたか？もし問題がなければ早速開発を進めていきましょう！  
エラー等ある場合は issue などで教えていただけると幸いです！

# ローカル開発に利用するコマンド

コンテナの起動

```bash
docker-compose up
```

コンテナの停止

```bash
docker-compose stop
```

nextjs-front-app コンテナへログイン

```bash
docker-compose run --rm nextjs-front-app bash # 新規で起動してログイン
docker-compose exec nextjs-front-app bash # 起動しているコンテナにログイン
```

firebase-backend コンテナへログイン

```bash
docker-compose run --rm firebase-backend bash # 新規で起動してログイン
docker-compose exec firebase-backend bash # 起動しているコンテナにログイン
```

Nextjs アプリに依存関係をインストールする

```bash
docker-compose run --rm nextjs-front-app yarn <package>
```

Production 環境で実行する

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

# テスト

単体/結合テストの実行

```bash
docker-compose exec nextjs-front-app yarn test:unit
or
docker-compose run --rm nextjs-front-app yarn test:unit
```

E2E テスト実行

<!-- e2e(Playwright)テスト   -->

※`pages/_app.tsx` の`<Notify />`をコメントアウトしないと上手く作動しません。。。  
原因は調査中。。。

```bash
docker-compose run --rm pw yarn test:e2e
docker-compose run --rm pw yarn test:e2e:with-head
```

# デプロイ

## Next.js

https://vercel.com/docs/concepts/git#deploying-a-git-repository

## Firebase Cloud Functions

```bash
docker-compose run --rm firebase-backend npm run deploy --prefix=functions
```

# Tips

1. workbox のログを非表示にしたいとき

```diff
// front-root/worker/index.js

'use strict';

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//
- self.__WB_DISABLE_DEV_LOGS = false;
+ self.__WB_DISABLE_DEV_LOGS = true;
```
