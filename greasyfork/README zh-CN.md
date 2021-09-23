<h1 align="center">
    <center>
        <a href="https://github.com/aminomancer/Netflix-Marathon-Pausable"><img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/icon.svg" width="80em" /><br>
        <b>网飞马拉松赛（可暫停）</b></a><br>
        <sup><b>安装：<a href="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js">jsDelivr</a>&nbsp;or&nbsp;<a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js">Greasy Fork</a></b></sup>
    </center>
</h1>

这是一个用于流式传输电影和电视节目的 JavaScript 文件。 它适用于 Netflix、Amazon Prime Video 和 Disney+。 它会自动跳过重述、介绍、信用和广告。 它还单击“下一集”提示。 因此，您不必浪费时间单击这些按钮。 需要像 [Violentmonkey](https://violentmonkey.github.io/) 或 [Tampermonkey](https://www.tampermonkey.net/) 这样的用户脚本管理器。 Greasemonkey 也完全支持，但不推荐。 如果我收到任何请求，我会考虑将其转换为 webextension 插件。

此脚本通过查询文档中跳过视频的元素来工作。通常它会不断执行此操作，即使您可能想观看演职员表或其他内容。所以我认为最好添加一个切换来禁用/启用搜索，而无需重新加载网站。默认情况下，热键是 Ctrl+F7。它暂停间隔，这意味着它在暂停时不会跳过任何内容。再次按下热键可恢复间隔。它还向您的插件的弹出菜单或上下文菜单添加 2 个按钮，具体取决于您使用的插件。

热键还会显示一个简短的弹出窗口，显示间隔是暂停还是恢复，因此您不会忘记它是打开还是关闭。您可以通过按 Alt+N 来配置脚本设置。 （可以更改或禁用设置热键）您还可以单击用户脚本管理器菜单中的“打开设置”命令以打开弹出窗口。您可以更改热键、禁用其中一个网站、更改间隔率、更改暂停/恢复弹出窗口的各个方面，或完全禁用弹出窗口。设置实时更新，无需重新加载页面。如果您忘记了打开设置的热键是什么，请使用 Violentmonkey 工具栏按钮中的菜单命令。

如果有一些网站或跳过元素，这个脚本没有处理你想要的，在问题页面上发布一些细节，如果可能的话，为你正在考虑的元素提供一个有效的 CSS 选择器。 （右键单击 > 检查源代码）如果它没有静态类或 id，那么给我标签名称、文本内容、img src、屏幕截图或任何其他可以想象用于在 DOM 中识别它的东西。谢谢~

Forked from [Netflix Marathon](https://greasyfork.org/en/scripts/30029-netflix-marathon)

<h2>组态：</h2>

<small>设置被永久存储在插件的本地存储中，以确保它们在脚本更新中保持不变。您可以通过以下方法更改它们：转到Netflix或Amazon，然后按Alt + N，或通过插件的工具栏按钮单击菜单命令。这些是设置，以及它们的功能的简要说明：</small>

| 选项 | 默认值 | 类型 | 描述 |
|-|-|-|-|
| **Interval&#160;Rate** | 300 | integer | 时间间隔（以毫秒为单位）。这决定了脚本多久检查一次元素并尝试单击它们。如果您的计算机是马铃薯，则可能需要增加此数字。 |
| **Autoplay&#160;promoted&#160;videos** | false | boolean | Netflix可以在电影结尾或连续剧的最后一集之后播放推荐的电影或连续剧。如果要自动播放推荐，请启用此设置。 |
| **Run&#160;on&#160;Amazon** | true | boolean | 它应该在亚马逊上运行吗？ |
| **Run&#160;on&#160;Netflix** | true | boolean | 它应该在Netflix上运行吗？ |
| **Run&#160;on&#160;Disney+** | true | boolean | 它应该在迪士尼+上运行吗？ |
| **Hotkey&#160;code**&#160;（暂停/恢复） | F7 | string | 您要使用的密钥。例如，如果要使用Ctrl + Alt + F，请将此设置设置为`KeyF`。这是`event.code`，而不是`event.keyCode`。[使用此工具](https://keycode.info)查找所需的代码，或检查[完整列表](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)。 |
| **Enable toggle hotkey** | true | boolean | 绑定一个键盘快捷键，以便您可以随意暂停/恢复脚本。 |
| **Hotkey&#160;code**&#160;（设置） | KeyN | string | 物理键，例如，您可以使用`Digit9`绑定数字9。 |
| **Enable settings hotkey** | true | boolean | 绑定一个键盘快捷键，以打开设置面板。 |
| **Ctrl&#160;key** | true | boolean | 接下来的四个设置用于修饰键。如果您不想使用修饰键，请取消选中所有这四个。如果要使用多个，请检查所有想要的修饰键。 |
| **Alt&#160;key** | false | boolean |  |
| **Shift&#160;key** | false | boolean |  |
| **Meta&#160;key** | false | boolean | [取决于浏览器和操作系统。](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey) |
| **Enable&#160;popup** | true | boolean | 是否显示暂停/继续弹出窗口。 |
| **Popup&#160;duration** | 3000 | integer | 弹出窗口应保留的时间（以毫秒为单位）。 |
| **Use&#160;Google&#160;Fonts** | true | boolean | 是否从Google Fonts动态加载字体。 |
| **Popup&#160;font** | Source&#160;Sans&#160;Pro | string | 用于弹出窗口的字体。如果未在您的PC上本地安装，则它必须在[Google Fonts](https://fonts.google.com/)上可用，并且 **`Use Google Fonts`** 必须启用。 |
| **Font&#160;size**&#160;(px) | 24 | integer | 字体大小（以像素为单位）。 |
| **Font&#160;weight** | 300 | integer | 字体粗细，介于100到900之间，为100的倍数。数字越大，粗细越大。 |
| **Italic** | false | boolean | 字体是否应为斜体。 |


<br>
<img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/settings-blur.png" width=400 />
<details><summary>如果您使用Firefox并关心脚本的通知和设置菜单的外观，请单击此处。</summary>
<br>
这些弹出窗口使用<code>backdrop-filter</code>在其后面应用模糊效果，类似于Windows 10的丙烯酸玻璃效果。这纯粹是出于美学目的，因此您可以忽略这一点，但是如果您使用Firefox并希望获得完整的视觉效果，则需要执行额外的步骤：
<br><br>

1.  在网址栏中输入<code>about:config</code>并按Enter。搜索<code>layout.css.backdrop-filter.enabled</code>并将其切换为true。<br>

2.  接下来，我们应确保已启用WebRender ：（默认情况下已启用，但请确保）<br>

3.  从您的网址栏中导航到<code>about:support</code>。<br>

4.  找到“特性”部分，并在标记为“合成”的第一行中，确保其显示为WebRender。<br>

5.  如果没有显示WebRender，请返回到<code>about：config</code>，然后搜索<code>gfx.webrender.all</code>并将其切换为true。<br>

6.  然后搜索<code>dom.webgpu.enabled</code>并确保将其设置为false。<br>
<br>

重新启动Firefox后，支持页面现在应在“特性”旁边列出WebRender。如果您按照这些步骤操作，但仍未显示WebRender，则它可能与您的图形驱动程序，操作系统，硬件或Firefox版本不兼容。在台式机上，这种情况极不可能发生。但是不要担心。毕竟这只是视觉效果。

</details>
<br>