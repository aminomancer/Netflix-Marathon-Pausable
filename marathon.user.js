// ==UserScript==
// @name               Netflix Marathon (Pausable)
// @name:en            Netflix Marathon (Pausable)
// @name:zh-CN         Netflix 马拉松（可暂停）
// @name:zh-TW         Netflix 馬拉松（可暫停）
// @name:ja            Netflix Marathon（一時停止できます）
// @name:ko            Netflix 마라톤(일시 중지 가능)
// @name:ar            ماراثون Netflix (يمكن إيقافه مؤقتًا)
// @name:de            Netflix-Marathon (pausierbar)
// @name:ru            Netflix Marathon (пауза)
// @name:hi            नेटफ्लिक्स मैराथन (रोकने योग्य)
// @namespace          https://github.com/aminomancer
// @version            5.5.5
// @description        A configurable script that automatically skips recaps, intros, credits, and ads, and clicks "next episode" prompts on Netflix, Amazon Prime Video, Hulu, HBO Max, Starz, Disney+, and Hotstar. Customizable hotkey to pause/resume the auto-skipping functionality. Alt + N for settings.
// @description:en     A configurable script that automatically skips recaps, intros, credits, and ads, and clicks "next episode" prompts on Netflix, Amazon Prime Video, Hulu, HBO Max, Starz, Disney+, and Hotstar. Customizable hotkey to pause/resume the auto-skipping functionality. Alt + N for settings.
// @description:zh-CN  一个可配置的脚本，可自动跳过重述、介绍、演职员表和广告，并点击 Netflix、Amazon Prime Video、Hulu、HBO Max、Starz 和 Disney+ 上的“下一集”提示。 可自定义的热键暂停/恢复自动跳过功能。 Alt + N 进行设置。
// @description:zh-TW  一個可配置的腳本，可自動跳過重述、介紹、演職員表和廣告，並點擊 Netflix、Amazon Prime Video、Hulu、HBO Max、Starz 和 Disney+ 上的“下一集”提示。 可自定義的熱鍵暫停/恢復自動跳過功能。 Alt + N 進行設置。
// @description:ja     要約、イントロ、クレジット、広告を自動的にスキップし、Netflix、Amazon Prime Video、Hulu、HBO Max、Starz、Disney +の「次のエピソード」のプロンプトをクリックする構成可能なスクリプト。 自動スキップ機能を一時停止/再開するためのカスタマイズ可能なホットキー。 Alt + Nで設定します。
// @description:ko     요약, 소개, 크레딧 및 광고를 자동으로 건너뛰고 Netflix, Amazon Prime Video, Hulu, HBO Max, Starz 및 Disney+에서 "다음 에피소드" 프롬프트를 클릭하는 구성 가능한 스크립트입니다. 자동 건너뛰기 기능을 일시 중지/재개하는 사용자 지정 가능한 단축키입니다. Alt + N은 설정입니다.
// @description:ar     برنامج نصي قابل للتكوين يتخطى الملخصات والمقدمات والاعتمادات والإعلانات تلقائيًا وينقر على "الحلقة التالية" على Netflix و Amazon Prime Video و Hulu و HBO Max و Starz و Disney +. مفتاح التشغيل السريع القابل للتخصيص لإيقاف / استئناف وظيفة التخطي التلقائي. Alt + N للإعدادات.
// @description:de     Ein konfigurierbares Skript, das automatisch Zusammenfassungen, Vorspänne, Abspänne und Werbung überspringt und bei Netflix, Amazon Prime Video, Hulu, HBO Max, Starz und Disney+ auf die Aufforderung "nächste Episode" klickt. Anpassbarer Hotkey zum Anhalten/Fortsetzen der Auto-Skipping-Funktion. Alt + N für Einstellungen.
// @description:ru     Настраиваемый сценарий, который автоматически пропускает резюме, вступление, титры и рекламу, а также нажимает подсказки «следующий выпуск» на Netflix, Amazon Prime Video, Hulu, HBO Max, Starz и Disney +. Настраиваемая горячая клавиша для приостановки / возобновления функции автоматического пропуска. Alt + N для настроек.
// @description:hi     एक विन्यास योग्य स्क्रिप्ट जो स्वचालित रूप से रिकैप, इंट्रो, क्रेडिट और विज्ञापनों को छोड़ देती है, और नेटफ्लिक्स, अमेज़ॅन प्राइम वीडियो, हुलु, एचबीओ मैक्स, स्टारज़ और डिज़नी + पर "अगला एपिसोड" पर क्लिक करती है। ऑटो-स्किपिंग कार्यक्षमता को रोकने/फिर से शुरू करने के लिए अनुकूलन योग्य हॉटकी। ऑल्ट + एन सेटिंग्स के लिए।
// @author             aminomancer
// @homepageURL        https://github.com/aminomancer/Netflix-Marathon-Pausable
// @supportURL         https://github.com/aminomancer/Netflix-Marathon-Pausable
// @icon               https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/icon-small.svg
// @match              http*://*.amazon.ae/*
// @match              http*://*.amazon.ca/*
// @match              http*://*.amazon.cn/*
// @match              http*://*.amazon.co.jp/*
// @match              http*://*.amazon.co.uk/*
// @match              http*://*.amazon.com/*
// @match              http*://*.amazon.com.au/*
// @match              http*://*.amazon.com.br/*
// @match              http*://*.amazon.com.mx/*
// @match              http*://*.amazon.de/*
// @match              http*://*.amazon.eg/*
// @match              http*://*.amazon.es/*
// @match              http*://*.amazon.fr/*
// @match              http*://*.amazon.in/*
// @match              http*://*.amazon.it/*
// @match              http*://*.amazon.nl/*
// @match              http*://*.amazon.pl/*
// @match              http*://*.amazon.sa/*
// @match              http*://*.amazon.se/*
// @match              http*://*.amazon.sg/*
// @match              http*://*.amazon.tr/*
// @match              http*://*.disneyplus.com/*
// @match              http*://*.hotstar.com/*
// @match              http*://*.hulu.com/*
// @match              http*://play.hbomax.com/*
// @match              http*://*.netflix.com/*
// @match              http*://*.primevideo.com/*
// @match              http*://*.starz.com/*
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
// check whether the GM object exists so we can use the right GM API functions
const GMObj = "GM" in win && typeof win.GM === "object" && typeof win.GM.getValue === "function";
// check if the script handler is GM4, since if it is, we can't add a menu command
const GM4 = GMObj && GM.info.scriptHandler === "Greasemonkey" && GM.info.version.split(".")[0] >= 4;
let marathon;
/**
 * pause execution for n milliseconds
 * @param {Number} ms milliseconds
 * @returns {Promise} a promise that resolves after n milliseconds
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
/**
 * @param {String} u a string to test the URL against
 * @returns {Boolean} true if the URL matches the string
 */
const test = u => win.location.href.includes(u);
const getHost = () => {
  const urlParts = win.location.hostname.split(".");
  const host = urlParts
    .filter(part => {
      switch (part) {
        case "amazon":
        case "primevideo":
        case "disneyplus":
        case "hotstar":
        case "hulu":
        case "hbomax":
        case "netflix":
        case "starz":
          return true;
        default:
          return false;
      }
    })
    .join();
  switch (host) {
    case "amazon":
    case "primevideo":
      return "amazon";
    default:
      return host;
  }
};
const site = getHost();
// some basic localization for the settings menu. just the parts necessary to
// get to the readme, which has chinese, japanese, and arabic translations
const l10n = {
  /**
   * get the locale language code (e.g. "en" for English)
   * @returns {String} the first part of the user's current ISO 639-1 code
   */
  get lang() {
    // memoize the language since it's unlikely to change during runtime
    if (!this._lang) this._lang = navigator.language.split("-")[0];
    return this._lang;
  },
  /**
   * get the label for the support button in settings
   * @returns {String}
   */
  get text() {
    if (this._text) return this._text;
    switch (this.lang) {
      case "zh":
        this._text = "信息"; // chinese
        break;
      case "ja":
        this._text = "助けて"; // japanese
        break;
      case "ko":
        this._text = "기술 지원"; // korean
        break;
      case "ar":
        this._text = "تعليمات"; // arabic
        break;
      case "de":
        this._text = "Hilfe"; // german
        break;
      case "ru":
        this._text = "помощь"; // russian
        break;
      case "hi":
        this._text = "तकनीकी समर्थन"; // hindi
        break;
      default:
        this._text = "Support"; // english etc.
    }
    return this._text;
  },
  /**
   * get the tooltip for the support button in settings
   * @returns {String}
   */
  get title() {
    if (this._title) return this._title;
    switch (this.lang) {
      case "zh":
        this._title = "设置的信息和翻译";
        break;
      case "ja":
        this._title = "設定の情報と翻訳";
        break;
      case "ko":
        this._title = "설정에 대한 정보 및 번역";
        break;
      case "ar":
        this._title = "معلومات وترجمات للإعدادات";
        break;
      case "de":
        this._title = "Infos und Übersetzungen zu den Einstellungen";
        break;
      case "ru":
        this._title = "Информация и переводы для настроек";
        break;
      case "hi":
        this._title = "सेटिंग्स के लिए जानकारी और अनुवाद";
        break;
      default:
        this._title = "Info and translations for the settings";
    }
    return this._title;
  },
};
const methods = {
  // contains the site-specific callbacks and various utility functions
  sites: ["amazon", "disneyplus", "hotstar", "hulu", "hbomax", "netflix", "starz"],
  count: 0,
  results: null,
  nDrain: "[data-uia='next-episode-seamless-button-draining']",
  nReady: "[data-uia='next-episode-seamless-button']",
  /**
   * getElementsByTagName
   * @param {String} s tag name to search for
   * @returns {Array} an array of elements with the given tag name
   */
  byTag: (s, p = doc) => p.getElementsByTagName(s),
  /**
   * getElementById
   * @param {String} s element id to search for
   * @returns {Element} the element with the given id
   */
  byID: s => doc.getElementById(s),
  /**
   * querySelector
   * @param {String} s CSS selector e.g. ".class" or "#id"
   * @returns {Element} the first element matching the given CSS selector
   */
  qry: (s, p = doc) => p.querySelector(s),
  /**
   * querySelectorAll
   * @param {String} s CSS selector e.g. ".class" or "#id"
   * @returns {Array} an array of elements matching the given CSS selector
   */
  qryAll: (s, p = doc) => p.querySelectorAll(s),
  /**
   * document.evaluate
   * @param {String} s node's text content to search for
   * @param {String} n node's tag name. if not passed, then accept any tag
   * @param {String} p node's parent's tag name. this is like saying button>div.
   *                   if not passed, then just ignore the node's parent
   * @returns {Element} the first element matching the given parameters
   */
  byTxt(s, n = "*", p) {
    return doc.evaluate(
      `//${p ? `${p}/child::` : ""}${n}[text()="${s}"]`,
      doc,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      this.results
    ).singleNodeValue;
  },
  /**
   * find react instance given a DOM node
   * @param {Object} d usually a DOM node, but can be a react instance
   * @returns {Object} the react instance
   */
  reactInstance(d) {
    for (const [key, value] of Object.entries(d || 0)) {
      if (key.startsWith("__reactInternalInstance$")) return value;
    }
    return null;
  },
  /**
   * find react fiber given a DOM node
   * @param {Object} d usually a DOM node, but can be a react instance
   * @returns {Object} the react fiber
   */
  reactFiber(d) {
    for (const [key, value] of Object.entries(d || 0)) {
      if (key.startsWith("__reactFiber$")) return value;
    }
    return null;
  },
  /**
   * determine if an element is visible (namely the amazon player)
   * @param {String} s element id
   * @returns {Boolean} true if the element is visible
   */
  isVis(s) {
    try {
      return !!this.byID(s).offsetParent;
    } catch (e) {
      return false;
    }
  },
  /**
   * ensure the controller is not paused
   * @returns {Boolean} true if the controller is not paused
   */
  get isReady() {
    return this.controller && this.controller.pauseState === 1;
  },
  /**
   * clicks the passed element and sets the count to 5
   * @param {Element} el the element to click
   * @param {Number} [addOnClick] cancel the next n runs if click is successful
   * @param {Number} [addOnFail] cancel the next n runs if click is unsuccessful
   */
  clk(el, { addOnClick = 5, addOnFail = 2 } = {}) {
    try {
      el.click();
      this.count = addOnClick;
    } catch (e) {
      this.count = addOnFail;
    }
  },
  /**
   * pass a CSS selector string to locate a react component and invoke its
   * onPress method. a trick to get around the fact that HBO tries to stop
   * adblockers and other extensions from invoking Element.click(), etc.
   * @param {String} s CSS selector e.g. ".class" or "#id"
   * @param {Number} [addOnClick] cancel the next n runs if click is successful
   * @param {Number} [addOnFail] cancel the next n runs if click is unsuccessful
   */
  hboPress(s, { addOnClick = 5, addOnFail = 2 } = {}) {
    try {
      this.reactFiber(this.qry(s)).return.return.memoizedProps.onPress();
      this.count = addOnClick;
    } catch (e) {
      this.count = addOnFail;
    }
  },
  /**
   * set a bunch of attributes on an element
   * @param {Element} element the element to set attributes on
   * @param {Object} attrs an object containing properties — keys are turned
   *                       into attributes on the element
   */
  maybeSetAttributes(element, attrs) {
    for (const [name, value] of Object.entries(attrs)) {
      if (value === undefined) element.removeAttribute(name);
      else element.setAttribute(name, value);
    }
  },
  /**
   * create an element with given parameters
   * @param {Document} aDoc which doc to create the element in
   * @param {String} tag an HTML tag name, like "button" or "p"
   * @param {Object} props an object containing attribute name/value pairs, e.g.
   *                       {class: ".bookmark-item", id: "bookmark-item-1"}
   * @returns {Element} the created element
   */
  create(aDoc, tag, props) {
    const el = aDoc.createElement(tag);
    this.maybeSetAttributes(el, props);
    return el;
  },
  // these are the site-specific callback methods. they search for elements that
  // skip stuff. when the script is not paused, they are invoked on a timer.
  async amazon() {
    if (this.count === 0) {
      if (this.isVis("dv-web-player")) {
        let store; // memoize the element when we check for its existence so we don't have to evaluate the DOM twice.
        if ((store = this.qry(".atvwebplayersdk-nextupcard-button"))) {
          // next episode
          await sleep(400);
          if (this.isReady) this.clk(store);
        } else if ((store = this.qry(".atvwebplayersdk-skipelement-button"))) {
          // skip various things
          this.clk(store);
        } else if ((store = this.qry(".adSkipButton"))) {
          // skip ad
          this.clk(store);
        } else if ((store = this.qry(".skipElement"))) {
          //  skip intro
          this.clk(store);
        } else if ((store = this.qry(".fu4rd6c"))) {
          // skip ad button on some versions of amazon.
          this.clk(store);
        }
        // else if ((store = this.byTxt("Skip", "div")))
        //     // skip trailers
        //     this.clk(store);
        // else if ((store = this.byTxt("Skip Intro", "button", "div")))
        //     // skip intro
        //     this.clk(store);
        // else if ((store = this.byTxt("Skip Recap", "button", "div")))
        //     // skip recap
        //     this.clk(store);
      }
    } else this.count -= 1;
  },
  async netflix() {
    if (this.count === 0) {
      let store;
      if (this.qry(".skip-credits") && !this.qry(".skip-credits-hidden")) {
        try {
          await sleep(200);
          if (this.isReady) {
            this.qry(".skip-credits").firstElementChild.click();
            this.count = 80;
          }
          await sleep(100);
          if (this.isReady) {
            this.qry(".button-nfplayerPlay").click();
            this.count = 80;
          }
        } catch (e) {
          this.count = 0;
        }
      } else if ((store = this.qry(this.nDrain)) || (store = this.qry(this.nReady))) {
        // next episode button
        const react = this.reactInstance(store);
        if (react && react.memoizedProps.onClick) react.memoizedProps.onClick();
        this.count = 5;
      } else if (options.promoted && (store = this.qry(".PromotedVideo-actions"))) {
        // promoted video autoplay
        await sleep(700);
        if (this.isReady) this.clk(store.firstElementChild);
      } else if ((store = this.qry(".watch-video--skip-content-button"))) {
        // skip intro, recap, etc. (new netflix UI)
        this.clk(store);
      } else if ((store = this.qry(".watch-video--skip-preplay-button"))) {
        // not sure what this does but I found this while trying to reverse engineer the source code. please inform me if you know
        this.clk(store);
      } else if ((store = this.qry(".postplay-still-container"))) {
        // autoplay (old netflix UI)
        this.clk(store);
      } else if ((store = this.qry(".WatchNext-still-container"))) {
        // autoplay (old netflix UI)
        this.clk(store);
      }
    } else this.count -= 1;
  },
  async disneyplus() {
    if (this.count === 0) {
      if (test("disneyplus.com/video/")) {
        let store;
        if ((store = this.qry(".skip__button"))) {
          // skip intro, skip recap, skip credits, etc.
          this.clk(store);
        } 
        else if ((store = this.qry(`button[data-testid="up-next-play-button"]`))) {
          let skip = false;
          const react = this.reactInstance(this.qry(`[data-gv2containerkey="playerUpNext"]`));
          if (react && "return" in react) {
            const props = react.return.memoizedProps;
            // if we're in a TV series, skip regardless of options.promoted
            if (props.asset && props.asset.programType) {
              skip = props.asset.programType === "episode";
            }
          }
          // if options.promoted is enabled, we can autoplay disneyplus' recommendations
          // after a film or the last episode in a series.
          if (options.promoted) skip = true;
          if (skip) this.clk(store);
        }
      }
    } else this.count -= 1;
  },
  async hotstar() {
    if (this.count === 0) {
      if (test("hotstar.com/id/")) {
        let store;
        if ((store = this.qry(".binge-btn-wrapper.show-btn .binge-btn.primary.medium"))) {
          // skip intro, skip recap.
          this.clk(store);
        }
        if ((store = this.qry(".binge-btn-wrapper.show-btn .binge-btn.secondary.filler"))) {
          // skip outro or next episode immediately.
          this.clk(store);
        }
      }
    } else this.count -= 1;
  },
  async hulu() {
    if (this.count === 0) {
      if (test("hulu.com/watch/")) {
        const controls = this.qry(".ControlsContainer");
        if (!controls) {
          // this means the whole video interface is gone for some reason
          this.count = 20;
          return;
        }
        const controlReact = this.reactInstance(controls);
        if (!controlReact) return; // this shouldn't happen unless the page has been broken by addons or something
        const controlProps = controlReact.return.memoizedProps;
        if (!controlProps) return; // this shouldn't happen either
        if (controlProps.isSkipButtonShown) {
          // skip intro, skip recap, skip ad, etc.
          this.clk(this.qry(".SkipButton button"));
        } else if (controlProps.isEndCardVisible) {
          // next episode
          if (controlProps.endCardType === "credit" || options.promoted) {
            this.clk(this.qry(".EndCardButton--active"));
          }
        } else if (controlProps.isOverlayVisible) {
          // next episode
          if (controlProps.endCardType === "legacy" && options.promoted) {
            this.clk(this.qry(".end-card__metadata-area-play-button"));
          }
        }
      }
    } else this.count -= 1;
  },
  async hbomax() {
    if (this.count === 0) {
      if (test("play.hbomax.com/player/")) {
        try {
          const viewHandle = this.byID("rn-video");
          const fiber = this.reactFiber(viewHandle);
          const player = fiber.return.return.memoizedProps.videoPlayer;
          const uiData = player._uiManager._uiState.uiData;
          if (uiData.activeSkipAnnotation) {
            // skip intro, skip recap, skip ad, etc.
            this.hboPress(`[data-testid="SkipButton"]`);
          } else if (uiData.activeNextEpisodeInfo) {
            // next episode
            try {
              const interactionHandler = viewHandle.parentElement.lastElementChild;
              this.reactFiber(interactionHandler).return.return.memoizedProps.onMouseMove();
              await sleep(400);
            } finally {
              if (this.isReady) this.hboPress(`[data-testid="UpNextButton"]`);
            }
          }
        } catch (e) {
          this.count = 10;
        }
      }
    } else this.count -= 1;
  },
  async starz() {
    if (this.count === 0) {
      if (test("/play/")) {
        let store = this.byTag("starz-player")[0];
        if (!store) return;
        if ((store = this.qry(".auto-roll-component.open .next-feature-image"))) {
          // next episode - this is the only one I know of
          this.clk(store);
        }
      }
    } else this.count -= 1;
  },
};

// creates an interval for a given callback manager (the methods object) and the
// various methods for interacting with the interval (pause, resume, etc.) and
// the popup that shows when the interval has been paused or resumed.
class MarathonController {
  /**
   * pausable interval utility
   * @param {Object} handler object containing the site methods
   * @param {Number} int how often to repeat the callback
   * @return {Object} the controller object
   */
  constructor(handler, int) {
    this.callback = handler[site].bind(handler); // e.g. methods.amazon.bind(methods)
    handler.controller = this; // for reference in the methods object
    this.handler = handler; // e.g. methods
    this.int = int; // can be changed in real-time and the next resume() call will use the new value
    this.popup = doc.createElement("div");
    this.text = doc.createTextNode("Marathon: Paused");
    this.remainder = 0; // how much time is remaining on the interval when we pause it
    this.fading = null; // 3 second timeout (by default), after which the popup fades
    this.pauseState = 0; //  0: idle, 1: running, 2: paused, 3: resumed
    this.toggle = this.toggler.bind(this);
    this.register("Pause Marathon", true); // initial creation of the menu command
    // if popup is enabled in options, style it
    if (options.pop) this.updatePopup();
    this.time = new Date();
    this.timer = win.setTimeout(() => this.onInterval(), this.int);
    this.pauseState = 1;
    this.startCapturing();
    // if the site is disabled then stop the interval. we pause it instead of
    // not starting it in the first place so that the user can re-enable the
    // site and have the interval immediately start working without needing to
    // refresh the page.
    if (!options[site]) this.pause();
  }

  /**
   * check that the modifier keys pressed match those defined in user settings
   * @param {KeyboardEvent} e
   * @param {String} d which key settings to evaluate, ctrlKey or ctrlKey1
   * @return {Boolean} true if the keys match, false otherwise
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
   * Controller's event handler. only handles keydown currently.
   * @param {UIEvent} e
   */
  handleEvent(e) {
    switch (e.type) {
      case "keydown":
        this.onKeyDown(e);
        break;
      default:
    }
  }

  /**
   * implementation for hotkeys
   * @param {KeyboardEvent} e
   */
  onKeyDown(e) {
    if (e.repeat) return;
    const { code, code2, hotkey, hotkey2 } = options;
    switch (e.code) {
      case code:
        if (hotkey && MarathonController.modTest(e)) this.toggle();
        else return;
        break;
      case code2:
        if (hotkey2 && MarathonController.modTest(e, 2)) {
          GM_config.isOpen ? GM_config.close() : GM_config.open();
        } else return;
        break;
      default:
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  // invoke the site handler, wait for it to complete, then restart the timer.
  async onInterval() {
    try {
      if (this.pauseState === 1) await this.callback();
    } finally {
      this.timer = win.setTimeout(() => this.onInterval(), this.int);
    }
  }

  /**
   * pause the interval
   * @param {String} msg string or null — determines the popup text
   */
  pause(msg) {
    if (this.pauseState !== 1) return;
    this.remainder = this.int - (new Date() - this.time);
    win.clearTimeout(this.timer);
    this.pauseState = 2;
    this.register("Resume Marathon"); // update the menu command label
    this.openPopup(msg);
  }

  /**
   * resume the interval
   * @param {String} msg string or null — determines the popup text
   */
  async resume(msg) {
    if (this.pauseState !== 2) return;
    this.pauseState = 3;
    this.register("Pause Marathon");
    this.openPopup(msg);
    await sleep(this.remainder);
    this.run();
  }

  // when we pause, there's usually still time left on the interval. resume()
  // calls this after waiting for the remaining duration. so this is what
  // actually resumes the interval.
  run() {
    if (this.pauseState !== 3) return;
    this.time = new Date();
    this.pauseState = 1;
    this.onInterval();
  }

  // toggle the interval on/off.
  toggler() {
    if (!options[site]) return; // disable the pause/resume toggle when the site is disabled
    switch (this.pauseState) {
      case 1:
        this.pause("Paused"); // passing "Paused" tells openPopup to use the "Marathon: Paused" message
        break;
      case 2:
        this.resume("Resumed"); // passing "Resumed" => "Marathon: Resumed" message
        break;
      default:
    }
  }

  /**
   * opens the popup and schedules it to close
   * @param {String} msg what the popup should say
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
    if (this.isPopupSetup) return;
    doc.body.insertBefore(this.popup, doc.body.firstElementChild);
    this.popup.appendChild(this.text);
    this.popup.style.cssText = `position:fixed;top:50%;right:3%;transform:translateY(-50%);z-index:2147483646;background-color:hsla(0,0%,6%,.8);background-image:url("https://cdn.jsdelivr.net/gh/aminomancer/Netflix-Marathon-Pausable@latest/texture/noise-512x512.png");background-repeat:repeat;background-size:auto;background-attachment:local;-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);color:hsla(0,0%,97%,.95);padding:17px 19px;line-height:1em;border-radius:5px;pointer-events:none;letter-spacing:1px;transition:opacity .2s ease-in-out;opacity:0;`;
    this.isPopupSetup = true;
  }

  // update the mutable popup attributes
  updatePopup() {
    this.setupPopup();
    const { style } = this.popup;
    style.fontFamily = options.font;
    style.fontSize = `${options.fontSizeInt}px`;
    style.fontWeight = options.fontWeight;
    style.fontStyle = options.italic ? "italic" : "";
  }

  /**
   * register a menu command with the script manager, or update an existing one
   * @param {String} cap intended caption to display on the menu command
   * @param {Boolean} firstRun we call this function at startup and every time
   *                           we pause/unpause. on the first call, we register
   *                           a command. on subsequent calls, we unregister the
   *                           previous command and register a new one.
   */
  register(cap, firstRun = false) {
    if (GM4) return; // don't register a menu command if the script manager is greasemonkey 4.0+ since the function doesn't exist
    if (!firstRun) GM_unregisterMenuCommand(this.caption); // this is how we switch the menu command from play to pause. we'd prefer to just have a single menu command and use a variable to determine its label and callback behavior, but the API doesn't support that afaik.
    // don't register the pause/unpause menu command if the site is currently disabled
    if (options[site]) {
      GM_registerMenuCommand(cap, this.toggle);
      this.caption = cap;
    }
  }

  // start listening to key events
  startCapturing() {
    if (!this.capturing && (options.hotkey || options.hotkey2)) {
      win.addEventListener("keydown", this, true);
      this.capturing = true;
    }
  }

  // stop listening to key events
  stopCapturing() {
    if (this.capturing) {
      win.removeEventListener("keydown", this, true);
      this.capturing = false;
    }
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
        if (field.save) {
          if (value != null) {
            values[id] = value;
            field.value = value;
          } else {
            this.error = true;
            values[id] = field.value;
          }
        } else forgotten[id] = value;
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
   * remove all the stylesheets generated by GM_config. without this, GM_config
   * would keep adding a new sheet every time you open it.
   * @param {String} sel CSS selector; check each stylesheet for this string
   */
  GM_config.clearSheets = sel => {
    for (const i of [...methods.byTag("style", doc.head)]) {
      try {
        if (
          i instanceof HTMLStyleElement &&
          i.sheet.cssRules[0].selectorText &&
          i.sheet.cssRules[0].selectorText.includes(sel)
        ) {
          i.remove();
        }
        // Amazon CSP blocks cross-origin use of method sheet.cssRules so the
        // loop will interrupt on some unrelated stylesheet. I'd use the
        // optional chaining operator here but it's not enabled by default in
        // chrome. So trycatch statement instead.
      } catch (e) {
        // do nothing
      }
    }
  };
  /**
   * remove all the link elements generated by webfontloader.js. the loader has
   * no logic to amend its existing stylesheets and will just keep adding more
   * every time you call it.
   * @param {String} uri url or part of url; check each link element's href
   *                     attribute for this string
   */
  GM_config.clearLinks = uri => {
    for (const i of [...methods.byTag("link", doc.head)]) {
      if (i instanceof HTMLLinkElement && i.href.includes(uri)) i.remove();
    }
  };
  /**
   * return true if any of the fields passed have values that deviate from their
   * default values. we use this to avoid performing operations that are
   * unnecessary when aspects of the user's config are unchanged.
   * @param {Object} fields an object whose properties are GM_config fields
   */
  GM_config.checkNotDefault = fields =>
    !Object.values(fields).every(field => field.value === field.default);
  // if webfont is enabled and any of the fields that affect webfont are non-default, (font, italic, fontWeight) then change the webfont config
  GM_config.updateWFConfig = function updateWFConfig() {
    if (options.webfont && this.checkNotDefault(this.webFontFields)) {
      WebFontConfig.google.families[1] = `${options.font}:${options.italic ? "ital," : ""}wght@1,${
        options.fontWeight
      }`;
    }
  };
  // prettier-ignore
  GM_config.specialKeys = ["Unidentified","Alt","AltGraph","CapsLock","Control","Fn","FnLock","Hyper","Meta","NumLock","ScrollLock","Shift","Super","Symbol","SymbolLock","AllCandidates","Alphanumeric","CodeInput","Compose","Convert","Dead","FinalMode","GroupFirst","GroupLast","GroupNext","GroupPrevious","ModeChange","NextCandidate","NonConvert","PreviousCandidate","Process","SingleCandidate","HangulMode","HanjaMode","JunjaMode","Eisu","Hankaku","Hiragana","HiraganaKatakana","KanaMode","KanjiMode","Katakana","Romaji","Zenkaku","ZenkakuHankaku"];
}

// set up the GM_config settings GUI
async function initGMC() {
  const frame = doc.createElement("div");
  const sitesFieldLabel = methods.create(doc, "div", {
    class: "field_label",
    id: "Marathon_section_0_subheader_0",
  });
  sitesFieldLabel.innerHTML = "Run on:&nbsp;";
  const resetBtn = doc.createElement("button");
  const supportBtn = doc.createElement("button");
  frame.style.display = "none";
  doc.body.appendChild(frame);
  frame.appendChild(sitesFieldLabel);
  frame.appendChild(resetBtn);
  frame.appendChild(supportBtn);
  resetBtn.addEventListener("click", () => GM_config.reset());
  supportBtn.addEventListener("click", () =>
    GM_openInTab("https://greasyfork.org/scripts/420475-netflix-marathon-pausable")
  );
  GM_config.error = false; // this switch tells us if the user input an invalid value for a setting so we won't close the GUI when they try to save.
  extendGMC();
  window.addEventListener(
    "keydown",
    e => {
      switch (e.code) {
        case "Escape":
          if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
          break;
        case options.code2:
          if (!options.hotkey2 || !MarathonController.modTest(e, 2)) return;
          break;
        default:
          return;
      }
      // hide the settings menu
      if (GM_config.isOpen && !GM_config.capturing) {
        GM_config.close();
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    },
    true
  );
  // initialize the GUI
  GM_config.init({
    id: "Marathon",
    title: "Netflix Marathon Settings",
    fields: {
      amazon: {
        type: "checkbox",
        label: "Amazon",
        title: "Uncheck if you don't use Amazon Prime Video",
        section: "Main Settings",
        default: true,
      },
      netflix: {
        type: "checkbox",
        label: "Netflix",
        title: "Uncheck if you don't use Netflix",
        default: true,
      },
      disneyplus: {
        type: "checkbox",
        label: "Disney+",
        title: "Uncheck if you don't use Disney+",
        default: true,
      },
      hotstar: {
        type: "checkbox",
        label: "Hotstar",
        title: "Uncheck if you don't use Hotstar",
        default: true,
      },
      hulu: {
        type: "checkbox",
        label: "Hulu",
        title: "Uncheck if you don't use Hulu",
        default: true,
      },
      hbomax: {
        type: "checkbox",
        label: "HBO Max",
        title: "Uncheck if you don't use HBO Max",
        default: true,
      },
      starz: {
        type: "checkbox",
        label: "Starz",
        title: "Uncheck if you don't use Starz",
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
        title:
          "After the final credits of a film or the last episode of a series, Netflix and Disney+ recommend a trending or similar movie/series. Check this if you want to automatically start playing the site's recommendation at the end of the credits",
        default: false,
      },
      code: {
        label: "Hotkey code",
        title: "Which keyboard key to use (click Support for a list of key codes)",
        type: "text",
        section: "Pause/Resume Hotkey",
        size: 4,
        default: "F7",
      },
      capture: {
        label: "Record keys",
        title: "Press desired key combination and press Enter",
        type: "button",
        size: 1,
        click: () => {
          const { code, capture, ctrlKey, altKey, shiftKey, metaKey } = GM_config.fields;
          if (GM_config.capturing || capture.node.disabled) return;
          code.settings.initialValue = code.node.value;
          ctrlKey.settings.initialChecked = ctrlKey.node.checked;
          altKey.settings.initialChecked = altKey.node.checked;
          shiftKey.settings.initialChecked = shiftKey.node.checked;
          metaKey.settings.initialChecked = metaKey.node.checked;
          GM_config.capturing = true;
          capture.node.disabled = true;
          GM_config.frame.setAttribute("capturing", "true");
          code.node.focus();
          code.node.addEventListener("keydown", capture.settings.keydown);
          window.addEventListener("keydown", capture.settings.keydown, true);
          marathon.openPopup("Press desired hotkey then Enter (Esc to cancel)");
        },
        keydown: e => {
          const { code, capture, ctrlKey, altKey, shiftKey, metaKey } = GM_config.fields;
          if (GM_config.specialKeys.includes(e.key)) return;
          switch (e.key) {
            case "Enter":
              break;
            case "Escape":
              code.node.value = code.settings.initialValue;
              ctrlKey.node.checked = ctrlKey.settings.initialChecked;
              altKey.node.checked = altKey.settings.initialChecked;
              shiftKey.node.checked = shiftKey.settings.initialChecked;
              metaKey.node.checked = metaKey.settings.initialChecked;
              break;
            default:
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              if (e.repeat) return;
              code.node.value = e.code;
              ctrlKey.node.checked = e.ctrlKey;
              altKey.node.checked = e.altKey;
              shiftKey.node.checked = e.shiftKey;
              metaKey.node.checked = e.metaKey;
              return;
          }
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          if (e.repeat) return;
          GM_config.capturing = false;
          capture.node.disabled = false;
          GM_config.frame.removeAttribute("capturing");
          code.node.focus();
          code.node.removeEventListener("keydown", capture.settings.keydown);
          window.removeEventListener("keydown", capture.settings.keydown, true);
        },
      },
      hotkey: {
        type: "checkbox",
        label: "Enable",
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
        size: 4,
        default: "KeyN",
      },
      capture2: {
        label: "Record keys",
        title: "Press desired key combination and press Enter",
        type: "button",
        size: 1,
        click: () => {
          const { code2, capture2, ctrlKey2, altKey2, shiftKey2, metaKey2 } = GM_config.fields;
          if (GM_config.capturing || capture2.node.disabled) return;
          code2.settings.initialValue = code2.node.value;
          ctrlKey2.settings.initialChecked = ctrlKey2.node.checked;
          altKey2.settings.initialChecked = altKey2.node.checked;
          shiftKey2.settings.initialChecked = shiftKey2.node.checked;
          metaKey2.settings.initialChecked = metaKey2.node.checked;
          GM_config.capturing = true;
          capture2.node.disabled = true;
          GM_config.frame.setAttribute("capturing", "true");
          code2.node.focus();
          code2.node.addEventListener("keydown", capture2.settings.keydown);
          window.addEventListener("keydown", capture2.settings.keydown, true);
          marathon.openPopup("Press desired hotkey then Enter (Esc to cancel)");
        },
        keydown: e => {
          const { code2, capture2, ctrlKey2, altKey2, shiftKey2, metaKey2 } = GM_config.fields;
          if (GM_config.specialKeys.includes(e.key)) return;
          switch (e.key) {
            case "Enter":
              break;
            case "Escape":
              code2.node.value = code2.settings.initialValue;
              ctrlKey2.node.checked = ctrlKey2.settings.initialChecked;
              altKey2.node.checked = altKey2.settings.initialChecked;
              shiftKey2.node.checked = shiftKey2.settings.initialChecked;
              metaKey2.node.checked = metaKey2.settings.initialChecked;
              break;
            default:
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              if (e.repeat) return;
              code2.node.value = e.code;
              ctrlKey2.node.checked = e.ctrlKey;
              altKey2.node.checked = e.altKey;
              shiftKey2.node.checked = e.shiftKey;
              metaKey2.node.checked = e.metaKey;
              return;
          }
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          if (e.repeat) return;
          GM_config.capturing = false;
          capture2.node.disabled = false;
          GM_config.frame.removeAttribute("capturing");
          code2.node.focus();
          code2.node.removeEventListener("keydown", capture2.settings.keydown);
          window.removeEventListener("keydown", capture2.settings.keydown, true);
        },
      },
      hotkey2: {
        type: "checkbox",
        label: "Enable",
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
        const migrateKeys = GM_listValues().filter(key => key !== "Marathon");
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
        if (migrateKeys.length) {
          for (const key of migrateKeys) {
            const oldVal = GM_getValue(key);
            // fontSize used to be a string setting, now it's an integer setting fontSizeInt. need to convert it first
            if (key === "fontSize" && typeof oldVal === "string") {
              const newVal = Number(oldVal.match(/\d+/g)[0]);
              this.set("fontSizeInt", newVal);
            } else this.set(key, oldVal);
            GM_deleteValue(key); // get rid of the old setting so we don't have to do this again.
          }
        }
        this.save(); // we need this to save the default values on first load
        // for all addons except greasemonkey 4, we can add a menu command
        if (!GM4) {
          GM_registerMenuCommand("Open Settings", () => {
            if (!this.isOpen) this.open();
          });
        }
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
          // handle changes to any hotkey-related settings
          for (const [key, field] of Object.entries(this.hotkeyFields)) {
            const tempKey = field.value;
            // if the memoized setting doesn't match the new value...
            if (options[key] !== tempKey) {
              options[key] = tempKey; // update it
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
                default:
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
            options.disneyplus !== f.disneyplus.value ||
            options.hotstar !== f.hotstar.value ||
            options.hulu !== f.hulu.value ||
            options.hbomax !== f.hbomax.value ||
            options.starz !== f.starz.value ||
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
          // close the settings menu upon save (provided none of the inputs is invalid)
          this.close();
          if (message) marathon.openPopup(`Updated ${message}`); // finally open a popup with whatever message we gave.
        }
        return (this.error = false);
      },
      open() {
        marathon.stopCapturing();
        // add a label to the "Run on" checkboxes
        methods.byID("Marathon_section_header_0").after(sitesFieldLabel);
        // put the checkboxes in a container so we can ensure it doesn't wrap
        const sites = [...methods.byID("Marathon_section_0").children].slice(
          1,
          2 + methods.sites.length
        );
        const container = sites[0].parentElement.insertBefore(doc.createElement("div"), sites[0]);
        container.className = "grid_container";
        sites.forEach(div => container.appendChild(div));
        // add a support button, make the reset link an actual button. we could do this by editing the prototype but again, it'd be a lot of duplicate code.
        const resetLink = methods.byID("Marathon_resetLink"); // the ugly reset link that comes with GM_config
        methods.maybeSetAttributes(resetBtn, {
          title: resetLink.title,
          class: resetLink.parentElement.className,
        });
        resetBtn.textContent = resetLink.textContent;
        resetLink.parentElement.replaceWith(resetBtn); // replace the link with the button
        methods.byID("Marathon_saveBtn").after(resetBtn); // move it next to the save button
        // give the support button a localized tooltip and label since it's the one someone's most likely to need if they don't speak english.
        methods.maybeSetAttributes(supportBtn, {
          title: l10n.title,
          class: "saveclose_buttons",
          id: "Marathon_supportBtn",
        });
        supportBtn.textContent = l10n.text;
        const closeBtn = methods.byID("Marathon_closeBtn");
        closeBtn.after(supportBtn); // move it to the end.
        closeBtn.textContent = "Cancel"; // change the text from "Close" to "Cancel" so it's clear that this will discard changes to settings
        const firstField = methods.qry(`.config_var [id^="Marathon_field_"]`, frame);
        if (firstField) firstField.focus();
      },
      close() {
        let blurTo;
        switch (site) {
          case "netflix": {
            const mountPoint = methods.byID("appMountPoint");
            blurTo = methods.qry(`[tabindex]`, mountPoint) || mountPoint;
            break;
          }
          case "amazon":
            blurTo = methods.qry(".webPlayerSDKUiContainer");
            break;
          case "disneyplus":
            blurTo = methods.qry(".btm-media-client-element");
            break;
          case "hotstar":
          case "hulu":
            blurTo = methods.qry(".addFocus");
            break;
          case "hbomax":
          case "starz":
            break;
          default:
            return;
        }
        blurTo = blurTo || doc.body;
        blurTo.focus();
        marathon.startCapturing();
      },
    },
    frame, // using an in-content element has its problems e.g. we're affected by amazon's god-awful stylesheets, but using an iframe makes animation a lot more clunky and i want the panel to be kinda spry and light
    css: /* css */ `#Marathon {
  display: block !important;
  position: fixed !important;
  z-index: 2147483646 !important;
  inset: unset !important;
  top: 50% !important;
  left: 0 !important;
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
  transition: 0.2s ease-in-out opacity;
  color-scheme: dark;
}
#Marathon[closed] {
  opacity: 0 !important;
  transition: 0.5s ease-in-out opacity;
}
#Marathon * {
  font-family: Source Sans Pro;
  font-weight: 300;
  text-transform: revert;
}
#Marathon[capturing] * {
  pointer-events: none;
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
#Marathon .horizontal_container {
  display: flex;
  flex-flow: row nowrap;
  column-gap: 10px;
}
#Marathon .grid_container {
  display: grid;
  grid-template-areas: "head head head";
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px 8px;
  flex-grow: 1;
  padding-bottom: 3px;
}
#Marathon .grid_container > .field_label {
  grid-area: head;
  margin-bottom: -2px !important;
}
#Marathon .config_var {
  margin: 0 !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: normal;
  flex-grow: 1;
}
#Marathon .config_var .field_label:first-child:not(:only-child) {
  padding-inline-end: 6px !important;
}
#Marathon .config_var .field_label:last-child:not(:only-child) {
  padding-inline-start: 6px !important;
}
#Marathon :is(button, input, optgroup, select, textarea) {
  margin: 0;
  font: inherit;
  appearance: revert;
  box-shadow: none;
  background: revert;
  color: revert;
  border: revert;
  border-radius: revert;
  outline: revert;
  transition: revert;
  height: revert;
  width: revert;
  padding: revert;
}
#Marathon button {
  text-align: center;
  cursor: default !important;
}
#Marathon input[type="text"] {
  padding: 0 3px;
  flex-grow: 1;
  height: unset;
  box-sizing: initial !important;
  margin: 0 !important;
  font-size: 14px !important;
}
#Marathon input[type="text"][size="1"] {
  width: 1.5em;
}
#Marathon input[type="checkbox"] {
  min-width: 14px;
  min-height: 14px;
  margin-inline: 0;
  border-radius: 2.5px;
  position: static;
  box-sizing: border-box;
}
#Marathon_section_0 {
  gap: 6px 12px;
}
#Marathon_section_0_subheader_0 {
  flex-grow: 1;
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
  display: flex;
  margin: 6px 0 0 0;
  padding: 2px 12px;
  min-height: 24px;
  color-scheme: dark;
  padding-inline: 4px;
  font-size: 15px;
  padding-block: 2px;
  flex-grow: 1;
  white-space: nowrap;
}
#Marathon #Marathon_saveBtn,
#Marathon .reset_holder {
  padding-inline-start: 0 !important;
}
#Marathon_saveBtn::before {
  content: "";
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path fill='hsla(0,0%,97%,.95)' d='M6 14a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414l2.157 2.157 6.316-9.023a1 1 0 011.639 1.146l-7 10a1 1 0 01-.732.427A.863.863 0 016 14z'/></svg>");
  background-position:  3px 48%;
  background-size: 12.5px;
  background-repeat: no-repeat;
}
#Marathon .reset_holder::before {
  content: "";
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='hsla(0,0%,97%,.95)' height='16' width='16'><path d='M1 1a1 1 0 011 1v2.4A7 7 0 118 15a7 7 0 01-4.9-2 1 1 0 011.4-1.5 5 5 0 10-1-5.5H6a1 1 0 010 2H1a1 1 0 01-1-1V2a1 1 0 011-1z'/></svg>");
  background-position:  4px 50%;
  background-size: 11px;
  background-repeat: no-repeat;
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
#Marathon_pop_var,
#Marathon_font_var {
  flex-basis: 100%;
}`,
  });
}

// load webfontloader and create the base config (to be changed by GM_config)
function attachWebFont() {
  const loader = doc.createElement("script");
  const first = doc.scripts[0];
  WebFontConfig = {
    classes: false, // don't bother changing the DOM at all, we aren't listening for it
    events: false, // no need for events, not worth the execution
    google: {
      families: ["Source Sans Pro:wght@1,300"], // default font and settings font
      display: "swap", // not really necessary since the popup doesn't appear until you press a button. but it doesn't hurt
    },
  };
  GM_config.updateWFConfig(); // parse user-defined font settings, if any
  loader.src = "https://cdn.jsdelivr.net/npm/webfontloader@latest/webfontloader.js";
  loader.async = true; // don't block the rest of the page for this, it won't appear until user interaction anyway
  first.parentNode.insertBefore(loader, first);
}

// after getting settings from *monkey storage, memoize their values in a simple js object so referencing them is cheaper
async function settings() {
  for (const [key, field] of Object.entries(GM_config.fields)) options[key] = field.value;
}

async function start() {
  // if using greasemonkey 4, remap the GM_* functions to GM.*
  if (GM4) {
    GM_getValue = GM.getValue;
    GM_setValue = GM.setValue;
    GM_listValues = GM.listValues;
    GM_deleteValue = GM.deleteValue;
    GM_openInTab = GM.openInTab;
  }
  await initGMC(); // wait for GM_config
  marathon = new MarathonController(methods, options.rate); // create the interval controller, event listeners, etc.
  attachWebFont(); // load the font sheet
}

start();
