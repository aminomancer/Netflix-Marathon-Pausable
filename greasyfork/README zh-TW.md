<h1 align="center">
    <center>
        <a href="https://github.com/aminomancer/Netflix-Marathon-Pausable"><img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/icon-greasyfork.svg" width="80em" /><br>
        <b>网飞马拉松赛（可暫停）</b></a><br>
        <sup><b>安裝：<a href="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js">jsDelivr</a>&nbsp;或&nbsp;<a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js">Greasy Fork</a></b></sup>
    </center>
</h1>

这是一个用于流式传输电影和电视节目的 JavaScript 文件。 它适用于 Netflix、Amazon Prime Video、Hulu、HBO Max、Starz、Disney+ 和 Hotstar。 它会自动跳过重述、介绍、信用和广告。 它还单击“下一集”提示。 因此，您不必浪费时间单击这些按钮。 需要像 [Violentmonkey](https://violentmonkey.github.io/) 或 [Tampermonkey](https://www.tampermonkey.net/) 這樣的用戶腳本管理器。 Greasemonkey 也完全支持，但不推薦。 如果我收到任何請求，我會考慮將其轉換為 webextension 插件。

此腳本通過在文檔中查詢跳過視頻的元素來工作。 通常它會不斷地執行此操作，即使您可能想觀看演職員表或其他內容。 所以我認為添加一個切換來禁用/啟用搜索會很好，無需重新加載網站。 默認情況下，熱鍵是 Ctrl+F7。 它暫停間隔，這意味著它在暫停時不會跳過任何內容。 再次按下熱鍵可恢復間隔。 它還會在插件的彈出菜單或上下文菜單中添加 2 個按鈕，具體取決於您使用的插件。

該熱鍵還顯示一個簡短的彈出窗口，顯示間隔是暫停還是恢復，因此您不會忘記它是打開還是關閉。 您可以通過按 Alt+N 來配置腳本設置。 （設置熱鍵可以更改或禁用）您也可以單擊用戶腳本管理器菜單中的“打開設置”命令打開彈出窗口。 您可以更改熱鍵、禁用其中一個網站、更改間隔率、更改暫停/恢復彈出窗口的各個方面，或完全禁用彈出窗口。 設置實時更新，無需重新加載頁面。 如果您忘記了打開設置的熱鍵，請使用 Violentmonkey 工具欄按鈕中的菜單命令。

如果有一些網站或跳過元素，此腳本無法處理您想要的，請在問題頁面上發布一些詳細信息，如果可能，請為您正在考慮的元素提供有效的 CSS 選擇器。 （右鍵單擊 > 檢查源代碼）如果它沒有靜態類或 id，則給我標籤名稱、文本內容、img src、屏幕截圖或任何其他可能用於在 DOM 中識別它的東西。 謝謝~

從 [Netflix Marathon](https://greasyfork.org/en/scripts/30029-netflix-marathon) 分叉

<h2>配置：</h2>

<small>設置永久存儲在插件的本地存儲中，以確保它們通過腳本更新持續存在。 您可以通過訪問 Netflix 或 Amazon 並按 Alt + N 或通過插件的工具欄按鈕單擊菜單命令來更改它們。 這些是設置，及其功能的簡要說明：</small>

| 選項                                    | 默認值                    | 類型    | 說明                                                                                                                                                                                                                    |
| --------------------------------------- | ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Interval&#160;Rate**                  | 300                       | integer | 以毫秒為單位的間隔率——檢查我們想要點擊的元素的頻率。 如果您的計算機是一個巨大的土豆，請增加。                                                                                                                           |
| **Autoplay&#160;promoted&#160;videos**  | false                     | boolean | 在電影的最終演職員表或系列的最後一集之後，Netflix 會推薦熱門或類似的電影/系列。 如果您希望它自動啟動，請啟用此選項。                                                                                                    |
| **Run&#160;on&#160;Amazon**             | true                      | boolean | 在亞馬遜上啟用跳過。                                                                                                                                                                                                    |
| **Run&#160;on&#160;Netflix**            | true                      | boolean | 網飛                                                                                                                                                                                                                    |
| **Run&#160;on&#160;Disney+**            | true                      | boolean | 迪士尼+                                                                                                                                                                                                                 |
| **Run&#160;on&#160;Hotstar**            | true                      | boolean | 明星                                                                                                                                                                                                                    |
| **Run&#160;on&#160;Hulu**               | true                      | boolean | 葫蘆                                                                                                                                                                                                                    |
| **Run&#160;on&#160;HBO Max**            | true                      | boolean | HBO 最大                                                                                                                                                                                                                |
| **Run&#160;on&#160;Starz**              | true                      | boolean | 斯塔茲                                                                                                                                                                                                                  |
| **Hotkey&#160;code**&#160;（暂停/恢复） | F7                        | string  | 物理鍵，例如 `KeyF` 表示 F 鍵。 這是`event.code`，而不是`event.keyCode`。 [使用此工具](https://keycode.info) 或 [在此處查看完整列表](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)。 |
| **Enable toggle hotkey**                | true                      | boolean | 使用熱鍵啟用暫停/恢復。                                                                                                                                                                                                 |
| **Hotkey&#160;code**&#160;（设置）      | KeyN                      | string  | 物理鍵，例如 `Digit9` 代表數字 9。                                                                                                                                                                                      |
| **Enable settings hotkey**              | true                      | boolean | 啟用使用熱鍵打開設置面板。                                                                                                                                                                                              |
| **Ctrl&#160;key**                       | true                      | boolean | 接下來的四個設置用於修飾鍵。 如果您不想使用修飾鍵，請取消選中所有這四個。 如果要使用多個，請檢查所需的所有修飾鍵。                                                                                                      |
| **Alt&#160;key**                        | false                     | boolean |                                                                                                                                                                                                                         |
| **Shift&#160;key**                      | false                     | boolean |                                                                                                                                                                                                                         |
| **Meta&#160;key**                       | false                     | boolean | [取決於瀏覽器和操作系統。](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey)                                                                                                                      |
| **Enable&#160;popup**                   | true                      | boolean | 是否顯示暫停/恢復彈出窗口。                                                                                                                                                                                             |
| **Popup&#160;duration**                 | 3000                      | integer | 將彈出窗口打開多長時間。                                                                                                                                                                                                |
| **Use&#160;Google&#160;Fonts**          | true                      | boolean | 是否從 Google Fonts 抓取字體。                                                                                                                                                                                          |
| **Popup&#160;font**                     | Source&#160;Sans&#160;Pro | string  | 用於彈出窗口的字體。 如果它沒有本地安裝在您的 PC 上，那麼它必須在 [Google Fonts](https://fonts.google.com/) 上可用，並且必須選中 **`Use Google Fonts`**。                                                               |
| **Font&#160;size**&#160;(px)            | 24                        | integer | 字體大小（以像素為單位）。                                                                                                                                                                                              |
| **Font&#160;weight**                    | 300                       | integer | 字體粗細，100 到 900 之間的 100 的倍數。（數字越大越粗）                                                                                                                                                                |
| **Italic**                              | false                     | boolean | 字體是否應該是斜體。                                                                                                                                                                                                    |

<br>
<img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/settings-blur.webp" width=400 />
<details><summary>如果您使用 Firefox 並關心彈出窗口的外觀，請單擊此處。</summary>
<br>
這些彈出窗口使用 <code>backdrop-filter</code> 在其背後應用模糊效果，類似於 Windows 10 的丙烯酸玻璃效果。 這純粹是美學，所以你可以簡單地忽略它，但如果你使用 Firefox 並想要完整的視覺效果，還有一個額外的步驟：
<br><br>

1.  在你的 url 欄中輸入 <code>about:config</code> 然後回車。 搜索 <code>layout.css.backdrop-filter.enabled</code> 並將其切換為 true。<br>

2.  接下來，我們應該確保啟用了 WebRender：（它應該默認啟用）<br>

3.  從您的網址欄導航到 <code>about:support</code>。<br>

4.  找到圖形部分，並在合成行中，確保它顯示 WebRender。<br>

5.  如果沒有顯示 WebRender，請返回 <code>about:config</code>，然後搜索 <code>gfx.webrender.all</code> 並將其切換為 true。<br>

6.  然後搜索 <code>dom.webgpu.enabled</code> 並確保它設置為 false。<br>
    <br>

當您重新啟動 Firefox 時，支持頁面現在應該為“合成”部分顯示 WebRender。 如果您按照這些步驟操作，但仍然沒有顯示 WebRender，那麼它可能與您的圖形驅動程序、操作系統、硬件或 Firefox 版本不兼容。 在台式機上應該是極不可能的。 但是哦，好吧，這畢竟只是一個視覺效果。

</details>
<br>
