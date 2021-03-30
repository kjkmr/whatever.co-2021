# whatever.co をリニューアルしたときの話 (2021年版)

弊社コーポレートウェブサイト [whatever.co](https://whatever.co/) をリニューアルしたときのお話。

## 動機

- もうちょっとちゃんとしたい。
- 遅い
  - WORK, NEWS めっちゃ増えた。
- 古い
  - ベースが 2015 年につくった dotby.jp のまま。
  - React 0.12（...

## 要件

- 最新技術で。
- 速いやつ。
- データ移行大変だからバックエンドは WordPress のままで。

## 技術選定

- いまどきは [Jamstack](https://qiita.com/ozaki25/items/4075d03278d1fb51cc37) らしい。
- [Next.js](https://nextjs.org/) が流行ってるらしい。
- TypeScript がメジャーらしい。

## 構成

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2595/ace88c9a-78c7-64ce-4d10-5c38f1579b9e.png)

## ソースコード

<https://github.com/Whatever-Inc/whatever.co-2021>

こちらからどうぞ。コードは MIT ライセンス。イラスト・フォントなどのデザインリソースは Whatever Inc. が All rights reserved。

## WordPress

### Multilingual

旧 whatever.co はさらにその前の [dotby.jp](https://dotby.jp/) で使用していた多言語プラグイン qTranslate をそのまま使用し続けていたのだけど、もう開発もストップしてサポートも終了しているので別の多言語プラグイン [WPML](https://wpml.org/ja/) に乗り換え。

[qTranslate のデータを維持しつつ WPML に移行するためのプラグイン](https://wpml.org/documentation/related-projects/qtranslate-importer/)が WPML から提供されてるのでそれを使ってデータコンバート。が、これがなかなか一筋縄ではいかない。

もともと qTranslate でのデータ構造がアレだったのもあるんだけど、slug が言語ごとに違ってたり Advanced Custom Field の値がうまくコンバートされてないとかで、それらを修正するために DB の中身を直接変更する SQL を生成する JS を書いたりした。

うまくいくまでたぶん 3 回ぐらい WordPress インストールしなおして旧サイトデータ戻して移行プラグイン走らせるみたいなことした。疲。（そして結局、レイアウトの都合上、全記事データを手動で入れ直さなくちゃいけなくて移行作業そんなに頑張らなくてよかったっていう……🙄

### Next.js との連携 API

WordPress と Next.js をつなげる系の記事をいろいろ見るとだいたいが GraphQL 使っていて、というか [Next.js 公式が提供してる WordPress サンプル](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress)が GraphQL 使ってるので、それに従って GraphQL プラグインを入れてデータを引き出してみたものの、WPML と ACF を同時に使うとうまくいかない。WPML + GraphQL は OK、ACF + GraphQL も OK だけど、WPML + ACF + GraphQL はダメ……。ということで GraphQL じゃなくて従来の REST API を使うことに。

今回の用途だと無理して GraphQL 使う利点ほぼなくて REST で十分。WP の REST API は必要なフィールド指定できるし。

### Custom Block

デザイナー以外のひとでもデザインルールを簡単に適用できるようにするために WordPress のカスタムブロックを使用した。
やりたいことは複数の画像レイアウトパターンを用意するっていうシンプルなことだったので、イチから全部カスタムブロックを実装するんじゃなくって [Genesis Custom Blocks](https://ja.wordpress.org/plugins/genesis-custom-blocks/) というプラグインを使った。

![](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2595/a351dbb5-c2e4-c11e-1333-7ebf1fc01b6b.gif)

Advanced Custom Field みたく設定画面で必要なフィールドを定義して、あとはそれらに対する HTML と CSS を用意すれば Custom Blocks のめんどい実装はいっさいやらなくてよい。◎。

## Next.js

### 国際化

[Next.js の i18n 機能はルーティングしかない](https://nextjs.org/docs/advanced-features/i18n-routing)ので、ルーティング後の各コンポーネントでのテキストリソース管理とかは別ライブラリとかでやんないといけない。

まあ現在の locale 取得してその locale に対応するテキスト表示するだけだしーということで全部自分で書いた。Google Sheet でテキストリソースを全部管理していたので、ビルド時にそこかからデータ読み出して JSON として保存。各コンポーネントからそれ参照して設定。やってることはむずくないけど組んでた当時は context とか hook とかまだあんまり理解してなかったので実装がイマイチ。いまならもうちょいうまくかける。技術的負債感。

React なので言語切替時も必要最低限のテキストのところだけがアップデートされるので効率いいんだけど、今回のサイトは各コンポーネントに出現エフェクトがついてるので切替時もそれを出したいし、そゆのがないと切り替わったかどうかがわかりづらい、ということで対策。React のコンポーネントの入れ替えは key プロパティ見てるっぽいので各ページの根元の方のコンポーネントの key プロパティに現在の locale を埋め込んであげれば locale が切り替わったタイミングでコンポーネントも入れ替わってエフェクト発動〜。

### SSG? ISR?

Next.js は SSG (Static Site Generator) で事前にレンダリングした HTML 返すからチョッパヤなんだよねーっと [Next.js の WordPress のサンプル](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress)通り実装してしまうとページ数が膨大になったときにデプロイにめっちゃ時間かかるばかりか、WordPress 側にめちゃくちゃ負荷がかかって WordPress が操作不能になってしまう。

かといって `getStaticPaths` で `paths` を空にして返すとデプロイ時の HTML 生成はなくなってデプロイチョッパヤになるけど今度は一覧ページとかで詳細ページへのリンクが大量にあるとこで prefetch が大量に走るのでやっぱり WordPress 側の負荷ガーってなるので、WordPress がのっかってる Apache の `MaxClients` を絞ったり Next.js から WordPress の REST API 呼ぶところに Cloudfront をはさんだらちょっとマシ。

そしてそのままだと WordPress で編集するたびに再度 deploy する必要でちゃうので ISR (Incremental Static Regeneration) を有効にすべく `getStaticProps` で `revalidate` プロパティでタイムアウト設定。全部のページ一律で 10 分とかに設定してしまったけど古い記事で更新頻度低いやつはもっと長くしてもいいのかもしれない。（そしてたぶん Cloudfront はさむ必要なくなってるやも。）

↓このへんすごくわかりやすく丁寧に説明してある。

<https://qiita.com/thesugar/items/47ec3d243d00ddd0b4ed>

かくして以前以上に表示の速いサイトになりました。（ほとんどは SSG のおかげ。）（エフェクトのせいで Lighthouse のスコアは低めである。）

### WordPress の記事プレビュー

WordPress で記事書いたら公開するまえにプレビューしたいのは当たり前で、Next.js にもそういった用途のための preview mode っていう機能があるのでそれ使えば実現できるやんっていう話なんだが、ドキュメントざーっとながめてなんかめんどそう……それっぽい見た目になるカスタムテーマ作ったほうが早そうと思ってふつうに WordPress のテーマを実装。

だがしかし。

それっぽい見た目でいいやと端折った部分がやっぱ必要でそれをカスタムテーマで再実装するのがめんどい……ということでぐるっとまわって Next.js の preview mode の実装をした。

まあやっぱりそれなりにめんどくてハマりどころがひとつ。preview mode はいったんプレビュー用の API エンドポイントにアクセスしてそのときにプレビュー用データを Cookie に保存する。ここでまさかの Cookie。Cookie に保存する制限上そこに入れられるのは 2KB まで。ブラウザによって Cookie に保存できる最大容量は違うけど安全な値として 2KB が設定されてて変更不可。で、普通に 1 ページのデータが 2KB を超えてしまっていてどうすんだってなる。

解決策は Cookie にはデータ入れないこと。preview API にアクセスしたときには `setPreivewData` では空オブジェクトを渡す。これでも preview API 経由であることは Cookie に保存されるし、記事ページの `getStaticProps` の `preview` パラメータは `true` になる。んで実際のデータを取り出す REST API コールするときは非公開記事も読めるユーザーで認証してやれば OK。

preview API を呼ぶときは WordPress 側から secret 渡さないとダメだし、preview API 経由しない REST API 呼び出しはユーザー認証しないので、非公開記事が一般ユーザーに見えることはまずない。（secret と slug がわかれば見れるけど。）

### リダイレクト

サイトリニューアルなので新サイトになって変更になった URL に旧 URL からちゃんとリダイレクトしてあげる必要がある。

`next.config.js` にリダイレクト設定を書き込めばリダイレクトしてくれるらしいので、DB からデータ吸い出してリダイレクト設定用の JSON を作ったらいちおうリダイレクトはされるのは確認できたけど、i18n が絡むと微妙に動作がおかしい。GitHub に issue がいくつか見つかる。

なので `next.config.js` でリダイレクトするのはやめて[自前でやるようにした](https://github.com/Whatever-Inc/whatever.co-2021/blob/d6b1fd0495dc0f0f9399cca9fff2cc142c0cf343/pages/post/%5Bslug%5D.tsx)。

### next/image

Next.js v10 から [next/image の Image コンポーネント](https://nextjs.org/docs/basic-features/image-optimization)を使えば閲覧環境に応じていいかんじに画像を最適化してくれるってーことで導入してみたのだけど、Safari でだけなぜか複数の画像を読み込んでしまっていて使えないので、Image コンポーネントじゃなくてその内部で使われている[画像最適化用の API だけを呼び出して使った](https://github.com/Whatever-Inc/whatever.co-2021/blob/1478c2c75e290aeab1d0b00d242b56c831cc7aee/lib/image.ts)。Image コンポーネントのほうが画像サイズ選択部分の処理をもっとちゃんとやってるのでほんとはそっちのがいいんだけどいたしかたなし。

そしていま確認したら[最新版ではそのバグは解決している](https://github.com/vercel/next.js/pull/22902)もよう。

仕事しすぎでめっちゃ重い[川村真司のページ](https://whatever.co/ja/team/masa/)の最適化前と最適化後。もともとが featured image そのままぶっこんでるっていうやばい状態ではあるけどこの削減量はなかなかよろしい。Image コンポーネント使えばもうちょいいけるたぶん。

![](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2595/05cea379-e8ef-ce04-aecd-67a0d52eb25e.png)

### Vercel

Next.js の SSR/SSG/ISR を適切に動かすためには Next.js 開発元がやってるホスティングサービス [Vercel](https://vercel.com/home) を使うのが事実上必須。使いづらいサービスにロックインされるのは嫌だけど Vercel は全然よいのでよい。GitHub に push すれば deploy されるしブランチ切ったり PR 送ればリリース前にプレビューできるし preview deploy したやつは過去のも全部残ってて比較もできるしそのへん全部 Slack に通知されるので便利。

カスタムドメインは naked domain (apex domain) もサブドメインも普通に使える。

Basic 認証つけようとすると $150/month かかるのは謎。

## デザイン実装まわり

### フォント

[デザイナー ジャガーさん](https://whatever.co/ja/team/jaguar/)の指定は欧文は [Apercu](https://www.colophon-foundry.org/typefaces/apercu/)、和文は [Noto Sans](https://fonts.google.com/specimen/Noto+Sans+JP?preview.text_type=custom&preview.text=Whatever%E3%81%AF%E3%80%81%E3%81%AA%E3%82%93%E3%81%A7%E3%82%82%E8%80%83%E3%81%88%E3%80%81%E3%81%AA%E3%82%93%E3%81%A7%E3%82%82%E4%BD%9C%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82)。

Apercu は Webfont も提供されてるので普通に @font-face で組み込むだけ。\
Noto Sans は全部で 3 ウェイト使われていて、最初はそんなに使ったらフォントのダウンロード量すごそうでやだなーどうしよっかなーと思ってたんだけど（実際 dotby.jp はフォントだけで 5MB ぐらい読んでた）、Chrome の DevTools で見てみるとなんか大量に細かいファイルを読んでいるけどそんなに重くない。文字多めのページでも全部で 1MBぐらい。なんでかなー？と CSS で [@import で読み込んでるファイルの中身](https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500;700&display=block)をみてみると、細かくフォントファイルを分けて [`unicode-range`](https://developer.mozilla.org/ja/docs/Web/CSS/@font-face/unicode-range) を使って必要な文字が含まれてるファイルだけをダウンロードしてるみたい。進化してた。賢い。

<https://qiita.com/ksk1015/items/38128a108ba8476cc7d6>

英語でデザインされたやつにかっちりあわせてコーディングしたやつに日本語をそのまま流し込むとあたりまえだがいろいろダサい（逆もしかり）。和欧混植いいかんじにする仕組みがあらたに開発されてるかなーとぐぐってみたけどどうもそっち系はまだ便利機能ないぽい。[wrapSingleByteTexts.js](https://bulan.co/swings/demo/wrapsinglebytetexts/) はよさげだけど古いしなにより jQuery 依存は NG。[`unicode-range` つかった合成フォントっぽいの](https://spyweb.media/2017/09/13/font-face-subset-synthesis/)発見したけど微調整無理そう。ということで英語とそれ以外（日本語・中国語）で個別に手動で微調整。（[FONTPLUS の混植フォント](https://fontplus.jp/info/5201)はよさそう。）

### グラデーションのエフェクト

このサイトのデザインの肝。

1. `visibility: hidden` で隠して諸々設定。
2. `IntersectionObserver` で画面に入ってくるのを監視。
3. 画面に入ってきたらグラデーションが左から右へ通過。
4. グラデ通過した下にグラデ文字。
5. グラデ文字が徐々に元のテキストカラーに戻って完了。

ポイントはグラデ文字がゆっくり元の色にもどるところ。最初の実装は `background: linear-gradient(...)` ってやって作った `div` を `-webkit-background-clip: text` でマスクしたやつの `opacity` をアニメさせるってやつ。まあこれでもいちおうそれっぽい動きになるんだけど、`background-image` の（`linear-gradient` の）アニメーションができないので、グラデ版テキストの下に元カラーのテキストをおいてやる必要があってこのせいでエッジが汚い。

![](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2595/c18323df-7a8c-4e70-44e8-cbda3a5b44bf.png)

なんとかなんないかなーといろいろググった結果発見しました CSS の blend mode。  
いまどきの CSS は Photoshop みたいな blend mode が使えるということで、グラデののせ方を変更。元の黒いテキストはそのまま、うえにのっけるグラデに `mix-blend-mode: lighten` を指定するとあら不思議、白い背景はそれ以上明るくならないので白いママ、黒いテキスト部分はグラデが足されてグラデカラーになりましたとさ。エッジが変に黒くなることもなく `-webkit` prefix ついた CSS を使うことなく実現できました。（さらにこの方法は白地に黒のイラストもテキストと同様に処理できちゃう💯）

ただし、これは `lighten` でグラデカラーが足されるので白背景でしか使えません。暗い背景でこれやるとグラデ枠ががっつり見えます。

サイト内にはグレー背景で白テキストの箇所があってそこはどうしてるかというと、まず黒背景白テキストの白い部分だけにグラデをのっけます。これは `mix-blend-mode: multiply` でいけます。黒 (=0) \* グラデ = 0、白 (=1) \* グラデ  = グラデ、ですね。で、これをグレー背景にのっけるときにさらに `mix-blend-mode: lighten` します。するとグレーより明るいグラデ部分だけが残ります。完成。`mix-blend-mode` の二重がけ。

ひとつハマりポイント。`mix-blend-mode` が下の要素が `position: fixed` だとブレンドが反映されません。悩んだコレ。

### video にブレンドモード

トップページに流れている映像はロゴ部分だけ別になっています。これは映像にロゴを含めてしまうとウィンドウサイズによってロゴが切れちゃうから。

ロゴをのっける方法。ひとつ目は透過アニメーション GIF、でもこれはエッジが汚い。ふたつめ、連番 PNG は実装がめんどい。というところでさっきの `mix-blend-mode` の再登場。`video` エレメントにも使えるんかなーとやってみたら普通にいけました。`autoplay` と `loop` 設定して画面からはみ出ないように位置調整すれば完成。

### レスポンシブ

基本的にはデスクトップでもモバイルでも HTML 構造はそのまま CSS だけでレイアウト変える感じにしときたいけどそうはいかない部分も少なからずあって、それが SSG と相性が悪い。サーバー側では1つの URL に対して1つの HTML が生成されるのでデバイスごとに変えられない。

ぜんぜんこのへんのベストプラクティスがわからんのだが、とりあえず SSG ではデバイス別に DOM 構造が違うコンポーネントをレンダリングしない、っていうのを実装。[`useLayoutEffect` フックでブラウザ上で動いてるときだけマウントする。](https://github.com/Whatever-Inc/whatever.co-2021/blob/d6b1fd0495dc0f0f9399cca9fff2cc142c0cf343/components/Responsive.tsx)（各デバイス用コンポーネント全部のっけてブラウザ側で消すってのもアリか？）

そして Media Qurey まわりもよくわからんのだけど、styled-jsx で各コンポーネントごとに `@media` で場合分けしてるとその query 部分をどうしても外に出したくなって、CSS Variables でいけるかなーと思ったら CSS Vars は query には適用できなくって、最終的に [postcss](https://postcss.org/) なら設定が外に出せることがわかって [styled-jsx-plugin-postcss](https://github.com/giuseppeg/styled-jsx-plugin-postcss) を導入。（いま気づいたけどブレイクポイントが適当に 800px とかになってるのはいいのだろうか……否……）

### Favicon

favicon のアニメーションは [dotby.jp の頃のやつ](https://qiita.com/Saqoosha/items/597466bdcd76b2ddfdcf#favicon)の流用。  
[定期的に `Link` タグの `href` をみんなの手書き "W" の画像に設定してる](https://github.com/Whatever-Inc/whatever.co-2021/blob/d6b1fd0495dc0f0f9399cca9fff2cc142c0cf343/lib/FaviconAnimator.ts)だけ。

## SEO

### OG tags

OG タグをちゃんと設定しとかないと Facebook とか Twitter に投稿したときに画像とかがちゃんと出てくれないので [OG タグを設定するコンポーネント](https://github.com/Whatever-Inc/whatever.co-2021/blob/d6b1fd0495dc0f0f9399cca9fff2cc142c0cf343/components/OGPInfo.tsx)を作って全ページに仕込んだ。

ただし `og:image` はちゃんとドメインを含んだ完全な URL として書かないとサービスによってはちゃんと読んでくれないんだけど、Vercel にデプロイしたときのドメインはブランチ名含んだやつとか commit hash が入ったやつとか複数あって SSG の都合上本番ドメインで決め打たないといけなくって、本番環境でしかちゃんと動いてるのが確認できないのがちょっと難点。

### sitemap.xml

検索エンジン用に sitemap.xml もちゃんと作る。つってもすでに先人がやってくれているので必要な URL をリストアップして [sitemap ライブラリ](https://www.npmjs.com/package/sitemap)に渡せばよい。

<https://zenn.dev/catnose99/articles/c441954a987c24>

## その他

### ページ内検索できない

`visibility: hidden` なエレメントを `IntersectionObserver` で画面に入ってきたタイミングで `visible` にしてるのでページ内検索ができない。これどうしたらいいんだろーなー？ `visibility` じゃなくて `opacity: 0` にすればいいんだろうか……

### ページング処理はやらない

[WORK](https://whatever.co/ja/work/category/all/) とか [NEWS](https://whatever.co/ja/news/) とかすんごい長くなってしまうからページ分割して infinite scroll 的な処理したほうがいいのかなーとも思ったのだけど、画像を lazy loading してたらデータ量的には大したことないしそもそもその実装はめんどくさいし SSG との相性も悪そう、ということで長いママ。

## まとめ

次作るときは WordPress やめるかなー？データ移行大変だけどもうちょっと CMS 側を柔軟にいじくれるほうが WordPress のプラグインたちに振り回されなくてよいかもしれない。

Next.js は簡単にめちゃ速いサイトつくれるのでよいけど、Vercel 以外のホスティングでも使いやすくなるともっと流行りそうな気がする。ISR まわりをいい感じに調整するのはいろいろ経験がひつようそう。まあこれぐらいのコーポレートサイトなら適当にやってもなんとかなる。

TypeScript まわりで何も書くことなかった😅　まあこれぐらいのコーポレートサイトなら型とか適当にやってもなんとかなる。VSCode の suggestion まわりが賢くなるのはよい。

WordPress のフロント側つくるだけだから簡単っしょ〜って思ってたらハマりどころにいろいろハマって苦労したけどいいサイトができたのでよかったですね。いつまで持つかな〜😂
