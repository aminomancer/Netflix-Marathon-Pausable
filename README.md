# Netflix Marathon (Pausable)
[Click to install](https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js)

A configurable userscript that automatically skip recaps, intros, credits, and ads, and clicks "next episode" prompts on Netflix and Amazon. Use [Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey](https://www.tampermonkey.net/). If I get any requests I'll consider turning it into a webextension addon.

This script works by querying the document for elements that skip through the video. Normally it does this constantly, even when you might want to watch the credits or something. So I thought it'd be nice to add a toggle to disable/enable the searching, on the fly, without needing to reload the website. By default, the hotkey is Ctrl+F7. It pauses the interval, meaning it won't skip anything while paused. Hitting the hotkey again resumes the interval.

The hotkey also displays a brief popup showing whether the interval is paused or resumed, so you won't lose track of whether it's on or off. The script uses configuration variables, so you can change them on your script addon's "Values" page if you want to change the hotkey, disable one of the websites, change the interval rate, change various aspects of the pause/resume popup, or disable the popup altogether.

The script uses [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining). This is enabled by default in Firefox and in version 80 of Chromium-based browsers. If you use Chrome 79 or Edge 79 you'll need to enable the Experimental Javascript setting in flags. (Chrome: "chrome://flags"; Edge: "about:flags") Optional chaining doesn't exist at all in Chromium releases older than 79 or Firefox releases older than 74, so these are sort of minimum version requirements. If you want to use the script in a browser that doesn't support optional chaining, then open the script and find & replace all instances of "?." with "." e.g. "return d[k]?.child;" => "return d[k].child;"

If there's some player or skip element this script doesn't handle that you want it to, make a post on the issues page with some details, and if possible a valid CSS selector for the element you're thinking of. (right click > inspect source) If it doesn't have a static class or id then give me the tag name, text content, img src, or anything else that could conceivably be used to identify it in the DOM. Thanks~

Forked from [Netflix Marathon](https://greasyfork.org/en/scripts/30029-netflix-marathon)