  <h1 align="center">
    <a href="https://github.com/aminomancer/Netflix-Marathon-Pausable"><img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/icon.svg" width="80em" /><br>
      <b>网飞马拉松赛（可暫停）</b></a><br>
  <sup><b>安装：<a href="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js">jsDelivr</a>&nbsp;or&nbsp;<a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js">Greasy Fork</a></b></sup>
  </h1>

一种可配置的用户脚本，该脚本自动跳过摘要，简介，片尾和广告，并单击网飞和Amazon Prime Video上的“下一集”提示。需要一个用户脚本管理器，例如[Violentmonkey](https://violentmonkey.github.io/)或[Tampermonkey](https://www.tampermonkey.net/)。也支持Greasemonkey，但如果您要自定义任何设置，则不建议这样做。如果收到任何请求，我会考虑将其转换为一个插件。

该脚本通过查询文档中跳过视频的元素来工作。通常，即使您可能想看学分之类的东西，它也会不断地这样做。因此，我认为最好添加一个切换按钮来立即禁用/启用搜索，而无需重新加载网站。默认情况下，热键为Ctrl + F7。它会暂停时间间隔，这意味着暂停时不会跳过任何内容。再次按下热键将恢复间隔。它还会根据插件的不同，在插件的弹出菜单或上下文菜单中添加一个按钮。

该热键还会显示一个简短的弹出窗口，显示该间隔是暂停还是恢复，因此您不会丢失间隔的打开或关闭状态。该脚本使用配置变量，因此，如果您要更改热键，禁用网站之一，更改间隔率，更改暂停/继续弹出窗口的各个方面，或者禁用，则可以在脚本插件的“值”页面上对其进行更改。完全弹出。

如果存在某个播放器或跳过元素，则此脚本无法满足您的要求，请在问题页面上发布一些细节，并在可能的情况下为您正在考虑的元素提供有效的CSS选择器。如果它没有静态的类或ID，请给我标签名称，文本内容，img src，屏幕截图或可以想象用来在DOM中标识它的任何其他内容。谢谢！

Forked from [Netflix Marathon](https://greasyfork.org/en/scripts/30029-netflix-marathon)

<h2>组态：</h2>

<small>**脚本至少需要运行一次**，然后才能配置设置。安装脚本，然后访问Netflix或Amazon，以便生成设置。然后，在用户脚本扩展名中，转到脚本页面，然后在“Values”页面中更改设置。（例如，在Violentmonkey中，顶部有一个“Code”标签，“Settings”和“Values”。单击“Values”标签），即使脚本已更新，这也可以确保您保留设置。这些是设置：

| 选项 | 默认值 | 类型 | 描述 |
|-|-|-|-|
| **`rate`** | 300 | integer | 时间间隔（以毫秒为单位）。这决定了脚本多久检查一次元素并尝试单击它们。如果您的计算机是马铃薯，则可能需要增加此数字。 |
| **`amazon`** | true | boolean | 是否在亚马逊上运行。 |
| **`netflix`** | true | boolean | 是否在网飞上运行。 |
| **`hotkey`** | true | boolean | 您要使用的密钥。例如，如果您想要Ctrl + Alt + F，请将`hotkey`设置为`KeyF`。这是`code`，而不是`keyCode`。[在这里查看清单](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values). |
| **`ctrlKey`** | true | boolean | 这些设置用于修饰键。如果您不想使用修饰键，请将其设置为`false`。如果要使用多个，请将它们设置为`true`。 |
| **`altKey`** | false | boolean |  |
| **`shiftKey`** | false | boolean |  |
| **`metaKey`** | false | boolean | [取决于浏览器和操作系统。](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey) |
| **`pop`** | true | boolean | 是否显示暂停/继续弹出窗口。 |
| **`popDur`** | 3000 | integer | 弹出窗口应保留的时间（以毫秒为单位）。 |
| **`font`** | "Source&#160;Sans&#160;Pro" | string | 用于弹出窗口的字体。如果未在您的PC上本地安装，则它必须在[Google Fonts](https://fonts.google.com/)上可用，并且 **`webfont`** 必须是`true`。 |
| **`fontSize`** | "24px" | string | 字体大小（以像素为单位），后跟引号中的`px`。 |
| **`fontWeight`** | "300" | string | 字体粗细，介于100和900之间的100的倍数，并用引号引起来。 |
| **`italic`** | false | boolean | 字体是否应为斜体。 |
| **`webfont`** | true | boolean | 是否从Google Fonts获取字体。 |