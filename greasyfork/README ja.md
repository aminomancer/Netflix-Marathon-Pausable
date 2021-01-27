<h1 align="center">
    <center>
        <a href="https://github.com/aminomancer/Netflix-Marathon-Pausable"><img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/icon.svg" width="80em" /><br>
        <b>Netflix Marathon（一時停止できます）</b></a><br>
        <sup><b>インストール：&nbsp;&nbsp;<a href="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js">jsDelivr</a>&nbsp;または&nbsp;<a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js">Greasy Fork</a></b></sup>
    </center>
</h1>

イントロ、クレジット、広告を自動的にスキップし、NetflixとAmazon PrimeVideoの「次のエピソード」プロンプトをクリックする構成可能なユーザースクリプト。[Violentmonkey](https://violentmonkey.github.io/)や[Tampermonkey](https://www.tampermonkey.net/)などのユーザースクリプトマネージャーが必要です。Greasemonkeyも完全にサポートされていますが、お勧めしません。誰かがそれを要求した場合、私はそれをブラウザ拡張機能に変えることを検討します。

このスクリプトは、ビデオをスキップする要素についてドキュメントにクエリを実行することで機能します。通常、これは常に実行されますが、突然映画のクレジットを見たいと思った場合はイライラする可能性があります。そのため、ウェブサイトをリロードせずに、その場で検索を無効/有効にするトグルを追加するとよいと思いました。デフォルトでは、ホットキーはCtrl + F7です。間隔を一時停止します。つまり、一時停止中は何もスキップしません。ホットキーをもう一度押すと、間隔が再開されます。また、使用するアドオンに応じて、アドオンのポップアップメニューまたはコンテキストメニューに2つのボタンが追加されます。

ホットキーには、間隔が一時停止されているか再開されているかを示す短いポップアップも表示されるため、間隔がオンかオフかを見失うことはありません。Alt + Nを押すと、スクリプト設定を構成できます。ユーザースクリプトマネージャーのメニューの[設定を開く]コマンドをクリックして、[設定]ポップアップを開くこともできます。ホットキーを変更したり、Webサイトのいずれかを無効にしたり、間隔レートを変更したり、一時停止/再開ポップアップのさまざまな側面を変更したり、ポップアップを完全に無効にしたりできます。

このスクリプトで処理できないプレーヤーまたはスキップ要素がある場合は、問題のページに詳細を投稿し、可能であれば、考えている要素の有効な CSS セレクターを含めます。（右クリック>ソースの検査）静的クラスまたは ID がない場合は、タグ名、テキストコンテンツ、img src、スクリーンショット、または DOM でそれを識別するその他のものを含めます。ありがとう！

<br>
<details><summary>Firefoxを使用していて、ポップアップをさらにきれいに見せたい場合は、ここをクリックしてください。</summary>
<img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/settings.png" width=400 />
<br>
これらのポップアップは、Windows 10のアクリルガラス効果と同様に、 <code>backdrop-filter</code>を使用して背後にぼかし効果を適用します。これは純粋に美的であるため、これは無視してかまいませんが、Firefoxを使用していて完全な視覚効果が必要な場合は、追加の手順があります。
<br><br>

1.  URLバーに<code>about：config</code>と入力してEnterキーを押します。<code>layout.css.backdrop-filter.enabled</code>を検索し、trueに切り替えます。<br>

2.  次に、WebRenderが有効になっていることを確認する必要があります:(デフォルトで有効になっていますが、確認しましょう）<br>

3.  URLバーから<code>about：support</code>に移動します。<br>

4.  グラフィックセクションを見つけ、合成の行で、WebRenderと表示されていることを確認します。<br>

5.  WebRenderと表示されていない場合は、 <code>about：config</code>に戻り、<code>gfx.webrender.all</code>を検索して、trueに切り替えます。<br>

6.  最後に、 <code>dom.webgpu.enabled</code>を検索し、falseに設定されていることを確認します。<br>
<br>

Firefoxを再起動すると、サポートページにWebRenderがコンポジターであることが表示されます。これらの手順を実行してもWebRenderと表示されない場合は、グラフィックドライバー、OS、ハードウェア、またはFirefoxのバージョンと互換性がない可能性があります。デスクトップではほとんどあり得ないはずです。しかし、それは大したことではありません。結局のところ、それは視覚効果にすぎません。

</details>
<br>

Forked from [Netflix Marathon](https://greasyfork.org/en/scripts/30029-netflix-marathon)

<h2>構成：</h2>

<small>設定はアドオンのローカルストレージに永続的に保存され、スクリプトの更新を通じて確実に保持されます。NetflixまたはAmazonに移動してAlt + Nを押すか、アドオンのツールバーボタンからメニューコマンドをクリックして、それらを変更できます。これらは設定とその機能の簡単な説明です。</small>

| オプション | デフォルト値 | タイプ | 説明 |
|-|-|-|-|
| **Interval&#160;Rate** | 300 | integer | ミリ秒単位の間隔レート—クリックする要素をチェックする頻度。お使いのコンピューターがジャガイモの場合は、この設定を増やすことができます。 |
| **Run&#160;on&#160;Amazon** | true | boolean | スクリプトがAmazonで実行されるかどうか。 |
| **Run&#160;on&#160;Netflix** | true | boolean | スクリプトがNetflixで実行されるかどうか。 |
| **Hotkey&#160;code** | F7 | string | 使用するキー。たとえば、 KeyFはFキー用です。これは codeであり、 keyCodeではありません。 [こちらのリストをご覧ください](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)。 |
| **Enable&#160;hotkey** | true | boolean | ホットキーを使用するかどうか。 |
| **Ctrl&#160;key** | true | boolean | 次の4つの設定は、修飾キー用です。修飾キーを使用したくない場合は、これら4つすべてのチェックを外してください。複数を使用する場合は、使用する各修飾キーを確認してください。 |
| **Alt&#160;key** | false | boolean | |
| **Shift&#160;key** | false | boolean | |
| **Meta&#160;key** | false | boolean | [ブラウザとオペレーティングシステムによって異なります。](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey) |
| **Enable&#160;popup** | true | boolean | 一時停止/再開ポップアップを表示するかどうか。 |
| **Popup&#160;duration** | 3000 | integer | ポップアップを開いたままにしておく時間（ミリ秒単位） |
| **Use&#160;Google&#160;Fonts** | true | boolean | GoogleFontsからフォントを動的に読み込むかどうか。 |
| **Popup&#160;font** | Source&#160;Sans&#160;Pro | string | ポップアップに使用するフォント。PCにローカルにインストールされていない場合は、[Google Fonts](https://fonts.google.com/)で利用可能である必要があり、**`Use Google Fonts`** をチェックする必要があります。 |
| **Font&#160;size**&#160;(px) | 24 | integer | ピクセル単位で測定されたフォントサイズ。 |
| **Font&#160;weight** | 300 | integer | フォントの太さ。100の倍数（100から900）。（大きいほど厚いことを意味します） |
| **Italic** | false | boolean | フォントを斜体にするかどうか。 |
