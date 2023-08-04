(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

  // src/partials/popup/popup.js
  var require_popup = __commonJS({
    "src/partials/popup/popup.js"() {
      console.log("POPUP");
    }
  });

  // src/partials/modal/error.js
  var require_error = __commonJS({
    "src/partials/modal/error.js"() {
      console.log("ERROR");
    }
  });

  // src/common/footer/footer.js
  var SimpleSlider = class {
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

  // src/common/header/header.js
  var import_popup = __toESM(require_popup());
  var import_error = __toESM(require_error());
  console.log("HEADER");
  new SimpleSlider();

  // src/partials/modal/modal.js
  console.log("MODAL");
})();
//# sourceMappingURL=home.js.map
