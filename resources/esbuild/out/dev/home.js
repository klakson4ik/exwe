(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/common/footer/footer.scss
  var init_footer = __esm({
    "src/common/footer/footer.scss"() {
    }
  });

  // src/common/header/header.scss
  var init_header = __esm({
    "src/common/header/header.scss"() {
    }
  });

  // src/common/footer/footer.js
  var footer_exports = {};
  __export(footer_exports, {
    default: () => SimpleSlider
  });
  var SimpleSlider;
  var init_footer2 = __esm({
    "src/common/footer/footer.js"() {
      SimpleSlider = class {
        constructor(blockName, slider = `${blockName}__slider`, slide = `${blockName}__slide`, btnNext = `${blockName}__nav-next`, btnPrev = `${blockName}__nav-prev`, slideActive = `${blockName}__slide--active`) {
          this.block = document.querySelector(`.${blockName}`);
          if (!this.block)
            return false;
          this.slider = this.block.querySelector(`.${slider}`);
          this.sliders = this.slider.querySelectorAll(`.${slide}`);
          this.btnNext = this.block.querySelector(`.${btnNext}`);
          this.btnPrev = this.block.querySelector(`.${btnPrev}`);
          this.slideActive = this.block.querySelector(`.${slideActive}`);
          this.currentSlide = this.sliders[0];
          this.currentShift = 0;
        }
        onActive(callback = false) {
          this.btnNext.addEventListener("click", () => {
            const id = this.next();
            if (callback)
              callback(id);
          });
          this.btnPrev.addEventListener("click", () => {
            const id = this.prev();
            if (callback)
              callback(id);
          });
        }
        next() {
          let nextSlide = this.currentSlide.nextElementSibling;
          if (!nextSlide) {
            nextSlide = this.sliders[0];
            this.currentShift = 0;
          } else {
            this.currentShift += this.currentSlide.offsetWidth;
          }
          this.currentSlide = nextSlide;
          this.slider.style.right = `${this.currentShift}px`;
          return this.currentSlide.dataset.id;
        }
        prev() {
          let nextSlide = this.currentSlide.previousElementSibling;
          if (!nextSlide) {
            nextSlide = this.sliders[this.sliders.length - 1];
            this.currentShift = this.currentSlide.offsetWidth * (this.sliders.length - 1);
          } else {
            this.currentShift -= this.currentSlide.offsetWidth;
          }
          this.currentSlide = nextSlide;
          this.slider.style.right = `${this.currentShift}px`;
          return this.currentSlide.dataset.id;
        }
      };
    }
  });

  // blocks:src/common
  var require_common = __commonJS({
    "blocks:src/common"(exports) {
      "use strict";
      init_footer();
      init_header();
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var SimpleSlider2 = class {
        constructor(blockName) {
          let slider = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : `${blockName}__slider`;
          let slide = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : `${blockName}__slide`;
          let btnNext = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : `${blockName}__nav-next`;
          let btnPrev = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : `${blockName}__nav-prev`;
          let slideActive = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : `${blockName}__slide--active`;
          this.block = document.querySelector(`.${blockName}`);
          if (!this.block)
            return false;
          this.slider = this.block.querySelector(`.${slider}`);
          this.sliders = this.slider.querySelectorAll(`.${slide}`);
          this.btnNext = this.block.querySelector(`.${btnNext}`);
          this.btnPrev = this.block.querySelector(`.${btnPrev}`);
          this.slideActive = this.block.querySelector(`.${slideActive}`);
          this.currentSlide = this.sliders[0];
          this.currentShift = 0;
        }
        onActive() {
          let callback = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
          this.btnNext.addEventListener("click", () => {
            const id = this.next();
            if (callback)
              callback(id);
          });
          this.btnPrev.addEventListener("click", () => {
            const id = this.prev();
            if (callback)
              callback(id);
          });
        }
        next() {
          let nextSlide = this.currentSlide.nextElementSibling;
          if (!nextSlide) {
            nextSlide = this.sliders[0];
            this.currentShift = 0;
          } else {
            this.currentShift += this.currentSlide.offsetWidth;
          }
          this.currentSlide = nextSlide;
          this.slider.style.right = `${this.currentShift}px`;
          return this.currentSlide.dataset.id;
        }
        prev() {
          let nextSlide = this.currentSlide.previousElementSibling;
          if (!nextSlide) {
            nextSlide = this.sliders[this.sliders.length - 1];
            this.currentShift = this.currentSlide.offsetWidth * (this.sliders.length - 1);
          } else {
            this.currentShift -= this.currentSlide.offsetWidth;
          }
          this.currentSlide = nextSlide;
          this.slider.style.right = `${this.currentShift}px`;
          return this.currentSlide.dataset.id;
        }
      };
      exports.default = SimpleSlider2;
      var _footer = _interopRequireDefault((init_footer2(), __toCommonJS(footer_exports)));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      console.log("HEADER");
      new _footer.default();
    }
  });

  // entry/home.js
  var import_common = __toESM(require_common());
})();
//# sourceMappingURL=home.js.map
