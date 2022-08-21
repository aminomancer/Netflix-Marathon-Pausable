<h1 align="center">
    <center>
        <a href="https://github.com/aminomancer/Netflix-Marathon-Pausable"><img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/icon-greasyfork.svg" width="80em" /><br>
        <b>网飞马拉松赛（可暂停）</b></a><br>
        <sup><b>安装：<a href="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js">jsDelivr</a>&nbsp;或&nbsp;<a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js">Greasy Fork</a></b></sup>
    </center>
</h1>

这是一个用于流式传输电影和电视节目的 JavaScript 文件。 它适用于 Netflix、Amazon Prime Video、Hulu、HBO Max、Starz 和 Disney+。 它会自动跳过重述、介绍、信用和广告。 它还单击“下一集”提示。 因此，您不必浪费时间单击这些按钮。 需要像 [Violentmonkey](https://violentmonkey.github.io/) 或 [Tampermonkey](https://www.tampermonkey.net/) 这样的用户脚本管理器。 Greasemonkey 也完全支持，但不推荐。 如果我收到任何请求，我会考虑将其转换为 webextension 插件。

此脚本通过在文档中查询跳过视频的元素来工作。 通常它会不断地执行此操作，即使您可能想观看演职员表或其他内容。 所以我认为添加一个切换来禁用/启用搜索会很好，无需重新加载网站。 默认情况下，热键是 Ctrl+F7。 它暂停间隔，这意味着它在暂停时不会跳过任何内容。 再次按下热键可恢复间隔。 它还会在插件的弹出菜单或上下文菜单中添加 2 个按钮，具体取决于您使用的插件。

该热键还显示一个简短的弹出窗口，显示间隔是暂停还是恢复，因此您不会忘记它是打开还是关闭。 您可以通过按 Alt+N 来配置脚本设置。 （设置热键可以更改或禁用）您也可以单击用户脚本管理器菜单中的“打开设置”命令打开弹出窗口。 您可以更改热键、禁用其中一个网站、更改间隔率、更改暂停/恢复弹出窗口的各个方面，或完全禁用弹出窗口。 设置实时更新，无需重新加载页面。 如果您忘记了打开设置的热键，请使用 Violentmonkey 工具栏按钮中的菜单命令。

如果有一些网站或跳过元素，此脚本无法处理您想要的，请在问题页面上发布一些详细信息，如果可能，请为您正在考虑的元素提供有效的 CSS 选择器。 （右键单击 > 检查源代码）如果它没有静态类或 id，则给我标签名称、文本内容、img src、屏幕截图或任何其他可能用于在 DOM 中识别它的东西。 谢谢~

从 [Netflix Marathon](https://greasyfork.org/en/scripts/30029-netflix-marathon) 分叉

<h2>配置：</h2>

<small>设置永久存储在插件的本地存储中，以确保它们通过脚本更新持续存在。 您可以通过访问 Netflix 或 Amazon 并按 Alt + N 或通过插件的工具栏按钮单击菜单命令来更改它们。 这些是设置，及其功能的简要说明：</small>

| 选项 | 默认值 | 类型 | 说明 |
|-|-|-|-|
| **Interval&#160;Rate** | 300 | integer | 以毫秒为单位的间隔率——检查我们想要点击的元素的频率。 如果您的计算机是一个巨大的土豆，请增加。 |
| **Autoplay&#160;promoted&#160;videos** | false | boolean | 在电影的最终学分或系列的最后一集之后，Netflix 会推荐热门或类似的电影/系列。 如果您希望它自动启动，请启用此选项。 |
| **Run&#160;on&#160;Amazon** | true | boolean | 在亚马逊上启用跳过。 |
| **Run&#160;on&#160;Netflix** | true | boolean | 网飞 |
| **Run&#160;on&#160;Disney+** | true | boolean | 迪士尼+ |
| **Run&#160;on&#160;Hulu** | true | boolean | 葫芦 |
| **Run&#160;on&#160;HBO Max** | true | boolean | HBO 最大 |
| **Run&#160;on&#160;Starz** | true | boolean | 斯塔兹 |
| **Hotkey&#160;code**&#160;（暂停/恢复） | F7 | string | 物理键，例如 `KeyF` 表示 F 键。 这是`event.code`，而不是`event.keyCode`。 [使用此工具](https://keycode.info) 或 [在此处查看完整列表](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)。 |
| **Enable toggle hotkey** | true | boolean | 使用热键启用暂停/恢复。 |
| **Hotkey&#160;code**&#160;（设置） | KeyN | string | 物理键，例如 `Digit9` 代表数字 9。 |
| **Enable settings hotkey** | true | boolean | 启用使用热键打开设置面板。 |
| **Ctrl&#160;key** | true | boolean | 接下来的四个设置用于修饰键。 如果您不想使用修饰键，请取消选中所有这四个。 如果要使用多个，请检查所需的所有修饰键。 |
| **Alt&#160;key** | false | boolean |  |
| **Shift&#160;key** | false | boolean |  |
| **Meta&#160;key** | false | boolean | [取决于浏览器和操作系统。](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey) |
| **Enable&#160;popup** | true | boolean | 是否显示暂停/恢复弹出窗口。 |
| **Popup&#160;duration** | 3000 | integer | 将弹出窗口打开多长时间。 |
| **Use&#160;Google&#160;Fonts** | true | boolean | 是否从 Google Fonts 抓取字体。 |
| **Popup&#160;font** | Source&#160;Sans&#160;Pro | string | 用于弹出窗口的字体。 如果它没有本地安装在您的 PC 上，那么它必须在 [Google Fonts](https://fonts.google.com/) 上可用，并且必须选中 **`Use Google Fonts`**。 |
| **Font&#160;size**&#160;(px) | 24 | integer | 字体大小（以像素为单位）。 |
| **Font&#160;weight** | 300 | integer | 字体粗细，100 到 900 之间的 100 的倍数。（数字越大越粗） |
| **Italic** | false | boolean | 字体是否应该是斜体。 |


<br>
<img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/settings-blur.webp" width=400 />
<details><summary>如果您使用 Firefox 并关心弹出窗口的外观，请单击此处。</summary>
<br>
这些弹出窗口使用 <code>backdrop-filter</code> 在其背后应用模糊效果，类似于 Windows 10 的丙烯酸玻璃效果。 这纯粹是美学，所以你可以简单地忽略它，但如果你使用 Firefox 并想要完整的视觉效果，还有一个额外的步骤：
<br><br>

1.  在你的 url 栏中输入 <code>about:config</code> 然后回车。 搜索 <code>layout.css.backdrop-filter.enabled</code> 并将其切换为 true。<br>

2.  接下来，我们应该确保启用了 WebRender：（它应该默认启用）<br>

3.  从您的网址栏导航到 <code>about:support</code>。<br>

4.  找到图像部分，并在合成行中，确保它显示 WebRender。<br>

5.  如果没有显示 WebRender，请返回 <code>about:config</code>，然后搜索 <code>gfx.webrender.all</code> 并将其切换为 true。<br>

6.  然后搜索 <code>dom.webgpu.enabled</code> 并确保它设置为 false。<br>
<br>

当您重新启动 Firefox 时，支持页面现在应该为“合成”部分显示 WebRender。 如果您按照这些步骤操作，但仍然没有显示 WebRender，那么它可能与您的图形驱动程序、操作系统、硬件或 Firefox 版本不兼容。 在台式机上应该是极不可能的。 但是哦，好吧，这毕竟只是一个视觉效果。

</details>
<br>