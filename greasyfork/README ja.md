  <h1 align="center">
    <a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js"><img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/icon.svg" width="80em" /><br>
      <b>Netflix Marathon（一時停止できます）</b></a><br>
  <sup><b>インストール：&nbsp;&nbsp;<a href="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js">jsDelivr</a>&nbsp;または&nbsp;<a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js">Greasy Fork</a></b></sup>
  </h1>

イントロ、クレジット、広告を自動的にスキップし、NetflixとAmazon PrimeVideoの「次のエピソード」プロンプトをクリックする構成可能なユーザースクリプト。[Violentmonkey](https://violentmonkey.github.io/)やTampermonkeyなどのユーザースクリプトマネージャーが必要です。[Tampermonkey](https://www.tampermonkey.net/)もサポートされていますが、設定設定はサポートされていません。誰かがそれを要求した場合、私はいつかこれをアドオンに変換するかもしれません。

このスクリプトは、ビデオをスキップする要素についてドキュメントにクエリを実行することで機能します。通常、クレジットなどを監視したい場合でも、これは常に実行されます。そのため、ウェブサイトをリロードせずに、その場で検索を無効/有効にするトグルを追加するとよいと思いました。デフォルトでは、ホットキーはCtrl + F7です。間隔を一時停止します。つまり、一時停止中は何もスキップしません。ホットキーをもう一度押すと、間隔が再開されます。また、ユーザースクリプトマネージャーに応じて、アドオンのポップアップメニューまたはコンテキストメニューにボタンを追加します。

ホットキーには、間隔が一時停止されているか再開されているかを示す短いポップアップも表示されるため、間隔がオンかオフかを見失うことはありません。このスクリプトは構成変数を使用します。構成変数は、スクリプトアドオンの[値]ページで変更できます。たとえば、ホットキーを変更したり、Webサイトのいずれかを無効にしたり、間隔レートを変更したり、一時停止/再開ポップアップのさまざまな側面を変更したり、ポップアップを完全に無効にしたりする場合です。

このスクリプトで処理できないプレーヤーまたはスキップ要素がある場合は、問題のページに詳細を投稿し、可能であれば、考えている要素の有効なCSSセレクターを含めます。（右クリック>ソースの検査）静的クラスまたはIDがない場合は、タグ名、テキストコンテンツ、img src、スクリーンショット、またはDOMでそれを識別するその他のものを含めます。ありがとう！

Forked from [Netflix Marathon](https://greasyfork.org/en/scripts/30029-netflix-marathon)

<h2>構成：</h2>

<small>**設定を構成する前に、スクリプトを少なくとも1回実行する必要があります**。スクリプトをインストールしてから、NetflixまたはAmazonにアクセスして、設定を生成します。次に、userscript拡張機能で、スクリプトのページに移動し、値/ストレージページの設定を変更します。（たとえば、Violentmonkeyでは、上部にコードタブ、設定、および値があります。[値]タブをクリックします）これにより、スクリプトが更新された場合でも設定を保持できます。設定は次のとおりです。

| オプション | デフォルト値 | タイプ | 説明 |
|-|-|-|-|
| **`rate`** | 300 | integer | ミリ秒単位の間隔レート—クリックする要素をチェックする頻度。お使いのコンピューターがジャガイモの場合は、この設定を増やすことができます。 |
| **`amazon`** | true | boolean | スクリプトがAmazonで実行されるかどうか。 |
| **`netflix`** | true | boolean | スクリプトがNetflixで実行されるかどうか。 |
| **`hotkey`** | true | boolean | 使用するキー。たとえば、 `KeyF`はFキー用です。これは `code`であり、` keyCode`ではありません。 [こちらのリストをご覧ください](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)。 |
| **`ctrlKey`** | true | boolean | 次の設定は修飾キー用です。修飾キーを使用したくない場合は、これらを`false`に設定します。複数使用する場合は、`true`に設定してください。 |
| **`altKey`** | false | boolean |  |
| **`shiftKey`** | false | boolean |  |
| **`metaKey`** | false | boolean | [ブラウザとオペレーティングシステムによって異なります。](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey) |
| **`pop`** | true | boolean | 一時停止/再開ポップアップを表示するかどうか。 |
| **`popDur`** | 3000 | integer | ポップアップを開いたままにしておく時間（ミリ秒単位）。 |
| **`font`** | "Source&#160;Sans&#160;Pro" | string | ポップアップに使用するフォント。PCにローカルにインストールされていない場合は、[Google Fonts](https://fonts.google.com/)で利用可能であり、**`webfont`**が` true`である必要があります。 |
| **`fontSize`** | "24px" | string | ピクセル単位のフォントサイズと、それに続く引用符で囲まれた `px`。 |
| **`fontWeight`** | "300" | string | 引用符で囲まれた、100〜900の100の倍数のフォントの太さ。 |
| **`italic`** | false | boolean | フォントを斜体にするかどうか。 |
| **`webfont`** | true | boolean | GoogleFontsからフォントを取得するかどうか。 |
