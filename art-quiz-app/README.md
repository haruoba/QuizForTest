# 美術定期テスト対策クイズ

中学生向けの美術定期テスト対策Webアプリです。作品画像を見て、作品名・作者名・国名をそれぞれ4択で答えます。1問につき3点満点で、最後に合計点、正答率、各問題の正誤、正解一覧を確認できます。

React、Node.js、サーバー、データベースは使っていません。`index.html` を開くだけで動作し、GitHub Pagesでそのまま公開できます。

## ローカルでの確認方法

1. このフォルダをパソコンに保存します。
2. `index.html` をブラウザで開きます。
3. スタートボタンを押してクイズを確認します。

## 画像の追加方法

1. `images` フォルダに画像ファイルを追加します。
2. ファイル名は半角英数字とアンダースコアにすると管理しやすくなります。
3. `app.js` の `artworks` 配列に、追加した画像のパスを書きます。

例:

```javascript
{
  id: 4,
  image: "images/sunflowers.jpg",
  title: "ひまわり",
  artist: "フィンセント・ファン・ゴッホ",
  country: "オランダ"
}
```

## 問題の追加方法

`app.js` の `artworks` 配列に問題データを追加します。

```javascript
const artworks = [
  {
    id: 1,
    image: "images/capet.jpg",
    title: "自画像",
    artist: "マリー＝ガブリエル・カペ",
    country: "フランス"
  }
];
```

問題を増やすと、アプリ内の出題数と満点も自動で変わります。4択の誤答候補は、他の問題データと `extraOptions` からランダムに選ばれます。

## GitHub Pagesで公開する手順

1. GitHubで新しいリポジトリを作成
2. 作成したファイルをアップロード
3. Settings を開く
4. Pages を開く
5. Source を Deploy from a branch にする
6. Branch を main / root にする
7. Save を押す
8. 表示されたURLを生徒に共有する

## ファイル構成

```text
art-quiz-app/
 ├ index.html
 ├ style.css
 ├ app.js
 ├ README.md
 └ images/
     ├ capet.jpg
     ├ mona_lisa.jpg
     └ pearl_earring.jpg
```

## 画像について

同梱画像は、授業用の確認に使いやすいようローカルファイルとして配置しています。公開前に、学校や授業の利用条件に合わせて画像のライセンスを確認してください。

`capet.jpg` は、取得時のアクセス制限を避けるため学習用の生成画像を入れています。実際の作品画像を使う場合は、同じファイル名で差し替えると `app.js` を変更せずに使えます。

参考:

- マリー＝ガブリエル・カペ: https://en.wikipedia.org/wiki/Marie-Gabrielle_Capet
- モナ・リザ: https://commons.wikimedia.org/wiki/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg
- 真珠の耳飾りの少女: https://commons.wikimedia.org/wiki/File:1665_Girl_with_a_Pearl_Earring.jpg
