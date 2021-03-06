// ==UserScript==
// @name               Netflix Marathon (Pausable)
// @name:zh-CN         网飞马拉松赛（可暫停）
// @name:zh-TW         网飞马拉松赛（可暫停）
// @name:ja            Netflix Marathon（一時停止できます）
// @name:ar            ماراثون Netflix (يمكن إيقافه مؤقتًا)
// @namespace          https://github.com/aminomancer
// @version            4.7.0
// @description        A configurable script that automatically skips recaps, intros, credits, and ads, and clicks "next episode" prompts on Netflix and Amazon Prime Video. Customizable hotkey to pause/resume the auto-skipping functionality. Alt + N for settings.
// @description:zh-CN  一个可配置的脚本，该脚本自动跳过介绍，信用和广告，并单击Netflix和Amazon Prime Video上的“下一个节目”提示。包括一个可自定义的热键，以暂停/恢复自动跳过功能。按Alt + N进行配置。
// @description:zh-TW  一个可配置的脚本，该脚本自动跳过介绍，信用和广告，并单击Netflix和Amazon Prime Video上的“下一个节目”提示。包括一个可自定义的热键，以暂停/恢复自动跳过功能。按Alt + N进行配置。
// @description:ja     イントロ、クレジット、広告を自動的にスキップし、NetflixとAmazon PrimeVideoの「次のエピソード」プロンプトをクリックする構成可能なスクリプト。自動スキップ機能を一時停止/再開するためのカスタマイズ可能なホットキーが含まれています。Alt + Nを押して構成します。
// @description:ar     برنامج نصي قابل للتكوين يتخطى تلقائيًا المقدمات والاعتمادات والإعلانات وينقر على "الحلقة التالية" على Netflix و Amazon Prime Video.يتضمن مفتاح اختصار قابل للتخصيص لإيقاف / استئناف وظيفة التخطي التلقائي.اضغط على Alt + N للتكوين.
// @author             aminomancer
// @homepageURL        https://github.com/aminomancer/Netflix-Marathon-Pausable
// @supportURL         https://github.com/aminomancer/Netflix-Marathon-Pausable
// @downloadURL        https://greasyfork.org/scripts/420475-netflix-marathon-pausable/code/Netflix%20Marathon%20(Pausable).user.js
// @icon               data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 157.1 158.4"><path d="M156.3 79.6c0-42.8-34.9-77.7-77.7-77.7C35.7 1.9.9 36.7.9 79.6c0 39.5 29.5 72.6 68.7 77.2v-47.4c-25-3.8-43.8-25.5-43.8-50.7C25.8 30.4 49 7.4 77.6 7.4c28.5 0 51.8 23 51.8 51.3 0 26.1-19.6 47.9-45.6 51v47.6c40.6-2.8 72.5-36.8 72.5-77.7z"/><path d="M77.4 16c-23.2 0-42.1 18.9-42.1 42.1s18.9 42.1 42.1 42.1 42.1-18.9 42.1-42.1S100.7 16 77.4 16zm18.8 75.8c0 .1 0 .1 0 0v.1h-.9c-.2 0-.3 0-.5-.1-3.1-.4-7.1-.7-10.4-.9-1.1-.1-2-.1-2-.1l-.2-.4c-.1-.3-.2-.7-.4-1.2-.1-.2-.2-.5-.3-.8 0-.1 0-.1-.1-.1-.4-1.1-.9-2.5-1.5-4.2-1.5-4.3-3.8-10.6-6.7-18.8l-1.1-3v14.3c0 13.6 0 14.3-.2 14.3-.5 0-4.9.3-6.3.4-1 .1-2.9.3-4.3.4-1.2.2-2.3.3-2.4.3V24.2h13.4l.1.2.2.6c.2.6.5 1.4.9 2.5.1.2.1.4.2.6.1.4.3.8.4 1.2.2.6.5 1.3.7 2 0 .1.1.3.1.4.2.6.1.4.4 1.2.5 1.5 1 2.9 1.4 4.1.8 2.3 1.5 4.1 2 5.6.4 1.1.7 2 1 2.8.8 2.4 1.3 3.7 1.9 5.3l1.2 3.5v-30H96V58c.2 17.8.2 32.5.2 33.8z"/></svg>
// @include            https://www.netflix.com/*
// @include            https://*.amazon.com/*
// @include            https://*.primevideo.com/*
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

/* global GM,
GM_registerMenuCommand,
GM_unregisterMenuCommand,
GM_getValue:writable,
GM_setValue:writable,
GM_deleteValue:writable,
GM_listValues:writable,
GM_openInTab:writable,
WebFontConfig:writable,
GM_config,
WebFont */
const options = {}; // where settings are stored during runtime
const win = window;
const doc = document;
const GMObj = typeof GM === "object" && GM !== null && typeof GM.getValue === "function"; // check whether the GM object exists so we can use the right GM API functions
const GM4 = GMObj && GM.info.scriptHandler === "Greasemonkey" && GM.info.version.split(".")[0] >= 4; // check if the script handler is GM4, since if it is, we can't add a menu command
let marathon;
/**
 * pause execution for ms milliseconds
 * @param {int} ms (milliseconds)
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
 * @param {string} u (a string to test the URL against)
 */
const test = (u) => win.location.href.includes(u);
const site = test("netflix") ? "netflix" : "amazon";
const locale = {
    // some basic localization for the settings menu. just the parts necessary to get to the readme, which has chinese, japanese, and arabic translations
    get lang() {
        return (
            this._lang || (this._lang = navigator.language.split("-")[0]) // memoize the language since it's unlikely to change during runtime
        );
    },
    get text() {
        // returns the label for the support button in settings
        if (this._text) return this._text;
        switch (this.lang) {
            case "zh":
                return (this._text = "信息"); // chinese
            case "ja":
                return (this._text = "助けて"); // japanese
            case "ar":
                return (this._text = "تعليمات"); // arabic
            case "en":
            default:
                return (this._text = "Support"); // english etc.
        }
    },
    get title() {
        // returns the tooltip for the support button
        if (this._title) return this._title;
        switch (this.lang) {
            case "zh":
                return (this._title = "设置的信息和翻译");
            case "ja":
                return (this._title = "設定の情報と翻訳");
            case "ar":
                return (this._title = "معلومات وترجمات للإعدادات");
            case "en":
            default:
                return (this._title = "Info and translations for the settings");
        }
    },
};
const methods = {
    // contains the site-specific callbacks and various utility functions to shorten and optimize the code
    count: 0,
    results: null,
    nDrain: "[data-uia='next-episode-seamless-button-draining']",
    nReady: "[data-uia='next-episode-seamless-button']",
    /**
     * getElementsByTagName
     * @param {string} s (tag name)
     */
    byTag: (s, p = doc) => p.getElementsByTagName(s),
    /**
     * getElementById
     * @param {string} s (element id)
     */
    byID: (s) => doc.getElementById(s),
    /**
     * querySelector
     * @param {string} s (CSS selector e.g. ".class")
     */
    qry: (s, p = doc) => p.querySelector(s),
    /**
     * querySelectorAll
     * @param {string} s (CSS selector)
     */
    qryAll: (s, p = doc) => p.querySelectorAll(s),
    /**
     * document.evaluate
     * @param {string} s (node's text content)
     * @param {string} n (node's tag name. if not passed, then accept any tag)
     * @param {string} p (node's parent's tag name. this is like saying button>div. if not passed, then just use div, ignoring the node's parent)
     */
    byTxt(s, n = "*", p) {
        const exp = `//${p ? `${p}/child::` : ""}${n}[text()="${s}"]`; // use /child:: syntax if p is passed.
        return doc.evaluate(exp, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, this.results)
            .singleNodeValue;
    },
    /**
     * find react component instance given a DOM node
     * @param {object} d (DOM node)
     */
    react(d) {
        for (const [key, value] of Object.entries(d))
            if (key.startsWith("__reactInternalInstance$")) return value;
        return null;
    },
    /**
     * determine if an element is visible (namely the amazon player)
     * @param {string} s (element id)
     */
    isVis(s) {
        try {
            return !!this.byID(s).offsetParent;
        } catch (e) {
            return false;
        }
    },
    // returns false if we're on a valid site but not actually in the video player (e.g. we're only browsing videos).
    get playing() {
        return site === "netflix" ? test("netflix.com/watch/") : this.isVis("dv-web-player");
    },
    /**
     * clicks the passed element and sets the count to 5
     * @param {object} el (DOM element)
     */
    clk(el) {
        try {
            el.click();
            this.count = 5;
        } catch (e) {
            this.count = 2;
        }
    },
    // searches for elements that skip stuff. repeated every 300ms. change "rate" in the options if you want to make this more or less frequent.
    async amazon() {
        if (this.count === 0) {
            if (this.isVis("dv-web-player")) {
                let store; // memoize the element when we check for its existence so we don't have to evaluate the DOM twice.
                if ((store = this.qry(".atvwebplayersdk-nextupcard-button"))) {
                    // next episode
                    await sleep(400);
                    this.clk(store);
                } else if ((store = this.qry(".atvwebplayersdk-skipelement-button")))
                    // skip various things
                    this.clk(store);
                else if ((store = this.qry(".adSkipButton")))
                    // skip ad
                    this.clk(store);
                else if ((store = this.qry(".skipElement")))
                    //  skip intro
                    this.clk(store);
                else if ((store = this.byTxt("Skip", "div")))
                    // skip trailers
                    this.clk(store);
                else if ((store = this.byTxt("Skip Intro", "button", "div")))
                    // skip intro
                    this.clk(store);
                else if ((store = this.byTxt("Skip Recap", "button", "div")))
                    // skip recap
                    this.clk(store);
            }
        } else this.count -= 1;
        return this.count;
    },
    async netflix() {
        if (this.count === 0) {
            let store;
            if (
                this.qryAll(".skip-credits").length &&
                this.qryAll(".skip-credits-hidden").length === 0
            ) {
                await sleep(200);
                try {
                    this.qry(".skip-credits").firstElementChild.click();
                    this.count = 80;
                } catch (e) {
                    return (this.count -= 1);
                }
                await sleep(100);
                try {
                    this.qry(".button-nfplayerPlay").click();
                    this.count = 80;
                } catch (e) {
                    return (this.count -= 1);
                }
            } else if ((store = this.qry(this.nDrain)) || (store = this.qry(this.nReady))) {
                // next episode button
                this.react(store).memoizedProps.onClick();
                this.count = 5;
            } else if (options.promoted && (store = this.qry(".PromotedVideo-actions"))) {
                // promoted video autoplay
                await sleep(700);
                this.clk(store.firstElementChild);
            } else if ((store = this.qry(".postplay-still-container")))
                // autoplay
                this.clk(store);
            else if ((store = this.qry(".WatchNext-still-container")))
                // autoplay
                this.clk(store);
        } else this.count -= 1;
        return this.count;
    },
};

// an interval constructor that you can pause and resume, and which opens a brief popup when you do so. yes i'm using a class that's only instantiated once. i like the way it looks. if you know of something better lmk~
class Controller {
    /**
     * pausable interval utility
     * @param {object} handler (object containing the site methods)
     * @param {int} int (how often to repeat the callback)
     */
    constructor(handler, int) {
        this.callback = handler[site].bind(handler); // e.g. methods.amazon.bind(methods)
        this.int = int; // can be changed in real-time and the next resume() call will use the new value
        this.popup = doc.createElement("div");
        this.text = doc.createTextNode("Marathon: Paused");
        this.remainder = 0; // how much time is remaining on the interval when we pause it
        this.fading = null; // 3 second timeout (by default), after which the popup fades
        this.pauseState = 0; //  0: idle, 1: running, 2: paused, 3: resumed
        this.toggler = this.toggle.bind(this);
        this.register("Pause Marathon", true); // initial creation of the menu command
        // if popup is enabled in options, style it
        if (options.pop) {
            this.setupPopup();
            this.updatePopup();
        }
        this.time = new Date();
        this.timer = win.setInterval(this.callback, this.int);
        this.pauseState = 1;
        if (options.hotkey || options.hotkey2) this.startCapturing();
        if (!options[site]) this.pause(); // if the site is disabled then stop the interval. we pause it instead of not starting it in the first place so that the user can re-enable the site and have the interval immediately start working without needing to refresh the page.
    }

    /**
     * check that the modifier keys pressed match those defined in user settings
     * @param {object} e (event)
     * @param {string} d (which key settings to evaluate, ctrlKey or ctrlKey1)
     */
    static modTest(e, d = "") {
        return (
            e.ctrlKey === options[`ctrlKey${d}`] &&
            e.altKey === options[`altKey${d}`] &&
            e.shiftKey === options[`shiftKey${d}`] &&
            e.metaKey === options[`metaKey${d}`]
        );
    }

    /**
     * called when you press the configured hotkey.
     * @param {object} e (event)
     */
    handleEvent(e) {
        if (!e.repeat && [options.code, options.code2].indexOf(e.code) > -1) {
            if (options.hotkey && e.code === options.code && Controller.modTest(e)) this.toggler();
            else if (options.hotkey2 && e.code === options.code2 && Controller.modTest(e, 2))
                if (GM_config.isOpen) GM_config.close();
                else GM_config.open();
            else return;
            e.stopImmediatePropagation();
            e.preventDefault();
            e.stopPropagation();
        }
    }

    /**
     * pause the interval
     * @param {string} pop (string or null — identifies the caller so we can determine the popup message)
     */
    pause(pop) {
        if (this.pauseState !== 1) return;

        this.remainder = this.int - (new Date() - this.time);
        win.clearInterval(this.timer);
        this.pauseState = 2;

        this.register("Resume Marathon"); // update the menu command label
        this.openPopup(pop);
    }

    /**
     * resume the interval
     * @param {string} pop (same as pause())
     */
    async resume(pop) {
        if (this.pauseState !== 2) return;

        this.pauseState = 3;

        this.register("Pause Marathon");
        this.openPopup(pop);
        await sleep(this.remainder);
        this.run();
    }

    // when we pause, there's usually still time left on the interval. resume() calls this after waiting for the remaining duration. so this is what actually resumes the interval.
    run() {
        if (this.pauseState !== 3) return;

        this.callback();

        this.time = new Date();
        this.timer = win.setInterval(this.callback, this.int);
        this.pauseState = 1;
    }

    // toggle the interval on/off.
    toggle() {
        if (!options[site]) return; // disable the pause/resume toggle when the site is disabled
        switch (this.pauseState) {
            case 1:
                this.pause("Paused"); // passing false tells openPopup to use the "Marathon: Paused" message
                break;
            case 2:
                this.resume("Resumed"); // passing true => "Marathon: Resumed" message
                break;
            default:
        }
    }

    /**
     * opens the popup and schedules it to close
     * @param {string} msg (what the popup should say)
     */
    openPopup(msg) {
        // if popup is disabled in options, or no message was sent, do nothing
        if (msg === undefined || !options.pop) return;

        const { style } = this.popup;
        this.popup.textContent = `Marathon: ${msg}`;
        style.transitionDuration = "0.2s";
        style.opacity = "1";
        win.clearTimeout(this.fading); // clear any existing fade timeout since we're about to set a new one

        // schedule the popup to fade into oblivion
        this.fading = win.setTimeout(() => {
            style.transitionDuration = "1s";
            style.opacity = "0";
        }, options.popDur);
    }

    // apply the basic popup style and place it in the body
    setupPopup() {
        doc.body.insertBefore(this.popup, doc.body.firstElementChild);
        this.popup.appendChild(this.text);
        this.popup.style.cssText = `
            position: fixed;
            top: 50%;
            right: 3%;
            transform: translateY(-50%);
            z-index: 2147483646;
            background-color: hsla(0, 0%, 6%, 0.8);
            background-image: url("https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/texture/noise-512x512.png");
            background-repeat: repeat;
            background-size: auto;
            background-attachment: local;
            -webkit-backdrop-filter: blur(7px);
            backdrop-filter: blur(7px);
            color: hsla(0, 0%, 97%, 0.95);
            padding: 17px 19px;
            line-height: 1em;
            border-radius: 5px;
            pointer-events: none;
            letter-spacing: 1px;
            transition: opacity 0.2s ease-in-out;
            opacity: 0;
            `;
    }

    // update the mutable popup attributes
    updatePopup() {
        const { style } = this.popup;
        style.fontFamily = options.font;
        style.fontSize = options.fontSize;
        style.fontWeight = options.fontWeight;
        style.fontStyle = options.italic ? "italic" : "";
    }

    /**
     * register or change the label of the menu command
     * @param {string} cap (intended caption to display on the menu command)
     * @param {bool} firstRun (we call this function at startup and every time we pause/unpause. we don't need to register a menu command if this is the startup call, since none exists yet)
     */
    register(cap, firstRun = false) {
        if (GM4) return; // don't register a menu command if the script manager is greasemonkey 4.0+ since the function doesn't exist

        if (!firstRun) GM_unregisterMenuCommand(this.caption); // this is how we switch the menu command from play to pause. we'd prefer to just have a single menu command and use a variable to determine its label and callback behavior, but the API doesn't support that afaik.

        // don't register the pause/unpause menu command if the site is currently disabled
        if (options[site]) {
            GM_registerMenuCommand(cap, this.toggler);
            this.caption = cap;
        }
    }

    // start listening to key events
    startCapturing() {
        win.addEventListener("keydown", this, true);
    }

    // stop listening to key events
    stopCapturing() {
        win.removeEventListener("keydown", this, true);
    }
}

// if using greasemonkey 4, remap the GM_* functions to GM.*
async function checkGM() {
    if (GM4) {
        GM_getValue = GM.getValue;
        GM_setValue = GM.setValue;
        GM_listValues = GM.listValues;
        GM_deleteValue = GM.deleteValue;
        GM_openInTab = GM.openInTab;
    }
}

// override API functions so we can animate the settings panel and auto-close it on save.
function extendGMC() {
    // support fancy animations
    GM_config.close = function close() {
        win.clearTimeout(this.fading);

        this.frame.setAttribute("closed", true);

        this.onClose(); //  Call the close() callback function
        this.isOpen = false;
        this.fading = win.setTimeout(() => {
            this.clearSheets("Marathon");
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
            const { fields } = this;
            for (const value of Object.values(fields)) {
                value.wrapper = null;
                value.node = null;
            }
        }, 500);
    };
    GM_config.open = function open() {
        win.clearTimeout(this.fading);

        this.frame.removeAttribute("closed");

        this.isOpen = true;
        Object.getPrototypeOf(this).open.call(this);
    };
    // override write function to semi-publicly memoize the error state.
    GM_config.write = function write(store, obj) {
        const values = {};
        const forgotten = {};
        if (!obj) {
            const { fields } = this;

            for (const [id, field] of Object.entries(fields)) {
                const value = field.toValue();

                if (field.save)
                    if (value != null) {
                        values[id] = value;
                        field.value = value;
                    } else {
                        this.error = true;
                        values[id] = field.value;
                    }
                else forgotten[id] = value;
            }
        }
        try {
            this.setValue(store || this.id, this.stringify(obj || values));
        } catch (e) {
            this.log("GM_config failed to save settings!");
        }

        return forgotten;
    };
    /**
     * remove all the stylesheets generated by GM_config. without this, GM_config keeps adding a new one every time you open it. we could resolve this oversight by overriding GM_config's open() method, but that's a lot of text to duplicate and this isn't expensive. also, deleting superfluous stuff is more satisfying than doing the proper thing and never creating it in the first place.
     * @param {string} sel (CSS selector; check each stylesheet for this string)
     */
    GM_config.clearSheets = (sel) => {
        for (const i of Array.from(methods.byTag("style", doc.head)))
            try {
                if (
                    i instanceof HTMLStyleElement &&
                    i.sheet.cssRules[0].selectorText &&
                    i.sheet.cssRules[0].selectorText.includes(sel)
                )
                    i.remove();
                // Amazon CSP blocks cross-origin use of method sheet.cssRules so the loop will interrupt on some unrelated stylesheet.
                // I'd use the optional chaining operator here but it's not enabled by default in chrome. So trycatch statement instead.
                // eslint-disable-next-line no-empty
            } catch (e) {}
    };
    /**
     * remove all the link elements generated by webfontloader.js. the loader has no logic to amend its existing stylesheets and will just keep adding more for every time you call it. since we call it every time the user changes the font settings, it makes sense to delete the previous ones before calling the load method.
     * @param {string} uri (url or part of url; check each link element's href attribute for this string)
     */
    GM_config.clearLinks = (uri) => {
        for (const i of Array.from(methods.byTag("link", doc.head)))
            if (i instanceof HTMLLinkElement && i.href.includes(uri)) i.remove();
    };
    /**
     * return true if any of the fields passed have values that deviate from their default values. we use this to avoid performing operations that are unnecessary when aspects of the user's config are unchanged.
     * @param {object} fields (an object whose properties are GM_config fields)
     */
    GM_config.checkNotDefault = (fields) =>
        !Object.values(fields).every((field) => field.value === field.default);
    // if webfont is enabled and any of the fields that affect webfont are non-default, (font, italic, fontWeight) then change the webfont config
    GM_config.updateWFConfig = function updateWFConfig() {
        if (options.webfont && this.checkNotDefault(this.webFontFields))
            WebFontConfig.google.families[1] = `${options.font}:${
                options.italic ? "ital," : ""
            }wght@1,${options.fontWeight}`;
    };
}

/**
 * set up the GM_config settings GUI
 */
async function initGMC() {
    await checkGM();
    const frame = doc.createElement("div");
    const resetBtn = doc.createElement("button");
    const supportBtn = doc.createElement("button");
    frame.style.display = "none";
    doc.body.appendChild(frame);
    frame.appendChild(resetBtn);
    frame.appendChild(supportBtn);
    resetBtn.addEventListener("click", () => GM_config.reset());
    supportBtn.addEventListener("click", () =>
        GM_openInTab("https://greasyfork.org/scripts/420475-netflix-marathon-pausable")
    );
    GM_config.error = false; // this switch tells us if the user input an invalid value for a setting so we won't close the GUI when they try to save.
    extendGMC();
    // initialize the GUI
    GM_config.init({
        id: "Marathon",
        title: "Netflix Marathon Settings",
        fields: {
            amazon: {
                type: "checkbox",
                label: "Run on Amazon",
                title: "Uncheck if you don't use Amazon Prime Video",
                section: "Main Settings",
                default: true,
            },
            netflix: {
                type: "checkbox",
                label: "Run on Netflix",
                title: "Uncheck if you don't use Netflix",
                default: true,
            },
            rate: {
                label: "Interval Rate",
                title: "Time (in milliseconds) between checks for skip buttons",
                type: "int",
                size: 2,
                min: 50,
                max: 5000,
                default: 300,
            },
            promoted: {
                type: "checkbox",
                label: "Autoplay promoted videos",
                title: "After the final credits of a film or the last episode of a series, Netflix recommends a trending or similar movie/series. Check this if you want to automatically start playing Netflix's recommendation at the end of the credits",
                default: false,
            },
            code: {
                label: "Hotkey code",
                title: "Which keyboard key to use (click Support for a list of key codes)",
                type: "text",
                section: "Pause/Resume Hotkey",
                size: 6,
                default: "F7",
            },
            hotkey: {
                type: "checkbox",
                label: "Enable toggle hotkey",
                title: "Uncheck to disable the pause/resume shortcut",
                default: true,
            },
            ctrlKey: {
                type: "checkbox",
                label: "Ctrl key",
                title: "Set Ctrl as a modifier key for the shortcut",
                default: true,
            },
            altKey: {
                type: "checkbox",
                label: "Alt key",
                title: "Set Alt as a modifier key for the shortcut",
                default: false,
            },
            shiftKey: {
                type: "checkbox",
                label: "Shift key",
                title: "Set Shift as a modifier key for the shortcut",
                default: false,
            },
            metaKey: {
                type: "checkbox",
                label: "Meta key",
                title: "Set Meta as a modifier key for the shortcut",
                default: false,
            },
            code2: {
                label: "Hotkey code",
                title: "Which keyboard key to use (click Support for a list of key codes)",
                type: "text",
                section: "Settings Hotkey",
                size: 6,
                default: "KeyN",
            },
            hotkey2: {
                type: "checkbox",
                label: "Enable settings hotkey",
                title: "Uncheck to disable the keyboard shortcut",
                default: true,
            },
            ctrlKey2: {
                type: "checkbox",
                label: "Ctrl key",
                title: "Set Ctrl as a modifier key for the shortcut",
                default: false,
            },
            altKey2: {
                type: "checkbox",
                label: "Alt key",
                title: "Set Alt as a modifier key for the shortcut",
                default: true,
            },
            shiftKey2: {
                type: "checkbox",
                label: "Shift key",
                title: "Set Shift as a modifier key for the shortcut",
                default: false,
            },
            metaKey2: {
                type: "checkbox",
                label: "Meta key",
                title: "Set Meta as a modifier key for the shortcut",
                default: false,
            },
            pop: {
                type: "checkbox",
                label: "Enable popup",
                title: "Uncheck to disable the Paused/Resumed popups",
                section: "Popup Settings",
                default: true,
            },
            popDur: {
                label: "Popup duration",
                title: "How long (in milliseconds) the popup should stay open before fading away",
                type: "int",
                size: 4,
                min: 500,
                max: 50000,
                default: 3000,
            },
            webfont: {
                type: "checkbox",
                label: "Use Google Fonts",
                title: "If the font you want is not locally installed, this must be checked",
                default: true,
            },
            font: {
                label: "Popup font",
                title: "Which font to use for the Paused/Resumed popups",
                type: "text",
                size: 12,
                default: "Source Sans Pro",
            },
            fontSizeInt: {
                label: "Font size (px)",
                title: "How big the Paused/Resumed popups should be",
                type: "int",
                size: 1,
                min: 6,
                max: 560,
                default: 24,
            },
            fontWeight: {
                label: "Font weight",
                title: "Boldness of the popup text, measured in multiples of 100 from 100-900",
                type: "select",
                options: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
                default: 300,
            },
            italic: {
                type: "checkbox",
                label: "Italic",
                title: "Check if you want the popup text to be italic",
                default: false,
            },
        },
        events: {
            init() {
                // determine if user has any orphaned script settings
                const migrateKeys = GM_listValues().filter((key) => key !== "Marathon");
                const f = this.fields;
                // all the fields that affect the pause/resume hotkey
                this.hotkeyFields = {
                    code: f.code,
                    hotkey: f.hotkey,
                    ctrlKey: f.ctrlKey,
                    altKey: f.altKey,
                    shiftKey: f.shiftKey,
                    metaKey: f.metaKey,
                    code2: f.code2,
                    hotkey2: f.hotkey2,
                    ctrlKey2: f.ctrlKey2,
                    altKey2: f.altKey2,
                    shiftKey2: f.shiftKey2,
                    metaKey2: f.metaKey2,
                };
                // all the fields that affect the popup appearance/existence
                this.popupFields = {
                    pop: f.pop,
                    popDur: f.popDur,
                    webfont: f.webfont,
                    font: f.font,
                    fontSizeInt: f.fontSizeInt,
                    fontWeight: f.fontWeight,
                    italic: f.italic,
                };
                // all the fields that necessitate loading a new font stylesheet with webfont.
                this.webFontFields = {
                    font: f.font,
                    fontWeight: f.fontWeight,
                    italic: f.italic,
                };
                // this exists to migrate user settings from the old system (multiple objects) to the new system (one JSON object with multiple keys)
                if (migrateKeys.length)
                    for (const key of migrateKeys) {
                        const oldVal = GM_getValue(key);
                        // fontSize used to be a string setting, now it's an integer setting fontSizeInt. need to convert it first
                        if (key === "fontSize" && typeof oldVal === "string") {
                            const newVal = Number(oldVal.match(/\d+/g)[0]);
                            this.set("fontSizeInt", newVal);
                        } else this.set(key, oldVal);

                        GM_deleteValue(key); // get rid of the old setting so we don't have to do this again.
                    }

                this.save(); // we need this to save the default values on first load

                // for all addons except greasemonkey 4, we can add a menu command
                if (!GM4)
                    GM_registerMenuCommand("Open Settings", () => {
                        if (!this.isOpen) this.open();
                    });

                // memoize the settings
                settings();
            },
            save() {
                if (this.isOpen) {
                    // don't do anything until the user fixes their invalid input
                    if (this.error) return (this.error = false);
                    const f = this.fields;
                    let message = "";
                    let hotkeyMsg = false;
                    let doResetPopup = false;
                    let doReloadWF = false;
                    // close the settings menu upon save (provided none of the inputs is invalid)
                    this.close();
                    // handle changes to any hotkey-related settings
                    for (const [key, field] of Object.entries(this.hotkeyFields)) {
                        const tempKey = field.value;
                        // if the memoized setting doesn't match the new value...
                        if (options[key] !== tempKey) {
                            options[key] = tempKey; // update it
                            if (key === "hotkey" || key === "hotkey2")
                                // if the enable hotkey setting was changed, either stop or start the keydown listener
                                options.hotkey || options.hotkey2 // if either of these settings is true, we need the event listener
                                    ? marathon.startCapturing()
                                    : marathon.stopCapturing();
                            // if both are false then there's no need to listen to keydown at all
                            hotkeyMsg = true;
                        }
                    }
                    if (hotkeyMsg) message += "Hotkeys"; // tell popup to open and announce the successful settings update

                    // handle changes to popup settings
                    for (const [key, field] of Object.entries(this.popupFields)) {
                        const tempKey = field.value;
                        if (options[key] !== tempKey) {
                            options[key] = tempKey; // same pattern as for the hotkey fields, but with some more bespoke behavior below
                            switch (key) {
                                case "pop":
                                    return (this.error = false); // do nothing special if the popup was enabled/disabled since the toggle already checks the option
                                case "webfont":
                                    if (!tempKey) WebFontConfig.google.families.splice(1, 1); // if webfont was disabled, then remove the user-defined font from the webfont config
                                // break omitted
                                case "font":
                                case "fontWeight":
                                case "italic":
                                    doReloadWF = true; // if font, fontWeight, or italic were changed, we need to use webfontloader again
                                    break;
                                case "fontSizeInt":
                                    options.fontSize = `${tempKey}px`; // if font size was changed, update the internal string version
                                    break;
                                default:
                                    break;
                            }
                            doResetPopup = true;
                        }
                    }
                    // if anything was changed, tell popup to announce it
                    if (doResetPopup) {
                        if (doReloadWF) {
                            this.clearLinks("fonts.googleapis.com"); // clear old webfont sheets
                            this.updateWFConfig(); // update WebFontConfig
                            WebFont.load(WebFontConfig); // load new font sheet
                        }
                        if (options.pop) {
                            marathon.updatePopup(); // if the script started with popups disabled, then the styles won't exist yet, so load them.
                            if (message) message += " & "; // if we already set message to Hotkey...
                            message += "Popup"; // set it to Hotkey & Popup
                        }
                    }

                    // handle changes to rate and site settings
                    const newInt = f.rate.value;
                    if (options.rate !== newInt) {
                        options.rate = newInt;
                        marathon.pause(); // stop the current interval
                        marathon.int = newInt; // update the rate
                        if (options[site]) marathon.resume(); // if the site we're currently on is enabled, start the interval with the new rate

                        if (message.includes("&")) message = "Settings";
                        // if we already set it to Hotkey & Popup then reset it to something general so it's not so long
                        else {
                            if (message) message += " & "; // otherwise if it's set to either Hotkey *or* Popup, set it to e.g. Hotkey & Interval
                            message += "Interval"; // otherwise just set it to Interval
                        }
                    }
                    if (
                        options.netflix !== f.netflix.value ||
                        options.amazon !== f.amazon.value ||
                        options.promoted !== f.promoted.value
                    ) {
                        // if the memoized setting for the current site doesn't match the new setting for that site...
                        if (options[site] !== f[site].value) {
                            options[site] = f[site].value; // make them match...
                            f[site].value // and stop or start the interval accordingly
                                ? marathon.resume()
                                : marathon.pause();
                        }
                        options.promoted = f.promoted.value;
                        // if we already changed other types of settings then set the message to something general
                        if (message) message = "Settings";
                        else message = "Site Settings"; // otherwise make it specific to site settings.
                    }
                    if (message) marathon.openPopup(`Updated ${message}`); // finally open a popup with whatever message we gave.
                }
                return (this.error = false);
            },
            open() {
                // add a support button, make the reset link an actual button. we could do this by editing the prototype but again, it'd be a lot of duplicate code.
                const resetLink = methods.byID("Marathon_resetLink"); // the ugly reset link that comes with GM_config
                resetBtn.title = resetLink.title; // assign some attributes of the reset link to the new button
                resetBtn.textContent = resetLink.textContent;
                resetBtn.className = resetLink.parentElement.className;
                resetLink.parentElement.replaceWith(resetBtn); // replace the link with the button
                methods.byID("Marathon_saveBtn").after(resetBtn); // move it next to the save button
                supportBtn.title = locale.title; // give the support button a localized tooltip and label since it's the one someone's most likely to need if they don't speak english.
                supportBtn.textContent = locale.text;
                supportBtn.className = "saveclose_buttons";
                supportBtn.id = "Marathon_supportBtn";
                methods.byID("Marathon_closeBtn").after(supportBtn); // move it to the end.
            },
        },
        frame, // using an in-content element has its problems e.g. we're affected by amazon's god-awful stylesheets, but using an iframe makes animation a lot more clunky and i want the panel to be kinda spry and light
        css: `
        #Marathon {
            display: block !important;
            position: fixed !important;
            z-index: 2147483646 !important;
            inset: unset !important;
            top: 50% !important;
            left: 0% !important;
            background-color: hsla(0, 0%, 5.1%, 0.91);
            background-image: url("https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/texture/noise-512x512.png");
            background-repeat: repeat;
            background-size: auto;
            background-attachment: local;
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
            transition: .2s ease-in-out opacity;
        }
        #Marathon[closed] {
            opacity: 0 !important;
            transition: .5s ease-in-out opacity;
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
            gap: 6px 8px;
            padding: 6px 4px 0;
            margin-top: 8px;
            border-top: 1px solid hsla(0, 0%, 100%, 0.1);
        }
        #Marathon .section_header {
            font-size: 1.25em !important;
            background: none !important;
            border: none !important;
            text-align: left !important;
            flex-basis: 100%;
            margin-inline: -3px;
        }
        #Marathon .config_var {
            margin: 0 !important;
            column-gap: 6px;
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
        #Marathon_section_0 {
            gap: 6px 12px;
        }
        #Marathon_section_0 #Marathon_amazon_var,
        #Marathon_section_0 #Marathon_netflix_var {
            flex-grow: unset;
        }
        #Marathon_buttons_holder {
            display: flex;
            flex-flow: row;
            gap: 6px;
            margin-top: 6px;
            align-items: center;
            border-top: 1px solid hsla(0, 0%, 100%, 0.1);
            color: inherit !important;
        }
        #Marathon .saveclose_buttons,
        #Marathon .reset_holder {
            margin: 6px 0 0 0;
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
            margin: 0 !important;
            white-space: nowrap;
            padding: unset !important;
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
        #Marathon_pop_var,
        #Marathon_font_var {
            flex-basis: 100%;
        }
        `,
    });
}

// load webfontloader and create the base config (to be changed by GM_config)
function attachWebFont() {
    const wf = doc.createElement("script");
    const first = doc.scripts[0];

    WebFontConfig = {
        classes: false, // don't bother changing the DOM at all, we aren't listening for it
        events: false, // no need for events, not worth the execution
        google: {
            families: ["Source Sans Pro:wght@1,300"], // default font and settings font
            display: "swap", // not really necessary since the popup doesn't appear until you press a button. but whatever
        },
    };
    GM_config.updateWFConfig(); // parse user-defined font settings, if any
    wf.src = "https://cdn.jsdelivr.net/npm/webfontloader@latest/webfontloader.js";
    wf.async = true; // don't block the rest of the page for this
    first.parentNode.insertBefore(wf, first);
}

// after getting settings from *monkey storage, memoize their values in options.
async function settings() {
    for (const [key, field] of Object.entries(GM_config.fields)) options[key] = field.value;
    options.fontSize = `${options.fontSizeInt}px`;
}

async function start() {
    await initGMC(); // wait for GM_config
    marathon = new Controller(methods, options.rate); // create the interval controller, event listeners, etc.
    attachWebFont(); // load the font sheet
}

start();
