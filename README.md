  <h1 align="center">
    <a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js"><img src="./icon.svg" width="80em" /><br>
      <b>Netflix Marathon (Pausable)</b></a><br>
  <sup><b>Install: <a href="https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js">jsDelivr</a> / <a href="https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix Marathon (Pausable).user.js">Greasy Fork</a></b></sup>
  </h1>

A configurable userscript that automatically skip recaps, intros, credits, and ads, and clicks "next episode" prompts on Netflix and Amazon Prime Video. Requires a userscript manager like [Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey](https://www.tampermonkey.net/). Greasemonkey is supported too, but not recommended if you intend to customize any settings. If I get any requests I'll consider turning it into a webextension addon.

This script works by querying the document for elements that skip through the video. Normally it does this constantly, even when you might want to watch the credits or something. So I thought it'd be nice to add a toggle to disable/enable the searching, on the fly, without needing to reload the website. By default, the hotkey is Ctrl+F7. It pauses the interval, meaning it won't skip anything while paused. Hitting the hotkey again resumes the interval. It also adds a button to your addon's popup menu or context menu, depending on the addon.

The hotkey also displays a brief popup showing whether the interval is paused or resumed, so you won't lose track of whether it's on or off. The script uses configuration variables, so you can change them on your script addon's "Values" page if you want to change the hotkey, disable one of the websites, change the interval rate, change various aspects of the pause/resume popup, or disable the popup altogether.

If there's some player or skip element this script doesn't handle that you want it to, make a post on the issues page with some details, and if possible a valid CSS selector for the element you're thinking of. (right click > inspect source) If it doesn't have a static class or id then give me the tag name, text content, img src, or anything else that could conceivably be used to identify it in the DOM. Thanks~

Forked from [Netflix Marathon](https://greasyfork.org/en/scripts/30029-netflix-marathon)
