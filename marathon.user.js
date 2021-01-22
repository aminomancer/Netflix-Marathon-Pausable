// ==UserScript==
// @name         Netflix Marathon (Pausable)
// @namespace    https://github.com/aminomancer
// @version      4.2
// @description  A configurable userscript that automatically skip recaps, intros, credits, and ads, and clicks "next episode" prompts on Netflix and Amazon Prime Video. Customizable hotkey to pause/resume the auto-skipping functionality. Greasemonkey is supported too, but not recommended if you intend to customize any settings. This script works by querying the document for elements that skip through the video. Normally it does this constantly, even when you might want to watch the credits or something. So I thought it'd be nice to add a toggle to disable/enable the searching, on the fly, without needing to reload the website. By default, the hotkey is Ctrl+F7. It pauses the interval, meaning it won't skip anything while paused. Hitting the hotkey again resumes the interval. It also adds a button to your addon's popup menu or context menu, depending on the addon. The hotkey also displays a brief popup showing whether the interval is paused or resumed, so you won't lose track of whether it's on or off. The script uses configuration variables, so you can change them on your script addon's "Values" page if you want to change the hotkey, disable one of the websites, change the interval rate, change various aspects of the pause/resume popup, or disable the popup altogether.
// @author       aminomancer
// @homepageURL  https://github.com/aminomancer/Netflix-Marathon-Pausable
// @supportURL   https://github.com/aminomancer/Netflix-Marathon-Pausable/issues
// @downloadURL  https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/marathon.user.js
// @icon         data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 157.1 158.4"><path d="M156.3 79.6c0-42.8-34.9-77.7-77.7-77.7C35.7 1.9.9 36.7.9 79.6c0 39.5 29.5 72.6 68.7 77.2v-47.4c-25-3.8-43.8-25.5-43.8-50.7C25.8 30.4 49 7.4 77.6 7.4c28.5 0 51.8 23 51.8 51.3 0 26.1-19.6 47.9-45.6 51v47.6c40.6-2.8 72.5-36.8 72.5-77.7z"/><path d="M77.4 16c-23.2 0-42.1 18.9-42.1 42.1s18.9 42.1 42.1 42.1 42.1-18.9 42.1-42.1S100.7 16 77.4 16zm18.8 75.8c0 .1 0 .1 0 0v.1h-.9c-.2 0-.3 0-.5-.1-3.1-.4-7.1-.7-10.4-.9-1.1-.1-2-.1-2-.1l-.2-.4c-.1-.3-.2-.7-.4-1.2-.1-.2-.2-.5-.3-.8 0-.1 0-.1-.1-.1-.4-1.1-.9-2.5-1.5-4.2-1.5-4.3-3.8-10.6-6.7-18.8l-1.1-3v14.3c0 13.6 0 14.3-.2 14.3-.5 0-4.9.3-6.3.4-1 .1-2.9.3-4.3.4-1.2.2-2.3.3-2.4.3V24.2h13.4l.1.2.2.6c.2.6.5 1.4.9 2.5.1.2.1.4.2.6.1.4.3.8.4 1.2.2.6.5 1.3.7 2 0 .1.1.3.1.4.2.6.1.4.4 1.2.5 1.5 1 2.9 1.4 4.1.8 2.3 1.5 4.1 2 5.6.4 1.1.7 2 1 2.8.8 2.4 1.3 3.7 1.9 5.3l1.2 3.5v-30H96V58c.2 17.8.2 32.5.2 33.8z"/></svg>
// @include      https://www.netflix.com/*
// @include      https://*.amazon.com/*
// @include      https://*.primevideo.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

// You can customize the websites, hotkey, interval rate, and popup settings. ***Don't change the values below*** These are only the default settings. open netflix or amazon once so they'll initialize, and then in your userscript extension, go to the script's page and change the settings in the values/storage page. (e.g. in violentmonkey, at the top there's a code tab, settings, and values. click the values tab) This ensures that you keep your settings even if the script is updated. I don't recommend greasemonkey but if you need to use it for some reason, there is no UI to change stored settings, and I don't want to add a UI to such a simple script, so your only option is to edit the default options below. They will be reset when the script is updated though, so you will need to turn auto update off.
const defaultOptions = {
    rate: 300, // integer: interval rate in milliseconds. (how often to check for the elements we want to click) increase if you're running this on a mega-potato?
    amazon: true, // boolean: whether to bother checking for amazon elements
    netflix: true, // boolean: whether to check for netflix elements

    hotkey: true, // boolean: whether to use a hotkey at all
    code: "F7", // string: physical key, e.g. KeyF for the F key. code, NOT keyCode. see the list here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
    ctrlKey: true, // boolean: modifier keys. if you don't want to use a modifier key, set these to false. if you want to use multiple, set them to true. don't delete these lines though.
    altKey: false,
    shiftKey: false,
    metaKey: false,

    pop: true, // boolean: whether to show pause/resume popups at all
    popDur: 3000, // integer: how long to leave the popup open for
    font: "Source Sans Pro", // string: font to use for the popup. if it's not locally installed on your PC, then it must be available on https://fonts.google.com/ and webfont must be true (see below)
    fontSize: "24px", // string: font size in pixels, followed by px, in quotes.
    fontWeight: "300", // string: font weight, in multiples of 100 between 100 and 900, surrounded by quotes.
    italic: false, // boolean: whether the font should be italic or not
    webfont: true, // boolean: whether to grab the font from google fonts
};
const options = {}, // don't edit this. the script fills it with your stored settings.
    GMObj = typeof GM === "object" && GM !== null && typeof GM.getValue === "function", // ensure the GM object exists so we can use the right GM API functions
    GM4 = GMObj && GM.info.scriptHandler === "Greasemonkey" && GM.info.version >= 4, // check if the script handler is GM4, since if it is, we can't add a menu command
    site = test("netflix") ? "netflix" : "amazon";

let marathon = {
    count: 0,
    results: null,
    nDrain: "[data-uia='next-episode-seamless-button-draining']",
    nReady: "[data-uia='next-episode-seamless-button']",
    /**
     * getElementsByClassName
     * @param {string} s (class name)
     */
    $c(s) {
        return document.getElementsByClassName(s);
    },
    /**
     * getElementsByTagName
     * @param {string} s (tag name)
     */
    $t(s) {
        return document.getElementsByTagName(s);
    },
    /**
     * getElementById
     * @param {string} s (element id)
     */
    $i(s) {
        return document.getElementById(s);
    },
    /**
     * querySelector
     * @param {string} s (CSS selector e.g. ".class")
     */
    $q(s) {
        return document.querySelector(s);
    },
    /**
     * querySelectorAll
     * @param {string} s (CSS selector)
     */
    $qa(s) {
        return document.querySelectorAll(s);
    },
    /**
     * document.evaluate
     * @param {string} s (node's text content)
     * @param {string} n (node's tag name. if not passed, then accept any tag)
     * @param {string} p (node's parent's tag name. this is like saying button>div. if not passed, then just use div, ignoring the node's parent)
     */
    $ev(s, n = "*", p) {
        let exp = p ? `//${p}/child::${n}[text()="${s}"]` : `//${n}[text()="${s}"]`;
        return document.evaluate(
            exp,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            this.results
        ).singleNodeValue;
    },
    /**
     * :contains
     * @param {string} s (node's text content)
     */
    $cnt(s) {
        return $(`div *:contains('${s}')`);
    },
    /**
     * click every element with the given text content
     * @param {string} s (node's text content)
     */
    $click(s) {
        let divs = this.$cnt(s);
        for (let i = 0; i < divs.length; i++) {
            if (divs[i].innerText == s) {
                divs[i].click();
                this.count = 5;
            }
        }
    },
    /**
     * find react property
     * @param {object} d (DOM node)
     */
    findReact(d) {
        for (const k in d) {
            if (k.startsWith("__reactInternalInstance$")) {
                return d[k]?.child;
            }
        }
        return null;
    },
    /**
     * get a node's react children
     * @param {string} s (CSS selector)
     */
    getReact(s) {
        const el = this.$qa(s);
        return el.length > 0 ? this.findReact(el[0])?.memoizedProps.children : null;
    },
    /**
     * determine if an element is visible (namely the amazon player)
     * @param {string} s (element id)
     */
    isVis(s) {
        return this.$i(s)?.offsetParent ? true : false;
    },

    // searches for elements that skip stuff. repeated every 300ms. change "rate" in the options if you want to make this more or less frequent.
    async amazon() {
        if (this.count === 0) {
            // console.log(this.count);
            if (this.isVis("dv-web-player")) {
                if (this.$c("atvwebplayersdk-nextupcard-button").length) {
                    // console.log('Found Amazon video next.');
                    setTimeout(() => {
                        this.$c("atvwebplayersdk-nextupcard-button")[0]?.click();
                    }, 700);
                    this.count = 5;
                } else if (this.$c("atvwebplayersdk-skipelement-button").length) {
                    this.$c("atvwebplayersdk-skipelement-button")[0]?.click();
                    this.count = 5;
                } else if (this.$c("adSkipButton").length) {
                    // console.log('Found Amazon skip ad.');
                    this.$c("adSkipButton")[0].click();
                    this.count = 5;
                } else if (this.$c("skipElement").length) {
                    // console.log('Found Amazon skip intro.');
                    this.$c("skipElement")[0].click();
                    this.count = 5;
                } else if (this.$ev("Skip Intro")) {
                    // console.log('Found Amazon skip intro.');
                    this.$ev("Skip Intro").click();
                    this.count = 5;
                } else if (this.$cnt("Skip").length) {
                    // amazon trailers
                    this.$click("Skip");
                    this.count = 5;
                } else if (this.$cnt("Skip Intro").length) {
                    // amazon intro
                    this.$click("Skip Intro");
                    this.count = 5;
                } else if (this.$cnt("Skip Recap").length) {
                    // amazon recap
                    this.$click("Skip Recap");
                    this.count = 5;
                } else {
                    // console.log('404 keep looking.');
                }
            }
        } else {
            this.count--;
        }
    },

    async netflix() {
        if (this.count === 0) {
            if (this.$c("skip-credits").length && this.$c("skip-credits-hidden").length == 0) {
                // console.log('Found credits.');
                await sleep(200);
                this.$c("skip-credits")[0].firstElementChild.click();
                await sleep(200);
                this.$q(".button-nfplayerPlay").click();
                this.count = 80;
                // console.log('Found credits. +4s');
            } else if (this.$q(this.nDrain)) {
                // console.log('Netflix next episode draining button skipped');
                this.getReact(this.nDrain)._owner.memoizedProps.handlePress();
                this.count = 5;
            } else if (this.$q(this.nReady)) {
                // console.log('Netflix next episode button skipped');
                this.getReact(
                    this.nReady
                ).props.children._owner.memoizedProps.onClickWatchNextEpisode();
                this.count = 5;
            } else if (this.$c("postplay-still-container").length) {
                // console.log('Found autoplay.');
                this.$c("postplay-still-container")[0].click();
                this.count = 5;
            } else if (this.$c("WatchNext-still-container").length) {
                // console.log('Found autoplay.');
                this.$c("WatchNext-still-container")[0].click();
                this.count = 5;
            } else {
                // console.log('404 keep looking.');
            }
        } else {
            this.count--;
        }
    },
};

/**
 * pause execution for ms milliseconds
 * @param {int} ms (milliseconds)
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {string} u (a string to test the URL against)
 */
function test(u) {
    return window.location.href.includes(u);
}

// an interval constructor that you can pause and resume, and which opens a brief popup when you do so.
class PauseUtil {
    /**
     * pausable interval utility
     * @param {func} callback (the stuff you want to execute periodically, in this case marathon.netflix or marathon.amazon)
     * @param {int} int (how often to repeat the callback)
     */
    constructor(callback, int) {
        this.callback = callback;
        this.int = int;
        this.popup = options.pop ? document.createElement("div") : null; // if popup is disabled, create nothing
        this.text = options.pop ? document.createTextNode("Marathon: Paused") : null; // if popup is disabled, create nothing
        this.remainder = 0; // how much time is remaining on the interval when we pause it
        this.fading; // 3 second timeout (by default), after which the popup fades
        this.pauseState = 0; //  0: idle, 1: running, 2: paused, 3: resumed

        this.register("Pause Marathon", true); // initial creation of the menu command
        // if popup is enabled in options, style it
        if (options.pop) {
            document.body.insertBefore(this.popup, document.body.firstElementChild);
            this.popup.appendChild(this.text);
            this.popup.style.cssText = `position:fixed;top:50%;right:3%;transform:translateY(-50%);z-index:2147483646;background:hsla(0, 0%, 8%, 0.7);color:hsla(0, 0%, 97%, 0.95);max-width:-moz-fit-content;padding:17px 19px;border-radius:5px;pointer-events:none;letter-spacing:1px;transition:opacity 0.2s ease-in-out;opacity:0;`;
            this.popup.style.fontFamily = options.font;
            this.popup.style.fontSize = options.fontSize;
            this.popup.style.fontWeight = options.fontWeight;
            this.popup.style.fontStyle = options.italic ? "italic" : "";
        }
        this.time = new Date();
        this.timer = window.setInterval(this.callback, this.int);
        this.pauseState = 1;
    }

    // returns false if we're on a valid site but not actually in the video player (e.g. we're only browsing videos).
    get playing() {
        return site === "netflix" ? test("netflix.com/watch/") : marathon.isVis("dv-web-player");
    }

    // pause the interval
    pause() {
        if (this.pauseState !== 1) {
            return;
        }

        this.remainder = this.int - (new Date() - this.time);
        window.clearInterval(this.timer);
        this.pauseState = 2;

        this.register("Resume Marathon"); // update the menu command label
        this.openPopup(false);
    }

    // resume the interval
    async resume() {
        if (this.pauseState !== 2) {
            return;
        }

        this.pauseState = 3;

        this.register("Pause Marathon");
        this.openPopup(true);
        await sleep(this.remainder);
        this.run();
    }

    // when we pause, there's usually still time left on the interval. resume() calls this after waiting for the remaining duration. so this is what actually resumes the interval.
    run() {
        if (this.pauseState !== 3) {
            return;
        }

        this.callback();

        this.time = new Date();
        this.timer = window.setInterval(this.callback, this.int);
        this.pauseState = 1;
    }

    // toggle the interval on/off.
    toggle() {
        switch (this.pauseState) {
            case 1:
                return this.pause();
            case 2:
                return this.resume();
            default:
                return;
        }
    }

    /**
     * opens the popup and schedules it to close
     * @param {bool} state (whether the popup should say "Resumed" or "Paused")
     */
    openPopup(state) {
        // if popup is disabled in options, do nothing
        if (!options.pop) {
            return;
        }
        // if window is netflix or amazon but there's no video player, (e.g. we're browsing titles) do nothing but ensure the popup is hidden.
        if (!this.playing) {
            this.popup.style.transitionDuration = "1s";
            return (this.popup.style.opacity = "0");
        }

        let string = state ? "Resumed" : "Paused";
        this.popup.textContent = `Marathon: ${string}`;
        this.popup.style.transitionDuration = "0.2s";
        this.popup.style.opacity = "1";
        window.clearTimeout(this.fading); // clear any existing timeout since we're about to set a new one

        // schedule the popup to fade into oblivion
        this.fading = window.setTimeout(() => {
            this.popup.style.transitionDuration = "1s";
            this.popup.style.opacity = "0";
        }, options.popDur);
    }

    /**
     * register or change the label of the menu command
     * @param {string} cap (intended caption to display on the menu command)
     * @param {bool} firstRun (we call this function at startup and every time we pause/unpause. we don't need to register a menu command if this is the startup call, since none exists yet)
     */
    register(cap, firstRun = false) {
        if (GM4) {
            return; // don't register a menu command if the script manager is greasemonkey 4.0+ since the function doesn't exist
        }
        if (!firstRun) {
            GM_unregisterMenuCommand(this.caption);
        }
        GM_registerMenuCommand(cap, this.toggle.bind(this));
        this.caption = cap;
    }
}

// initial setup
function marathonSetUp() {
    if (!options[site]) {
        return; // if the site we're on is disabled in options, then don't bother setting up
    }
    let search = marathon[site].bind(marathon), // use the correct callback
        searchInterval = new PauseUtil(search, options.rate), // create the interval with our rate setting
        wf = options.webfont ? document.createElement("script") : null,
        first = document.scripts[0],
        ital = options.italic ? "ital," : "";

    /**
     * what to do when you press the hotkey.
     * @param {object} e (event)
     */
    function onKeyDown(e) {
        if (e.code == options.code && modTest(e)) {
            e.stopPropagation();
            searchInterval.toggle();
            e.preventDefault();
        }
    }

    /**
     * check that the modifier keys match those defined in user settings
     * @param {object} e (event)
     */
    function modTest(e) {
        let ctrl = options.ctrlKey,
            alt = options.altKey,
            shift = options.shiftKey,
            meta = options.metaKey;
        return e.ctrlKey == ctrl && e.altKey == alt && e.shiftKey == shift && e.metaKey == meta;
    }

    // start listening to key events
    function startCapturing() {
        window.addEventListener("keydown", onKeyDown, true);
    }

    // stop listening to key events (currently unused)
    function stopCapturing() {
        window.removeEventListener("keydown", onKeyDown, true);
    }

    WebFontConfig = {
        classes: false, // don't bother changing the DOM at all, we aren't listening for it
        events: false, // no need for events, not worth the execution
        google: {
            families: [`${options.font}:${ital}wght@1,${options.fontWeight}`], // e.g. "Source Sans Pro:wght@1,300" or "Lobster Two:ital,wght@1,700"
            display: "swap", // not really necessary since the popup doesn't appear until you press a button. but whatever
        },
    };

    // load web font if enabled
    if (options.webfont) {
        wf.src = "https://cdn.jsdelivr.net/npm/webfontloader@latest/webfontloader.js";
        wf.async = true;
        first.parentNode.insertBefore(wf, first);
    }

    // if hotkey is enabled in options, start listening to keyboard events
    if (options.hotkey) {
        startCapturing();
    }

    return {
        searchInterval,
        startCapturing,
        stopCapturing,
    };
}

// get settings from *monkey storage, and if any are missing, set them to defaults. then create properties in options (the js object) based on the stored settings.
async function settings() {
    // use the correct get/set functions for user's script handler
    let getVal = GMObj ? GM.getValue : GM_getValue,
        setVal = GMObj ? GM.setValue : GM_setValue;
    // for each key, either get or set
    for (const key in defaultOptions) {
        let stored = await getVal(`${key}`);
        if (stored != undefined) {
            options[key] = stored;
        } else {
            await setVal(`${key}`, defaultOptions[key]);
            options[key] = defaultOptions[key];
        }
    }
}

async function start() {
    await settings();
    marathonSetUp();
}

start();
