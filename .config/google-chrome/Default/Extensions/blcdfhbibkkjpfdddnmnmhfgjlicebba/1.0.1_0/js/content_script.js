/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 157);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

const querystring = __webpack_require__(8);

var browser;

if (!browser) {
  browser = chrome;
}

var globalWindow;

var checkForWindow = function () {
  // errors get reported that window is undefined on specific sites
  // the glubalWindow variable is just so we can suppress these errors
  try {
    globalWindow = window;
  } catch (e) {
    if (e instanceof ReferenceError) {
      return false;
    }

    return true;
  }

  return true;
};

var secondsToTimeStr = function (sec) {
  var secNum = parseInt(sec, 10);
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor(secNum / 60) % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 1) {
    return `${minutes} minutes`;
  } else {
    return `${minutes} minute`;
  }
};

var formatDate = function (date) {
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let dayName = days[date.getDay()];
  let monthName = months[date.getMonth()];
  let day = date.getDate();
  return `${dayName}, ${monthName} ${day}`.toUpperCase();
};

var createTimerDiv = function (timeSpent, domain) {
  let bookStyles = {
    'color': '#ffffff',
    'backgroundColor': 'grey',
    'opacity': '0.9',
    'position': 'fixed',
    'top': '20px',
    'left': '20px',
    'border': '1px solid #000000',
    'border-radius': '5px',
    'z-index': '99999999999',
    'font-size': '16px',
    'line-height': '20px',
    'font-family': 'sans-serif',
    'text-align': 'center',
    'cursor': 'move',
    'resize': 'both',
    'overflow': 'hidden',
    'user-select': 'none'
  };
  let timeString = secondsToTimeStr(timeSpent);
  let dateString = formatDate(new Date());
  let timerContent = '<div style="box-sizing: border-box; height: 100%; width: 100%; padding: 10px 20px; display: flex; flex-direction: column;">';
  timerContent += `<div style="font-size:14px;">${dateString}</div>`;
  timerContent += `<div style="font-weight:bold;">Time spent on</div>`;
  timerContent += `<div>${domain}</div>`;
  timerContent += `<div style="font-weight:bold; font-size:20px; padding-top: 5px; flex-grow: 1">${timeString}</div>`;
  timerContent += '</div>';
  const closeBtn = `<svg viewport="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" style="
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        font-size: 14px;
        width: 12px;
        font-weight: bold;
        height: 12px;
    ">
        <line x1="1" y1="11" x2="11" y2="1" stroke="white" stroke-width="2"></line>
        <line x1="1" y1="1" x2="11" y2="11" stroke="white" stroke-width="2"></line>
    </svg>`;

  const appendCloseBtn = timerEl => {
    const closeBtnEl = document.createElement('div');
    closeBtnEl.innerHTML = closeBtn;
    closeBtnEl.addEventListener('click', () => {
      timerEl.style.display = 'none';
    });
    timerEl.appendChild(closeBtnEl);
  };

  let timer = document.getElementById('limit-extension-timer-wrapper');

  if (timer) {
    const timerEl = timer.shadowRoot.getElementById('limit-extension-content-timer');
    timerEl.innerHTML = timerContent;
    appendCloseBtn(timerEl);
  } else {
    let wrapper = document.createElement('div');
    wrapper.style.all = 'revert';
    wrapper.id = 'limit-extension-timer-wrapper';
    wrapper.attachShadow({
      mode: 'open'
    });
    let div = document.createElement("div");
    div.innerHTML = timerContent;
    div.id = 'limit-extension-content-timer';

    for (let style in bookStyles) {
      div.style[style] = bookStyles[style];
    }

    appendCloseBtn(div);
    let body = document.getElementsByTagName('body')[0];

    if (body) {
      // append to body if it exists
      // if it does not exist, we will try again in the next call of the function in 1 sec
      wrapper.shadowRoot.appendChild(div);
      body.appendChild(wrapper);

      const makeDraggable = el => {
        let [left, top] = [0, 0];
        let isDragging = false;
        el.addEventListener('mousedown', e => {
          left = e.clientX - el.offsetLeft;
          top = e.clientY - el.offsetTop; // Prevents the resize handle from triggering the drag

          if (e.target !== el) {
            isDragging = true;
          }
        });
        document.addEventListener('mousemove', e => {
          if (isDragging) {
            el.style.left = `${e.clientX - left}px`;
            el.style.top = `${e.clientY - top}px`;
          }
        });
        el.addEventListener('mouseup', () => {
          isDragging = false;
        });
      };

      makeDraggable(div);
    }
  }
};

var removeTimerDiv = function () {
  let timerDiv = document.getElementById('limit-extension-timer-wrapper');

  if (timerDiv) {
    timerDiv.parentNode.removeChild(timerDiv);
  }
};

const checkIfAllowed = () => {
  browser.runtime.sendMessage({
    'subject': 'isUrlAllowed'
  }, function (isUrlAllowed) {
    if (isUrlAllowed == false) {
      if (!checkForWindow()) {
        return;
      } // redirect to green screen


      let qString = querystring.stringify({
        url: window.location.href
      });
      globalWindow.location.replace(browser.runtime.getURL('html/limit.html') + "?" + qString);
    }
  });
};

checkIfAllowed();
browser.runtime.onMessage.addListener(function (msg, sender, response) {
  if (msg.subject === 'setTimer') {
    // setTimer message received (1 per minute)
    createTimerDiv(msg.timeSpent, msg.domain);
  } else if (msg.subject === 'showTimer') {
    // remove timer if the user just disabled it from the settings
    // we are not covering the case of enabling the timer here,
    // because we will receive a setTimer message within 10 seconds
    if (!msg.isShowTimer) {
      removeTimerDiv();
    }
  } else if (msg.subject === 'extensionInactive') {
    // remove timer if the user just disabled the extension
    removeTimerDiv();
  } else if (msg.subject === 'extensionActive') {
    // check if the url after limiter re-activation
    checkIfAllowed();
  }
});
window.addEventListener('DOMContentLoaded', () => {
  browser.runtime.sendMessage({
    subject: 'getTimer'
  });
});

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(9);
exports.encode = exports.stringify = __webpack_require__(10);


/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ })

/******/ });
//# sourceMappingURL=content_script.js.map