  <h1 align="center">
    <a href="https://github.com/aminomancer/Netflix-Marathon-Pausable"><img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/icon.svg" width="80em" /><br>
      <b>网飞马拉松赛（可暫停）</b></a><br>
  <sup><b>安装：<a href="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js">jsDelivr</a>&nbsp;or&nbsp;<a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js">Greasy Fork</a></b></sup>
  </h1>

一种可配置的用户脚本，该脚本自动跳过介绍，信用和广告，并单击Netflix和Amazon Prime Video上的“下一集”提示。需要一个[Violentmonkey](https://violentmonkey.github.io/)或[Tampermonkey](https://www.tampermonkey.net/)之类的用户脚本管理器。Greasemonkey也完全受支持，但我不建议这样做。如果收到任何请求，我会考虑将其转换为浏览器插件。

该脚本通过查询文档中跳过视频的元素来工作。通常，即使您可能想看学分之类的东西，它也会不断地这样做。因此，我认为最好添加一个切换按钮来立即禁用/启用搜索，而无需重新加载网站。默认情况下，热键为Ctrl + F7。它会暂停时间间隔，这意味着暂停时不会跳过任何内容。再次按下热键将恢复间隔。它还会根据您使用的插件，在插件的弹出菜单或上下文菜单中添加2个按钮。

热键还会显示一个简短的弹出窗口，显示该间隔是暂停还是恢复，因此您不会忘记间隔是打开还是关闭。您可以通过按Alt + N来配置脚本设置。您也可以在用户脚本管理器的菜单中单击“打开设置”命令以打开弹出窗口。您可以更改热键，禁用网站之一，更改间隔率，更改暂停/继续弹出窗口的各个方面，或者完全禁用弹出窗口。

如果存在某个播放器或跳过元素，则此脚本无法满足您的要求，请在问题页面上发布一些细节，并在可能的情况下为您正在考虑的元素提供有效的CSS选择器。如果它没有静态的类或ID，请给我标签名称，文本内容，img src，屏幕截图或可以想象用来在DOM中标识它的任何其他内容。谢谢！

Forked from [Netflix Marathon](https://greasyfork.org/en/scripts/30029-netflix-marathon)

<h2>组态：</h2>

<small>设置被永久存储在插件的本地存储中，以确保它们在脚本更新中保持不变。您可以通过以下方法更改它们：转到Netflix或Amazon，然后按Alt + N，或通过插件的工具栏按钮单击菜单命令。这些是设置，以及它们的功能的简要说明：

| 选项 | 默认值 | 类型 | 描述 |
|-|-|-|-|
| **Interval&#160;Rate** | 300 | integer | 时间间隔（以毫秒为单位）。这决定了脚本多久检查一次元素并尝试单击它们。如果您的计算机是马铃薯，则可能需要增加此数字。 |
| **Run&#160;on&#160;Amazon** | true | boolean | 是否在亚马逊上运行 |
| **Run&#160;on&#160;Netflix** | true | boolean | 是否在网飞上运行 |
| **Hotkey&#160;code** | F7 | string | 您要使用的密钥。例如，如果您想要Ctrl + Alt + F，请将hotkey设置为KeyF。这是code，而不是keyCode。[在这里查看清单](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)。 |
| **Enable&#160;hotkey** | true | boolean | 是否使用热键。 |
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
