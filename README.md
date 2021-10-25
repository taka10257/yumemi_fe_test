# ゆめみ課題

## 本番環境

https://tsuzuki-yumemi-fe-test.vercel.app/

---

## 環境

* yarn@1.22.17
* node@14.18.1

### test

* jest
* enzyme

### lint

* eslint

### format

* prettier

---

## 開発環境セットアップ

### RESAS API KEYの取得

[RESAS API]( https://opendata.resas-portal.go.jp/) で利用登録を行いAPIキーを取得する

### envファイル作成

```shell
touch .env.local
```

* envファイルにパラメーターを追加

```
RESAS_API_ENDPOINT=https://opendata.resas-portal.go.jp
RESAS_API_KEY=<RESAS API KEY>
```

### アプリケーション起動

```shell
yarn dev
```

* [http://localhost:3000](http://localhost:3000) にアクセス

---

## コマンド

### テスト

```shell
yarn test
```

スナップショット更新

```shell
yarn test -u
```

テストカバレッジ確認

```shell
yarn test-coverage
```

### lint

```shell
yarn lint
```

自動修正

```shell
yarn lint-fix
```

### 本番環境動作確認

```shell
yarn build && yarn start
```





