  <h1 align="center">
    <a href="https://github.com/aminomancer/Netflix-Marathon-Pausable"><img src="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/icon.svg" width="80em" /><br>
      <b>Netflix Marathon (Pausable)</b></a><br>
  <sup><b>Install:&nbsp;&nbsp;<a href="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js">jsDelivr</a>&nbsp;or&nbsp;<a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js">Greasy Fork</a></b></sup>
  </h1>

A configurable userscript that automatically skips recaps, intros, credits, and ads, and clicks "next episode" prompts on Netflix and Amazon Prime Video. Requires a userscript manager like [Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey](https://www.tampermonkey.net/). Greasemonkey is supported too, but not recommended if you intend to customize any settings. If I get any requests I'll consider turning it into a webextension addon.

This script works by querying the document for elements that skip through the video. Normally it does this constantly, even when you might want to watch the credits or something. So I thought it'd be nice to add a toggle to disable/enable the searching, on the fly, without needing to reload the website. By default, the hotkey is Ctrl+F7. It pauses the interval, meaning it won't skip anything while paused. Hitting the hotkey again resumes the interval. It also adds a button to your addon's popup menu or context menu, depending on the addon.

The hotkey also displays a brief popup showing whether the interval is paused or resumed, so you won't lose track of whether it's on or off. The script uses configuration variables, so you can change them on your script addon's "Values" page if you want to change the hotkey, disable one of the websites, change the interval rate, change various aspects of the pause/resume popup, or disable the popup altogether.

If there's some player or skip element this script doesn't handle that you want it to, make a post on the issues page with some details, and if possible a valid CSS selector for the element you're thinking of. (right click > inspect source) If it doesn't have a static class or id then give me the tag name, text content, img src, screenshot, or anything else that could conceivably be used to identify it in the DOM. Thanks~

Forked from [Netflix Marathon](https://greasyfork.org/en/scripts/30029-netflix-marathon)

<h2>Configuration:</h2>

<small>**The script needs to run at least once** before you can configure the settings. Install the script and then visit Netflix or Amazon so the settings will be generated. Then in your userscript extension, go to the script's page and change the settings in the values/storage page. (e.g. in Violentmonkey, at the top there's a code tab, settings, and values. click the values tab) This ensures that you keep your settings even if the script is updated. These are the settings:

| Option | Default value | Type | Description |
|-|-|-|-|
| **`rate`** | 300 | integer | Interval rate in milliseconds — How often to check for the elements we want to click. Increase if you're running this on a mega-potato? |
| **`amazon`** | true | boolean | Whether to bother checking for amazon elements. |
| **`netflix`** | true | boolean | Whether to check for netflix elements. |
| **`hotkey`** | true | boolean | Physical key, e.g. `KeyF` for the F key. This is the `code`, NOT the `keyCode`. [See the list here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values). |
| **`ctrlKey`** | true | boolean | The following are for modifier keys. If you don't want to use a modifier key, set all of these to `false`. If you want to use multiple, set them to `true`. |
| **`altKey`** | false | boolean |  |
| **`shiftKey`** | false | boolean |  |
| **`metaKey`** | false | boolean | [Depends on browser and OS.](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey) |
| **`pop`** | true | boolean | Whether to show pause/resume popups at all. |
| **`popDur`** | 3000 | integer | How long to leave the popup open for. |
| **`font`** | "Source&#160;Sans&#160;Pro" | string | Font to use for the popup. If it's not locally installed on your PC, then it must be available on [Google Fonts](https://fonts.google.com/) and **`webfont`** must be `true`. |
| **`fontSize`** | "24px" | string | Font size in pixels, followed by `px`, in quotes. |
| **`fontWeight`** | "300" | string | Font weight, in multiples of 100 between 100 and 900, surrounded by quotes. |
| **`italic`** | false | boolean | Whether the font should be italic or not. |
| **`webfont`** | true | boolean | Whether to grab the font from Google Fonts. |