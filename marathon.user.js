// ==UserScript==
// @name               Netflix Marathon (Pausable)
// @name:zh-CN         网飞马拉松赛（可暫停）
// @name:zh-TW         网飞马拉松赛（可暫停）
// @name:ja            Netflix Marathon（一時停止できます）
// @name:ar            ماراثون Netflix (يمكن إيقافه مؤقتًا)
// @namespace          https://github.com/aminomancer
// @version            4.4.8
// @description        A configurable script that automatically skips recaps, intros, credits, and ads, and clicks "next episode" prompts on Netflix and Amazon Prime Video. Customizable hotkey to pause/resume the auto-skipping functionality. Alt + N for settings.
// @description:zh-CN  一个可配置的脚本，该脚本自动跳过介绍，信用和广告，并单击Netflix和Amazon Prime Video上的“下一个节目”提示。包括一个可自定义的热键，以暂停/恢复自动跳过功能。按Alt + N进行配置。
// @description:zh-TW  一个可配置的脚本，该脚本自动跳过介绍，信用和广告，并单击Netflix和Amazon Prime Video上的“下一个节目”提示。包括一个可自定义的热键，以暂停/恢复自动跳过功能。按Alt + N进行配置。
// @description:ja     イントロ、クレジット、広告を自動的にスキップし、NetflixとAmazon PrimeVideoの「次のエピソード」プロンプトをクリックする構成可能なスクリプト。自動スキップ機能を一時停止/再開するためのカスタマイズ可能なホットキーが含まれています。Alt + Nを押して構成します。
// @description:ar     برنامج نصي قابل للتكوين يتخطى تلقائيًا المقدمات والاعتمادات والإعلانات وينقر على "الحلقة التالية" على Netflix و Amazon Prime Video.يتضمن مفتاح اختصار قابل للتخصيص لإيقاف / استئناف وظيفة التخطي التلقائي.اضغط على Alt + N للتكوين.
// @author             aminomancer
// @homepageURL        https://github.com/aminomancer/Netflix-Marathon-Pausable
// @supportURL         https://github.com/aminomancer/Netflix-Marathon-Pausable/issues
// @downloadURL        https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix%20Marathon%20(Pausable).user.js
// @icon               data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 157.1 158.4"><path d="M156.3 79.6c0-42.8-34.9-77.7-77.7-77.7C35.7 1.9.9 36.7.9 79.6c0 39.5 29.5 72.6 68.7 77.2v-47.4c-25-3.8-43.8-25.5-43.8-50.7C25.8 30.4 49 7.4 77.6 7.4c28.5 0 51.8 23 51.8 51.3 0 26.1-19.6 47.9-45.6 51v47.6c40.6-2.8 72.5-36.8 72.5-77.7z"/><path d="M77.4 16c-23.2 0-42.1 18.9-42.1 42.1s18.9 42.1 42.1 42.1 42.1-18.9 42.1-42.1S100.7 16 77.4 16zm18.8 75.8c0 .1 0 .1 0 0v.1h-.9c-.2 0-.3 0-.5-.1-3.1-.4-7.1-.7-10.4-.9-1.1-.1-2-.1-2-.1l-.2-.4c-.1-.3-.2-.7-.4-1.2-.1-.2-.2-.5-.3-.8 0-.1 0-.1-.1-.1-.4-1.1-.9-2.5-1.5-4.2-1.5-4.3-3.8-10.6-6.7-18.8l-1.1-3v14.3c0 13.6 0 14.3-.2 14.3-.5 0-4.9.3-6.3.4-1 .1-2.9.3-4.3.4-1.2.2-2.3.3-2.4.3V24.2h13.4l.1.2.2.6c.2.6.5 1.4.9 2.5.1.2.1.4.2.6.1.4.3.8.4 1.2.2.6.5 1.3.7 2 0 .1.1.3.1.4.2.6.1.4.4 1.2.5 1.5 1 2.9 1.4 4.1.8 2.3 1.5 4.1 2 5.6.4 1.1.7 2 1 2.8.8 2.4 1.3 3.7 1.9 5.3l1.2 3.5v-30H96V58c.2 17.8.2 32.5.2 33.8z"/></svg>
// @include            https://www.netflix.com/*
// @include            https://*.amazon.com/*
// @include            https://*.primevideo.com/*
// @require            http://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @require            https://greasyfork.org/scripts/420683-gm-config-sizzle/code/GM_config_sizzle.js?version=894369
// @grant              GM_registerMenuCommand
// @grant              GM_unregisterMenuCommand
// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_deleteValue
// @grant              GM_listValues
// @grant              GM_openInTab
// @grant              GM.setValue
// @grant              GM.getValue
// @grant              GM.deleteValue
// @grant              GM.listValues
// @grant              GM.openInTab
// ==/UserScript==

const options = {}, // where settings are stored during runtime
    GMObj = typeof GM === "object" && GM !== null && typeof GM.getValue === "function", // check whether the GM object exists so we can use the right GM API functions
    GM4 = GMObj && GM.info.scriptHandler === "Greasemonkey" && GM.info.version.split(".")[0] >= 4, // check if the script handler is GM4, since if it is, we can't add a menu command
    site = test("netflix") ? "netflix" : "amazon",
    locale = {
        // some basic localization for the settings menu.
        get lang() {
            delete this.lang;
            return (this.lang = navigator.language.split("-")[0]);
        },
        get text() {
            switch (this.lang) {
                case "zh":
                    return "信息";
                case "ja":
                    return "助けて";
                case "ar":
                    return "تعليمات";
                case "en":
                default:
                    return "Support";
            }
        },
        get title() {
            switch (this.lang) {
                case "zh":
                    return "设置的信息和翻译";
                case "ja":
                    return "設定の情報と翻訳";
                case "ar":
                    return "معلومات وترجمات للإعدادات";
                case "en":
                default:
                    return "Info and translations for the settings";
            }
        },
    };

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
                try {
                    return d[k].child;
                } catch (e) {}
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
        try {
            return el.length > 0 ? this.findReact(el[0]).memoizedProps.children : null;
        } catch (e) {
            return null;
        }
    },
    /**
     * determine if an element is visible (namely the amazon player)
     * @param {string} s (element id)
     */
    isVis(s) {
        try {
            return this.$i(s).offsetParent ? true : false;
        } catch (e) {
            return false;
        }
    },

    // searches for elements that skip stuff. repeated every 300ms. change "rate" in the options if you want to make this more or less frequent.
    async amazon() {
        if (this.count === 0) {
            // console.log(this.count);
            if (this.isVis("dv-web-player")) {
                if (this.$c("atvwebplayersdk-nextupcard-button").length) {
                    // console.log('Found Amazon video next.');
                    setTimeout(() => {
                        try {
                            this.$c("atvwebplayersdk-nextupcard-button")[0].click();
                            this.count = 5;
                        } catch (e) {}
                    }, 700);
                } else if (this.$c("atvwebplayersdk-skipelement-button").length) {
                    try {
                        this.$c("atvwebplayersdk-skipelement-button")[0].click();
                        this.count = 5;
                    } catch (e) {}
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
            this.popup.style.cssText = `
            position: fixed;
            top: 50%;
            right: 3%;
            transform: translateY(-50%);
            z-index: 2147483646;
            background: hsla(0, 0%, 6%, 0.8);
            -webkit-backdrop-filter: blur(7px);
            backdrop-filter: blur(7px);
            color: hsla(0, 0%, 97%, 0.95);
            padding: 17px 19px;
            border-radius: 5px;
            pointer-events: none;
            letter-spacing: 1px;
            transition: opacity 0.2s ease-in-out;
            opacity: 0;
            `;
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
        if (e.repeat) {
            return;
        }
        if (e.code == options.code && modTest(e)) {
            e.stopImmediatePropagation();
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
            families: [
                `${options.font}:${ital}wght@1,${options.fontWeight}`,
                "Source Sans Pro:wght@1,300",
            ], // e.g. "Lobster Two:ital,wght@1,700"
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

/**
 * if using greasemonkey 4, remap the GM_* functions to GM.*
 */
async function checkGM() {
    if (GM4) {
        GM_getValue = GM.getValue;
        GM_setValue = GM.setValue;
        GM_listValues = GM.listValues;
        GM_deleteValue = GM.deleteValue;
        GM_openInTab = GM.openInTab;
    }
}

/**
 * set up the GM_config settings GUI
 */
async function initConfig() {
    await checkGM();
    const frame = document.createElement("div"),
        resetti = document.createElement("button"),
        supporti = document.createElement("button"),
        keyframes = {
            opacity: [0, 1],
        },
        animFwd = {
            id: "GM_config_fwd",
            direction: "normal",
            duration: 200,
            iterations: 1,
            easing: "ease-in-out",
        },
        animBwd = {
            id: "GM_config_bwd",
            direction: "reverse",
            duration: 500,
            iterations: 1,
            easing: "ease-in-out",
        };
    frame.style.display = "none";
    document.body.appendChild(frame);
    frame.appendChild(resetti);
    frame.appendChild(supporti);
    resetti.addEventListener("click", () => GM_config.reset());
    supporti.addEventListener("click", () =>
        GM_openInTab(`https://greasyfork.org/scripts/420475-netflix-marathon-pausable`)
    );
    GM_config.close = function () {
        window.clearTimeout(this.fading);
        GM_config.animation = this.frame.animate(keyframes, animBwd);
        this.onClose(); //  Call the close() callback function
        this.isOpen = false;
        this.fading = window.setTimeout(() => {
            let domSheets = document.getElementsByTagName("head")[0].getElementsByTagName("style"),
                sheetArr = Array.from(domSheets);
            for (let i of sheetArr) {
                try {
                    i instanceof HTMLStyleElement &&
                        i.sheet.cssRules[0].selectorText &&
                        i.sheet.cssRules[0].selectorText.includes("Marathon") &&
                        i.remove();
                } catch (e) {}
            }
            // If frame is an iframe then remove it
            if (this.frame.contentDocument) {
                this.remove(this.frame);
                this.frame = null;
            } else {
                // else wipe its content
                this.frame.innerHTML = "";
                this.frame.style.display = "none";
            }

            // Null out all the fields so we don't leak memory
            var fields = this.fields;
            for (var id in fields) {
                var field = fields[id];
                field.wrapper = null;
                field.node = null;
            }
        }, 500);
    };
    GM_config.open = function () {
        window.clearTimeout(this.fading);
        if (
            GM_config.animation &&
            GM_config.animation.id === "GM_config_bwd" &&
            GM_config.animation.playState === "running"
        ) {
            GM_config.animation.playbackRate = -2.5;
        } else {
            GM_config.animation = this.frame.animate(keyframes, animFwd);
        }
        this.isOpen = true;
        GM_config.__proto__.open.call(this);
    };
    GM_config.init({
        "id": "Marathon",
        "title": "Netflix Marathon Settings",
        "fields": {
            "rate": {
                "label": "Interval Rate",
                "title": "Time (in milliseconds) between checks for skip buttons",
                "section": "Main Settings",
                "type": "int",
                "size": 8,
                "min": 50,
                "max": 5000,
                "default": 300,
            },
            "amazon": {
                "type": "checkbox",
                "label": "Run on Amazon",
                "title": "Uncheck if you don't use Amazon Prime Video",
                "default": true,
            },
            "netflix": {
                "type": "checkbox",
                "label": "Run on Netflix",
                "title": "Uncheck if you don't use Netflix",
                "default": true,
            },
            "code": {
                "label": "Hotkey code",
                "title": "Which keyboard key to use (click Support for a list of key codes)",
                "type": "text",
                "section": "Hotkey Settings",
                "size": 8,
                "default": "F7",
            },
            "hotkey": {
                "type": "checkbox",
                "label": "Enable hotkey",
                "title": "Uncheck to disable the keyboard shortcut",
                "default": true,
            },
            "ctrlKey": {
                "type": "checkbox",
                "label": "Ctrl key",
                "title": "Sets Ctrl as a modifier key for the shortcut",
                "default": true,
            },
            "altKey": {
                "type": "checkbox",
                "label": "Alt key",
                "title": "Sets Alt as a modifier key for the shortcut",
                "default": false,
            },
            "shiftKey": {
                "type": "checkbox",
                "label": "Shift key",
                "title": "Sets Shift as a modifier key for the shortcut",
                "default": false,
            },
            "metaKey": {
                "type": "checkbox",
                "label": "Meta key",
                "title": "Sets Meta as a modifier key for the shortcut",
                "default": false,
            },
            "pop": {
                "type": "checkbox",
                "label": "Enable popup",
                "title": "Uncheck to disable the Paused/Resumed popups",
                "section": "Popup Settings",
                "default": true,
            },
            "popDur": {
                "label": "Popup duration",
                "title": "How long (in milliseconds) the popup should stay open before fading away",
                "type": "int",
                "size": 4,
                "min": 500,
                "max": 50000,
                "default": 3000,
            },
            "webfont": {
                "type": "checkbox",
                "label": "Use Google Fonts",
                "title": "If the font you want is not locally installed, this must be checked",
                "default": true,
            },
            "font": {
                "label": "Popup font",
                "title": "Which font to use for the Paused/Resumed popups",
                "type": "text",
                "size": 12,
                "default": "Source Sans Pro",
            },
            "fontSizeInt": {
                "label": "Font size (px)",
                "title": "How big the Paused/Resumed popups should be",
                "type": "int",
                "size": 1,
                "min": 6,
                "max": 560,
                "default": 24,
            },
            "fontWeight": {
                "label": "Font weight",
                "title": "Boldness of the popup text, measured in multiples of 100 from 100-900",
                "type": "select",
                "options": ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
                "default": 300,
            },
            "italic": {
                "type": "checkbox",
                "label": "Italic",
                "title": "Check if you want the popup text to be italic",
                "default": false,
            },
        },
        "events": {
            "init": function () {
                // migrate settings from previous versions, if any exist
                let migrateKeys = GM_listValues().filter((key) => key !== "Marathon");
                if (migrateKeys.length) {
                    for (const key of migrateKeys) {
                        let oldVal = GM_getValue(key);
                        if (key === "fontSize" && typeof oldVal === "string") {
                            let newVal = Number(oldVal.match(/\d+/g)[0]);
                            GM_config.set("fontSizeInt", newVal);
                        } else {
                            GM_config.set(key, oldVal);
                        }
                        GM_deleteValue(key);
                    }
                }
                GM_config.save();
                // for all addons except greasemonkey 4, we can add a menu command
                if (!GM4) {
                    GM_registerMenuCommand("Open Settings", () => {
                        if (!GM_config.isOpen) {
                            GM_config.open();
                        }
                    });
                }
                // add an Alt+N hotkey to pull up the settings menu, so greasemonkey 4 users can configure settings.
                window.addEventListener("keydown", (e) => {
                    if (e.repeat) {
                        return;
                    }
                    if (e.code == "KeyN" && e.altKey) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        e.stopPropagation();
                        if (GM_config.isOpen) {
                            GM_config.close();
                        } else {
                            GM_config.open();
                        }
                    }
                });
                // memoize the settings
                settings();
            },
            "save": function () {
                // close the settings menu upon save.
                if (GM_config.isOpen) {
                    GM_config.close();
                }
            },
            "open": function () {
                let resetBtn = document.getElementById("Marathon_resetLink");
                resetti.title = resetBtn.title;
                resetti.textContent = resetBtn.textContent;
                resetti.className = resetBtn.parentElement.className;
                resetBtn.parentElement.replaceWith(resetti);
                document.getElementById("Marathon_saveBtn").after(resetti);
                supporti.title = locale.title;
                supporti.textContent = locale.text;
                supporti.className = "saveclose_buttons";
                supporti.id = "Marathon_supportBtn";
                document.getElementById("Marathon_closeBtn").after(supporti);
            },
        },
        "frame": frame,
        "css": `
        #Marathon {
            display: block !important;
            position: fixed !important;
            z-index: 2147483646 !important;
            inset: unset !important;
            top: 50% !important;
            left: 0% !important;
            background: hsla(0, 0%, 5.1%, 0.91);
            -webkit-backdrop-filter: blur(7px);
            backdrop-filter: blur(7px);
            border: none !important;
            color: hsla(0, 0%, 97%, 0.95);
            max-width: -webkit-min-content !important;
            max-width: -moz-min-content !important;
            max-width: min-content !important;
            height: -webkit-min-content !important;
            height: -moz-min-content !important;
            height: min-content !important;
            border-radius: 5px;
            padding: 10px !important;
            transform: translate(50%, -60%);
            font-size: 14px;
            line-height: 1.2;
        }
        #Marathon * {
            font-family: Source Sans Pro;
            font-weight: 300;
        }
        #Marathon_wrapper {
            display: flex;
            flex-direction: column;
            align-content: center;
        }
        #Marathon_header {
            font-size: 2em !important;
            white-space: nowrap;
            padding-inline: 6px;
        }
        #Marathon .section_header_holder {
            display: flex;
            flex-flow: row wrap;
            border-top: 1px solid hsla(0, 0%, 100%, 0.1);
        }
        #Marathon .section_header {
            font-size: 1.25em !important;
            background: none !important;
            border: none !important;
            text-align: left !important;
            padding-block: 5px !important;
            flex-basis: 100%;
            margin-inline: 6px;
        }
        #Marathon .config_var {
            margin: 0 0 6px 8px;
            display: flex;
            flex-direction: row;
            align-items: center;
            line-height: normal;
            flex-grow: 1;
        }
        #Marathon :is(button, input, optgroup, select, textarea) {
            font: inherit;
            margin: 0;
        }
        #Marathon button {
            text-align: center;
        }
        #Marathon input[type="text"] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            color: inherit;
            background: hsla(0, 0%, 25%, 50%) !important;
            border: none;
            border-radius: 3px;
            padding: 1px 4px;
            flex-grow: 1;
            height: unset;
            box-shadow: unset !important;
            outline: unset;
            box-sizing: initial !important;
            margin: 0 !important;
            font-size: 14px !important;
        }
        #Marathon input[type="text"]:focus {
            background-color: hsla(0, 0%, 25%, 70%) !important;
            color: white !important;
        }
        #Marathon input[type="checkbox"] {
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            appearance: none !important;
            border: 2px solid hsl(240, 6.7%, 58.8%);
            min-width: 14px;
            min-height: 14px;
            background: hsl(0, 0%, 100%)
                url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path stroke='transparent' fill='transparent' d='M6 14a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414l2.157 2.157 6.316-9.023a1 1 0 011.639 1.146l-7 10a1 1 0 01-.732.427A.863.863 0 016 14z'/></svg>")
                center/contain no-repeat;
            border-radius: 2.5px;
            position: static;
            box-sizing: border-box;
        }
        #Marathon input[type="checkbox"]:focus {
            box-shadow: 0 0 0 0.1em hsl(214.3, 58.3%, 81.8%), 0 0 0 0.15em hsl(214.2, 60%, 42.7%),
                0 0 0 0.25em hsl(214.3, 58.3%, 71.8%);
        }
        #Marathon input[type="checkbox"]:hover {
            border: 2px solid hsl(240, 6%, 43%);
        }
        #Marathon input[type="checkbox"]:hover:active {
            background-color: hsl(240, 8%, 83%);
            border: 2px solid hsl(240, 6%, 30%);
        }
        #Marathon input[type="checkbox"]:checked {
            border: 2px solid transparent !important;
            background: hsl(214.2, 100%, 43.7%)
                url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path stroke='hsla(0, 0%, 97%, 0.95)' fill='hsla(0, 0%, 97%, 0.95)' d='M6 14a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414l2.157 2.157 6.316-9.023a1 1 0 011.639 1.146l-7 10a1 1 0 01-.732.427A.863.863 0 016 14z'/></svg>")
                center/contain no-repeat !important;
        }
        #Marathon input[type="checkbox"]:checked:hover {
            background-color: hsl(215, 98%, 37%) !important;
        }
        #Marathon input[type="checkbox"]:checked:hover:active {
            background-color: hsl(216, 94%, 30%) !important;
        }
        #Marathon_section_0 > .config-var,
        #Marathon_field_rate {
            flex-grow: unset;
        }
        #Marathon_buttons_holder {
            display: flex;
            flex-flow: row;
            align-items: center;
            border-top: 1px solid hsla(0, 0%, 100%, 0.1);
            color: inherit !important;
        }
        #Marathon .saveclose_buttons,
        #Marathon .reset_holder {
            margin: 6px 6px 0px 0px;
            padding: 2px 12px;
            color: inherit;
            background: hsla(0, 0%, 25%, 50%);
            border: none !important;
            border-radius: 3px;
            padding-inline: 4px;
            font-size: 15px;
            padding-block: 2px;
            flex-grow: 1;
            white-space: nowrap;
        }
        #Marathon .saveclose_buttons:hover,
        #Marathon .reset_holder:hover {
            background-color: hsla(0, 0%, 25%, 70%) !important;
            color: white !important;
        }
        #Marathon_saveBtn {
            padding-inline: 16px 2px !important;
            background: hsla(0, 0%, 25%, 50%)
                url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path fill='hsla(0, 0%, 97%, 0.95)' d='M6 14a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414l2.157 2.157 6.316-9.023a1 1 0 011.639 1.146l-7 10a1 1 0 01-.732.427A.863.863 0 016 14z'/></svg>")
                3.8px 48%/12.5px no-repeat !important;
        }
        #Marathon .reset_holder {
            padding-inline: 16px 2px !important;
            background: hsla(0, 0%, 25%, 50%)
                url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='hsla(0, 0%, 97%, 0.95)' height='16' width='16'><path d='M1 1a1 1 0 011 1v2.4A7 7 0 118 15a7 7 0 01-4.9-2 1 1 0 011.4-1.5 5 5 0 10-1-5.5H6a1 1 0 010 2H1a1 1 0 01-1-1V2a1 1 0 011-1z'/></svg>")
                4.5px 50%/11px no-repeat !important;
        }
        #Marathon .reset {
            color: inherit !important;
            font-size: inherit !important;
        }
        #Marathon .field_label {
            font-size: 12px;
            font-weight: normal !important;
            margin-inline: 6px 0 !important;
            white-space: nowrap;
            padding: unset !important;
        }
        #Marathon .field_label:first-child {
            margin-inline: 0 6px !important;
        }
        #Marathon select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            color: inherit;
            border: none;
            border-radius: 3px;
            padding-inline: 2px 13px;
            background: hsla(0, 0%, 25%, 50%)
                url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='hsla(0, 0%, 97%, 0.95)' height='24' viewBox='0 0 24 24' width='24'><path d='M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z'/></svg>")
                100% 66%/18px no-repeat !important;
        }
        #Marathon option {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            color: inherit;
            background: hsl(0, 1%, 17%) !important;
            border: none;
        }
        #Marathon_rate_var,
        #Marathon_pop_var,
        #Marathon_font_var {
            flex-basis: 100%;
        }
        `,
    });
}

// after getting settings from *monkey storage, create properties in options (the js object) based on the stored settings.
async function settings() {
    for (const key in GM_config.fields) {
        options[key] = GM_config.get(`${key}`);
    }
    options.fontSize = `${options.fontSizeInt}px`;
}

async function start() {
    await initConfig();
    marathonSetUp();
}

start();
