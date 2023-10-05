/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/catalog.js":
/*!***********************!*\
  !*** ./js/catalog.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCart: () => (/* binding */ addToCart),\n/* harmony export */   fetchCategoryBooks: () => (/* binding */ fetchCategoryBooks),\n/* harmony export */   loadMore: () => (/* binding */ loadMore),\n/* harmony export */   main: () => (/* binding */ main)\n/* harmony export */ });\nconst categories = [\n    {\n        title: \"Architecture\",\n        url: \"subject:Architecture\",\n    },\n\n    {\n        title: \"Art & Fashion\",\n        url: \"subject:Art\",\n    },\n\n    {\n        title: \"Biography\",\n        url: \"subject: Biography & Autobiography\",\n    },\n\n    {\n        title: \"Business\",\n        url: \"subject:Business\",\n    },\n\n    {\n        title: \"Crafts & Hobbies\",\n        url: \"subject:Crafts & Hobbies\",\n    },\n\n    {\n        title: \"Drama\",\n        url: \"subject:Drama\",\n    },\n\n    {\n        title: \"Fiction\",\n        url: \"subject:Fiction\",\n    },\n\n    {\n        title: \"Food & Drink\",\n        url: \"subject:Cooking\",\n    },\n\n    {\n        title: \"Health & Wellbeing\",\n        url: \"subject:Health & Fitness\",\n    },\n\n    {\n        title: \"History & Politics\",\n        url: \"subject:History\",\n    },\n\n    {\n        title: \"Humor\",\n        url: \"subject:Humor\",\n    },\n\n    {\n        title: \"Poetry\",\n        url: \"subject:Poetry\",\n    },\n\n    {\n        title: \"Psychology\",\n        url: \"subject:Psychology\",\n    },\n]\n\nlet activeSubject = null\nlet activeStartIndex = null\nlet activeMaxResults = null\n\nfor(let i=0; i<localStorage.length; i++) {\n    let key = localStorage.key(i);\n    console.log(`${key}: ${localStorage.getItem(key)}`);\n}\n\nconst apiKey = \"AIzaSyAiuUhLVW-vNRMRAudFm1L6HKCpGgNjvXg\"\n\nfunction displayCategories() {\n    const categoriesList = document.querySelector(\".catalog-categories ul\")\n    categories.forEach(function (category, index) {\n        categoriesList.innerHTML += `<li onclick=\"window.fetchCategoryBooks(${index})\">${category.title}</li>`\n    })\n}\n\nfunction renderBook(book) {\n\n    let description = \"\"\n    if (\"description\" in book.volumeInfo) {\n        description = book.volumeInfo.description\n        description = description.substring(0, 80) + \"...\"\n    }\n\n    let rating = ''\n    if (\"ratingsCount\" in book.volumeInfo) {\n        rating = book.volumeInfo.ratingsCount + \" review\"\n    }\n\n    let price = ''\n    if (\"listPrice\" in book.saleInfo) {\n        price = book.saleInfo.listPrice.amount + ' ₽'\n    }\n\n    let bookImage = \"images/book1.png\"\n    if (\"imageLinks\" in book.volumeInfo) {\n        bookImage = book.volumeInfo.imageLinks.thumbnail\n    }\n\n    let authors = \"\"\n    if (\"authors\"in book.volumeInfo) {\n        book.volumeInfo.authors.forEach(function (author, index) {\n            authors = authors + author\n            if (index < book.volumeInfo.authors.length - 1) {\n                authors = authors + \", \"\n            }\n        })\n    }\n\n    let stars = \"\"\n    if (\"averageRating\" in book.volumeInfo) {\n        for (let i = 0; i < 5; i++) {\n            if (i > book.volumeInfo.averageRating) {\n                stars = stars + '<img src=\"images/star_empty.png\">'\n            } else {\n                stars = stars + '<img src=\"images/star.png\">'\n            }\n        }\n    }\n\n    let bookInCart = localStorage.getItem(book.id)\n    let buttonClass = ''\n    let buttonText = ''\n\n\n    if(bookInCart == null){\n        buttonClass = 'button'\n        buttonText = 'buy now'\n    } else {\n        buttonClass = 'button in-cart'\n        buttonText =  'in the cart'\n\n    }\n\n    let bookHtml =\n        `<div class=\"book\">\n                            <div class=\"book-image\">\n                                <img src=\"${bookImage}\">\n                            </div>\n                            <div class=\"book-content\">\n                                <h5 class=\"book-author\">\n                                    ${authors}\n                                </h5>\n                                <h2 class=\"book-title\">\n                                   ${book.volumeInfo.title}\n                                </h2>\n                                <div class=\"book-rating\">\n                                    <div class=\"rating-stars\">\n                                        ${stars}\n                                    </div>\n                                    <span class=\"book-reviews\">${rating}</span>\n                                </div>\n                                <p class=\"book-description\">\n                                    ${description}\n                                </p>\n                                <h3 class=\"book-price\">\n                                    ${price}\n                                </h3>\n                                <a class=\"${buttonClass}\" onclick=\"window.addToCart(this,'${book.id}')\">${buttonText}</a>\n                            </div>\n                        </div>`\n    return bookHtml\n}\n\nfunction fetchBooks(subject, startIndex, maxResults) {\n    let url = `https://www.googleapis.com/books/v1/volumes?q=${subject}&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`\n    console.log(url)\n\n    activeSubject = subject\n    activeStartIndex = startIndex\n    activeMaxResults = maxResults\n\n    fetch(url).then(function (response) {\n        return response.json()\n    }).then(function (data) {\n        const catalogContent = document.querySelector('.catalog-content')\n        console.log(data.items)\n        data.items.forEach(function (book, index){\n            catalogContent.innerHTML = catalogContent.innerHTML + renderBook(book)\n        })\n    })\n\n}\n\nfunction fetchCategoryBooks(index){\n    const categoryList = document.querySelectorAll('.catalog-categories ul li')\n    categoryList.forEach(function (categoryLi){\n        categoryLi.classList.remove(\"active\")\n    })\n    const categoryLi = categoryList[index]\n    categoryLi.classList.add(\"active\")\n\n    const category = categories[index]\n    console.log(category)\n\n    const catalogContent = document.querySelector('.catalog-content')\n    catalogContent.innerHTML = ''\n\n    fetchBooks(category.url, 0, 6)\n}\n\nfunction loadMore (){\n    fetchBooks(activeSubject, activeStartIndex +6, activeMaxResults)\n}\nfunction addToCart(button, bookId){\n    let bookInCart = localStorage.getItem(bookId)\n\n    if(bookInCart == null){\n        localStorage.setItem(bookId, 1)\n        button.innerHTML = 'in the cart'\n        button.classList.add('in-cart')\n    } else {\n        localStorage.removeItem(bookId)\n        button.innerHTML = 'buy now'\n        button.classList.remove('in-cart')\n    }\n}\n\nfunction main(){\n    displayCategories()\n    fetchCategoryBooks(0)\n}\n\n\n//# sourceURL=webpack:///./js/catalog.js?");

/***/ }),

/***/ "./js/slider.js":
/*!**********************!*\
  !*** ./js/slider.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displaySlide: () => (/* binding */ displaySlide),\n/* harmony export */   main: () => (/* binding */ main)\n/* harmony export */ });\nconst slides = [\n    {\n        img:'images/banner_1.png'\n    },\n\n    {\n        img: 'images/banner_2.png'\n    },\n\n    {\n        img: 'images/banner_3.png'\n    },\n]\n\nlet activeSlide = 0\nlet activeTimeOut = null\n\nfunction displayNav() {\n    const navBar = document.querySelector(\".slider-navigation\")\n    console.log(navBar)\n    slides.forEach(function (slide, index){\n        navBar.innerHTML += `<div class=\"dot\" onclick=\"window.displaySlide(${index})\" ></div>`\n    })\n}\n\nfunction displaySlide(index){\n    const slide = slides[index]\n    const slideImage = slide.img\n    const img = document.querySelector('.slider .slider-item')\n    img.src = slideImage\n\n    const dots = document.querySelectorAll('.dot')\n\n    dots.forEach(function (dot){\n        dot.classList.remove(\"active\")\n    })\n\n    const dot = dots[index]\n    dot.classList.add(\"active\")\n    activeSlide = index\n\n    if(activeTimeOut != null){\n        clearTimeout(activeTimeOut)\n    }\n\n    activeTimeOut = setTimeout(nextSlide, 5000)\n\n}\n\nfunction nextSlide(){\n    let nextSlide = activeSlide + 1\n    if (nextSlide > slides.length - 1){\n        displaySlide(0)\n    } else {\n        displaySlide(nextSlide)\n    }\n}\n\nfunction main() {\n    displayNav()\n    displaySlide(0)\n}\n\n\n//# sourceURL=webpack:///./js/slider.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_catalog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/catalog.js */ \"./js/catalog.js\");\n/* harmony import */ var _js_slider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/slider.js */ \"./js/slider.js\");\n\n\n__webpack_require__.e(/*! import() */ \"css_style_css\").then(__webpack_require__.t.bind(__webpack_require__, /*! ./css/style.css */ \"./css/style.css\", 23))\n\n\nwindow.loadMore = _js_catalog_js__WEBPACK_IMPORTED_MODULE_0__.loadMore\nwindow.displaySlide = _js_slider_js__WEBPACK_IMPORTED_MODULE_1__.displaySlide\nwindow.addToCart = _js_catalog_js__WEBPACK_IMPORTED_MODULE_0__.addToCart\nwindow.fetchCategoryBooks = _js_catalog_js__WEBPACK_IMPORTED_MODULE_0__.fetchCategoryBooks\n\n;(0,_js_slider_js__WEBPACK_IMPORTED_MODULE_1__.main)()\n;(0,_js_catalog_js__WEBPACK_IMPORTED_MODULE_0__.main)()\n\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		// data-webpack is not used as build has no uniqueName
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 		
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;