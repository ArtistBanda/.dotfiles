var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(c, u, h) {
  if (null == c) {
    throw new TypeError("The 'this' value for String.prototype." + h + " must not be null or undefined");
  }
  if (u instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + h + " must not be a regular expression");
  }
  return c + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, u, h) {
  c != Array.prototype && c != Object.prototype && (c[u] = h.value);
};
$jscomp.getGlobal = function(c) {
  return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(c, u, h, t) {
  if (u) {
    h = $jscomp.global;
    c = c.split(".");
    for (t = 0; t < c.length - 1; t++) {
      var p = c[t];
      p in h || (h[p] = {});
      h = h[p];
    }
    c = c[c.length - 1];
    t = h[c];
    u = u(t);
    u != t && null != u && $jscomp.defineProperty(h, c, {configurable:!0, writable:!0, value:u});
  }
};
$jscomp.polyfill("String.prototype.startsWith", function(c) {
  return c ? c : function(c, h) {
    var u = $jscomp.checkStringArgs(this, c, "startsWith");
    c += "";
    var p = u.length, E = c.length;
    h = Math.max(0, Math.min(h | 0, u.length));
    for (var G = 0; G < E && h < p;) {
      if (u[h++] != c[G++]) {
        return !1;
      }
    }
    return G >= E;
  };
}, "es6", "es3");
$jscomp.polyfill("String.prototype.endsWith", function(c) {
  return c ? c : function(c, h) {
    var u = $jscomp.checkStringArgs(this, c, "endsWith");
    c += "";
    void 0 === h && (h = u.length);
    h = Math.max(0, Math.min(h | 0, u.length));
    for (var p = c.length; 0 < p && 0 < h;) {
      if (u[--h] != c[--p]) {
        return !1;
      }
    }
    return 0 >= p;
  };
}, "es6", "es3");
$jscomp.findInternal = function(c, u, h) {
  c instanceof String && (c = String(c));
  for (var t = c.length, p = 0; p < t; p++) {
    var E = c[p];
    if (u.call(h, E, p, c)) {
      return {i:p, v:E};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.find", function(c) {
  return c ? c : function(c, h) {
    return $jscomp.findInternal(this, c, h).v;
  };
}, "es6", "es3");
(function() {
  var c = window, u = !1;
  String.prototype.hashCode = function() {
    var a = 0, b;
    if (0 === this.length) {
      return a;
    }
    var e = 0;
    for (b = this.length; e < b; e++) {
      var d = this.charCodeAt(e);
      a = (a << 5) - a + d;
      a |= 0;
    }
    return a;
  };
  var h = "optOut_crawl revealStock s_boxOfferListing s_boxType s_boxHorizontal webGraphType webGraphRange overlayPriceGraph".split(" "), t = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), p = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), E = -1 < navigator.userAgent.toLowerCase().indexOf("edge/"), G = /Apple Computer/.test(navigator.vendor) && /Safari/.test(navigator.userAgent), H = !t && !p && !E && !G, O = H ? "keepaChrome" : t ? "keepaOpera" : G ? "keepaSafari" : E ? 
  "keepaEdge" : "keepaFirefox", Y = p ? "Firefox" : G ? "Safari" : H ? "Chrome" : t ? "Opera" : E ? "Edge" : "Unknown", A = null, J = !1;
  try {
    J = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  } catch (a) {
  }
  if (H) {
    try {
      chrome.runtime.sendMessage("hnkcfpcejkafcihlgbojoidoihckciin", {type:"isActive"}, null, function(a) {
        chrome.runtime.lastError || a && a.isActive && (u = !0);
      });
    } catch (a) {
    }
  }
  try {
    chrome.runtime.onUpdateAvailable.addListener(function(a) {
      chrome.runtime.reload();
    });
  } catch (a) {
  }
  var P = {}, Q = 0;
  chrome.runtime.onMessage.addListener(function(a, f, e) {
    if (f.tab && f.tab.url || f.url) {
      switch(a.type) {
        case "restart":
          document.location.reload(!1);
          break;
        case "setCookie":
          chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:a.key, value:a.val, secure:!0, expirationDate:(Date.now() / 1000 | 0) + 31536E3});
          "token" == a.key ? A != a.val && 64 == a.val.length && (A = a.val, b.set("token", A), setTimeout(function() {
            document.location.reload(!1);
          }, 300)) : b.set(a.key, a.val);
          break;
        case "getCookie":
          return chrome.cookies.get({url:"https://keepa.com/extension", name:a.key}, function(a) {
            null == a ? e({value:null}) : e({value:a.value});
          }), !0;
        case "openPage":
          chrome.windows.create({url:a.url, incognito:!0});
          break;
        case "isPro":
          b.stockData ? e({value:b.stockData.pro, stockData:b.stockData}) : e({value:null});
          break;
        case "getStock":
          return b.addStockJob(a, function(d) {
            0 < d.errorCode && a.cachedStock ? e(a.cachedStock) : 5 == d.errorCode || 9 == d.errorCode ? (9 == d.errorCode && (a.getNewId = !0), setTimeout(function() {
              b.addStockJob(a, e);
            }, 1)) : e(d);
          }), !0;
        case "getFilters":
          e({value:x.getFilters()});
          break;
        case "sendData":
          f = a.val;
          if (null != f.ratings) {
            var d = f.ratings;
            if (1000 > Q) {
              if ("f1" == f.key) {
                if (d) {
                  for (var B = d.length; B--;) {
                    var g = d[B];
                    null == g || null == g.asin ? d.splice(B, 1) : (g = f.domainId + g.asin, P[g] ? d.splice(B, 1) : (P[g] = 1, Q++));
                  }
                  0 < d.length && n.sendPlainMessage(f);
                }
              } else {
                n.sendPlainMessage(f);
              }
            } else {
              P = null;
            }
          } else {
            n.sendPlainMessage(f);
          }
          e({});
          break;
        case "optionalPermissionsRequired":
          e({value:(H || p || t) && "undefined" === typeof chrome.webRequest});
          break;
        case "optionalPermissionsDenied":
          b.set("optOut_crawl", "1");
          console.log("optionalPermissionsDenied");
          e({value:!0});
          break;
        case "optionalPermissionsInContent":
          f = a.val;
          "undefined" != typeof f && (f ? (b.set("optOut_crawl", "0"), console.log("granted"), chrome.runtime.reload()) : (b.set("optOut_crawl", "1"), k.reportBug("permission denied"), console.log("denied")));
          e({value:!0});
          break;
        case "optionalPermissions":
          return "undefined" === typeof chrome.webRequest && chrome.permissions.request({permissions:["webRequest", "webRequestBlocking"]}, function(a) {
            chrome.runtime.lastError || (e({value:a}), "undefined" != typeof a && (a ? (b.set("optOut_crawl", "0"), console.log("granted"), chrome.runtime.reload()) : (b.set("optOut_crawl", "1"), k.reportBug("permission denied"), console.log("denied"))));
          }), !0;
        default:
          e({});
      }
    }
  });
  window.onload = function() {
    p ? chrome.storage.local.get(["install", "optOutCookies"], function(a) {
      a.optOutCookies && 3456E5 > Date.now() - a.optOutCookies || (a.install ? k.register() : chrome.tabs.create({url:chrome.runtime.getURL("chrome/content/onboard.html")}));
    }) : k.register();
  };
  try {
    chrome.browserAction.onClicked.addListener(function(a) {
      b.isGuest ? chrome.tabs.create({url:b.actionUrl}) : chrome.tabs.create({url:"https://keepa.com/#!manage"});
    });
  } catch (a) {
    console.log(a);
  }
  var b = {storage:chrome.storage.local, contextMenu:function() {
    try {
      chrome.contextMenus.removeAll(), chrome.contextMenus.create({title:"View products on Keepa", contexts:["page"], id:"keepaContext", documentUrlPatterns:"*://*.amazon.com/* *://*.amzn.com/* *://*.amazon.co.uk/* *://*.amazon.de/* *://*.amazon.fr/* *://*.amazon.it/* *://*.amazon.ca/* *://*.amazon.com.mx/* *://*.amazon.es/* *://*.amazon.co.jp/* *://*.amazon.in/*".split(" ")}), chrome.contextMenus.onClicked.addListener(function(a, b) {
        chrome.tabs.sendMessage(b.id, {key:"collectASINs"}, {}, function(a) {
          "undefined" != typeof a && chrome.tabs.create({url:"https://keepa.com/#!viewer/" + encodeURIComponent(JSON.stringify(a))});
        });
      });
    } catch (a) {
      console.log(a);
    }
  }, parseCookieHeader:function(a, b) {
    if (0 < b.indexOf("\n")) {
      b = b.split("\n");
      var e = 0;
      a: for (; e < b.length; ++e) {
        var d = b[e].substring(0, b[e].indexOf(";")), B = d.indexOf("=");
        d = [d.substring(0, B), d.substring(B + 1)];
        if (2 == d.length && "-" != d[1]) {
          for (B = 0; B < a.length; ++B) {
            if (a[B][0] == d[0]) {
              a[B][1] = d[1];
              continue a;
            }
          }
          a.push(d);
        }
      }
    } else {
      if (b = b.substring(0, b.indexOf(";")), e = b.indexOf("="), b = [b.substring(0, e), b.substring(e + 1)], 2 == b.length && "-" != b[1]) {
        for (e = 0; e < a.length; ++e) {
          if (a[e][0] == b[0]) {
            a[e][1] = b[1];
            return;
          }
        }
        a.push(b);
      }
    }
  }, log:function(a) {
    k.quiet || console.log(a);
  }, iframeWin:null, operationComplete:!1, counter:0, stockInit:!1, stockRequest:[], initStock:function() {
    if (!b.stockInit && "undefined" != typeof chrome.webRequest) {
      var a = ["xmlhttprequest"], f = "*://www.amazon.com/* *://www.amazon.co.uk/* *://www.amazon.es/* *://www.amazon.nl/* *://www.amazon.com.mx/* *://www.amazon.it/* *://www.amazon.in/* *://www.amazon.de/* *://www.amazon.fr/* *://www.amazon.co.jp/* *://www.amazon.ca/* *://www.amazon.com.br/* *://www.amazon.com.au/* *://www.amazon.com.mx/* *://smile.amazon.com/* *://smile.amazon.co.uk/* *://smile.amazon.es/* *://smile.amazon.nl/* *://smile.amazon.com.mx/* *://smile.amazon.it/* *://smile.amazon.in/* *://smile.amazon.de/* *://smile.amazon.fr/* *://smile.amazon.co.jp/* *://smile.amazon.ca/* *://smile.amazon.com.br/* *://smile.amazon.com.au/* *://smile.amazon.com.mx/*".split(" ");
      try {
        var e = [b.stockData.addCartHeaders, b.stockData.geoHeaders, b.stockData.setAddressHeaders, b.stockData.addressChangeHeaders, b.stockData.productPageHeaders, b.stockData.toasterHeaders];
        chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          var d = a.requestHeaders, g = {};
          try {
            for (var w = null, f = 0; f < d.length; ++f) {
              if ("krequestid" == d[f].name) {
                w = d[f].value;
                d.splice(f--, 1);
                break;
              }
            }
            if (w) {
              var c = b.stockRequest[w];
              b.stockRequest[a.requestId] = c;
              setTimeout(function() {
                delete b.stockRequest[a.requestId];
              }, 30000);
              var k = e[c.requestType];
              for (w = 0; w < d.length; ++w) {
                var h = d[w].name.toLowerCase();
                (k[h] || "" === k[h] || k[d[w].name] || "cookie" == h || "content-type" == h || "sec-fetch-dest" == h || "sec-fetch-mode" == h || "sec-fetch-user" == h || "accept" == h || "referer" == h) && d.splice(w--, 1);
              }
              if (0 == c.requestType && 19 > c.stockSession.length) {
                return g.cancel = !0, g;
              }
              var m = b.stockData.isMobile ? "https://" + c.host + "/gp/aw/d/" + c.asin + "/" : c.referer, u;
              for (u in k) {
                var p = k[u];
                if (0 != p.length) {
                  p = p.replace("{COOKIE}", c.stockSession).replace("{REFERER}", m).replace("{ORIGIN}", c.host);
                  if (-1 < p.indexOf("{CSRF}")) {
                    if (c.csrf) {
                      p = p.replace("{CSRF}", c.csrf), c.csrf = null;
                    } else {
                      continue;
                    }
                  }
                  d.push({name:u, value:p});
                }
              }
              for (k = 0; k < d.length; ++k) {
                var n = d[k].name.toLowerCase();
                (b.stockData.stockHeaders[n] || "" === b.stockData.stockHeaders[n] || b.stockData.stockHeaders[d[k].name] || "origin" == n || "pragma" == n || "cache-control" == n || "upgrade-insecure-requests" == n) && d.splice(k--, 1);
              }
              for (var x in b.stockData.stockHeaders) {
                var t = b.stockData.stockHeaders[x];
                0 != t.length && (t = t.replace("{COOKIE}", c.stockSession).replace("{REFERER}", m).replace("{ORIGIN}", c.host).replace("{LANG}", b.stockData.languageCode[c.domainId]), d.push({name:x, value:t}));
              }
              g.requestHeaders = d;
              a.requestHeaders = d;
            } else {
              return g;
            }
          } catch (K) {
            g.cancel = !0;
          }
          return g;
        }, {urls:f, types:a}, H ? ["blocking", "requestHeaders", "extraHeaders"] : ["blocking", "requestHeaders"]);
        chrome.webRequest.onHeadersReceived.addListener(function(a) {
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          var d = a.responseHeaders, e = {};
          try {
            var f = b.stockRequest[a.requestId];
            if (f) {
              var c = f.cookies || [];
              for (a = 0; a < d.length; ++a) {
                "set-cookie" == d[a].name.toLowerCase() && (b.parseCookieHeader(c, d[a].value), d.splice(a, 1), a--);
              }
              f.cookies = c;
              switch(f.requestType) {
                case 0:
                case 1:
                case 2:
                case 4:
                case 5:
                  e.responseHeaders = d;
                  break;
                case 3:
                  e.cancel = !0, setTimeout(function() {
                    f.cookies = c;
                    b.stockSessions[f.domainId + f.asin] = c;
                    f.callback();
                  }, 10);
              }
              if (0 != f.requestType) {
                d = "";
                for (a = 0; a < f.cookies.length; ++a) {
                  var k = f.cookies[a];
                  d += k[0] + "=" + k[1] + "; ";
                  "session-id" == k[0] && 16 < k[1].length && 65 > k[1].length && k[1] != f.session && (f.sessionIdMismatch = !0);
                }
                f.stockSession = d;
              }
            } else {
              return e;
            }
          } catch (aa) {
            e.cancel = !0;
          }
          return e;
        }, {urls:f, types:a}, H ? ["blocking", "responseHeaders", "extraHeaders"] : ["blocking", "responseHeaders"]);
        b.stockInit = !0;
      } catch (d) {
        k.reportBug(d, d.message + " stock exception: " + typeof chrome.webRequest + " " + ("undefined" != typeof chrome.webRequest ? typeof chrome.webRequest.onBeforeSendHeaders : "~") + " " + ("undefined" != typeof chrome.webRequest ? typeof chrome.webRequest.onHeadersReceived : "#"));
      }
    }
  }, stockData:null, isGuest:!0, actionUrl:"https://keepa.com/#!features", stockJobQueue:[], stockSessions:[], addStockJob:function(a, f) {
    a.gid = k.Guid.newGuid().substr(0, 8);
    a.requestType = -1;
    b.stockRequest[a.gid] = a;
    var e = function(a) {
      b.stockJobQueue.shift();
      f(a);
      0 < b.stockJobQueue.length && b.processStockJob(b.stockJobQueue[0][0], b.stockJobQueue[0][1]);
    };
    b.stockJobQueue.push([a, e]);
    1 == b.stockJobQueue.length && b.processStockJob(a, e);
  }, processStockJob:function(a, f) {
    if (null == b.stockData.stock) {
      console.log("stock retrieval not initialized"), f({error:"stock retrieval not initialized", errorCode:0});
    } else {
      if (0 == b.stockData.stockEnabled[a.domainId]) {
        console.log("stock retrieval not supported for domain"), f({error:"stock retrieval not supported for domain", errorCode:1});
      } else {
        if (!0 === b.stockData.pro || a.force) {
          if (!a.isMAP && a.maxQty && b.stockData.stockMaxQty && a.maxQty < b.stockData.stockMaxQty) {
            f({stock:a.maxQty, limit:!1});
          } else {
            if (null == a.oid) {
              console.log("missing oid", a), f({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " missing oid.", errorCode:12});
            } else {
              if (a.onlyMaxQty && !a.isMAP) {
                f();
              } else {
                if (b.initStock(), b.stockInit) {
                  if (setTimeout(function() {
                    delete b.stockRequest[a.gid];
                    delete b.stockSessions[a.domainId + a.asin];
                  }, 3E5), a.queue = [function() {
                    for (var d = "", e = !1, g = !1, c = 0, h = 0; h < a.cookies.length; ++h) {
                      var p = a.cookies[h];
                      d += p[0] + "=" + p[1] + "; ";
                      "session-id" == p[0] && 16 < p[1].length && 65 > p[1].length && (e = !0, p[1] != a.session && (g = !0, c = p[1]));
                    }
                    a.cookie = d;
                    e && g ? (a.stockSession = d, d = b.stockData.addCartUrl, e = b.stockData.addCartPOST, a.requestType = 0, k.httpPost("https://" + a.host + d.replaceAll("{SESSION_ID}", c).replaceAll("{OFFER_ID}", a.oid).replaceAll("{ADDCART}", b.stockData.stockAdd[a.domainId]).replaceAll("{ASIN}", a.asin), e.replaceAll("{SESSION_ID}", c).replaceAll("{OFFER_ID}", a.oid).replaceAll("{ADDCART}", b.stockData.stockAdd[a.domainId]).replaceAll("{ASIN}", a.asin), function(d) {
                      var e = decodeURIComponent(a.oid).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), g = d.match(new RegExp(b.stockData.stock)), c = d.match(new RegExp(b.stockData.stockAlt)), B = d.match(new RegExp(b.stockData.stockAlt2.replaceAll("{ESCAPED_OID}", e))), w = d.match(new RegExp(b.stockData.price)), k = d.match(new RegExp(b.stockData.priceSingle.replaceAll("{ESCAPED_OID}", e)));
                      e = (new RegExp(b.stockData.limit)).test(d);
                      null == g && (g = B);
                      if (g && g[1]) {
                        d = parseInt(g[1]), g = -1, c && c[1] && (g = parseInt(c[1])), B && B[1] && (g = parseInt(B[1])), c = -1, k && 1 < k.length ? (k[1].lastIndexOf(".") == k[1].length - 2 && (k[1] += "0"), c = parseInt(k[1].replace(/[\D]/g, ""))) : w && (c = parseInt(w[1].replace(/[\D]/g, "")) / d), w = -1, 0 < g && 100 > g && d > g && (e = !0, w = g), w = {stock:Math.max(d, g), orderLimit:w, limit:e, price:c}, console.log(w), f(w);
                      } else {
                        if ((w = d.match(/automated access|api-services-support@/)) || a.isRetry) {
                          delete b.stockSessions[a.domainId + a.asin], a.cookie = null, a.stockSession = null, a.cookies = null;
                        }
                        w ? (f({error:"Amazon stock retrieval rate limited (bot detection) of offer: " + a.asin + " id: " + a.gid + " offer: " + a.oid, errorCode:5}), console.log("stock retrieval rate limited for offer: ", a.asin + " " + a.oid + " id: " + a.gid, d.length)) : f({error:"Stock retrieval failed for this offer. Try reloading the page after a while. ", errorCode:9});
                      }
                    }, !1, a.gid)) : (k.reportBug(null, "stock session issue: " + e + " " + g + " counter: " + b.counter + " c: " + JSON.stringify(a.cookies) + " " + JSON.stringify(a)), f({error:"stock session issue: " + e + " " + g, errorCode:4}));
                  }], a.getNewId && (b.stockData.geoRetry && delete b.stockSessions[a.domainId + a.asin], a.queue.unshift(function() {
                    a.requestType = 4;
                    k.httpGet("https://" + b.stockData.offerUrl.replace("{ORIGIN}", a.host).replace("{ASIN}", a.asin).replace("{SID}", a.sellerId), function(d) {
                      if (d.match(b.stockData.sellerIdBBVerify.replace("{SID}", a.sellerId))) {
                        for (var e = null, g = 0; g < b.stockData.csrfBB.length; g++) {
                          var c = d.match(new RegExp(b.stockData.csrfBB[g]));
                          if (null != c && c[1]) {
                            e = c[1];
                            break;
                          }
                        }
                        if (e) {
                          a.csrf = e[1];
                          e = null;
                          for (g = 0; g < b.stockData.offerIdBB.length; g++) {
                            if (c = d.match(new RegExp(b.stockData.offerIdBB[g])), null != c && c[1]) {
                              e = c[1];
                              break;
                            }
                          }
                          e && (a.oid = e, a.callback());
                        }
                      } else {
                        f({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " mismatch oid.", errorCode:10});
                      }
                    }, !1, a.gid);
                  })), a.callback = function() {
                    return a.queue.shift()();
                  }, b.stockSessions[a.domainId + a.asin]) {
                    a.cookies = b.stockSessions[a.domainId + a.asin], a.callback();
                  } else {
                    var e = b.stockData.zipCodes[a.domainId];
                    b.stockData.domainId == a.domainId ? (a.requestType = 3, k.httpPost("https://" + a.host + b.stockData.addressChangeUrl, b.stockData.addressChangePOST.replace("{ZIPCODE}", e), null, !1, a.gid)) : (a.requestType = 1, k.httpGet("https://" + a.host + b.stockData.geoUrl, function(d) {
                      d = d.match(new RegExp(b.stockData.csrfGeo));
                      null != d ? (a.csrf = d[1], a.requestType = 5, k.httpGet("https://" + a.host + b.stockData.toasterUrl.replace("{TIME_MS}", Date.now()), function(d) {
                        a.requestType = 2;
                        k.httpGet("https://" + a.host + b.stockData.setAddressUrl, function(d) {
                          d = d.match(new RegExp(b.stockData.csrfSetAddress));
                          null != d && (a.csrf = d[1]);
                          a.requestType = 3;
                          k.httpPost("https://" + a.host + b.stockData.addressChangeUrl, b.stockData.addressChangePOST.replace("{ZIPCODE}", e), null, !1, a.gid);
                        }, !1, a.gid);
                      }, !1, a.gid)) : f({error:"stock retrieval failed for offer: " + a.asin + " id: " + a.gid + " main.", errorCode:7});
                    }, !1, a.gid));
                  }
                } else {
                  console.log("could not init stock retrieval", b.stockInit, typeof chrome.webRequest), f({error:"could not init stock retrieval", errorCode:"undefined" != typeof chrome.webRequest ? 3 : 33});
                }
              }
            }
          }
        } else {
          console.log("stock retrieval not pro"), f({error:"stock retrieval failed, not subscribed", errorCode:2});
        }
      }
    }
  }, set:function(a, c, e) {
    var d = {};
    d[a] = c;
    b.storage.set(d, e);
  }, remove:function(a, c) {
    b.storage.remove(a, c);
  }, get:function(a, c) {
    "function" != typeof c && (c = function() {
    });
    b.storage.get(a, function(a) {
      c(a);
    });
  }};
  b.contextMenu();
  var k = {quiet:!0, version:chrome.runtime.getManifest().version, browser:1, url:"https://keepa.com", testUrl:"https://test.keepa.com", getDomain:function(a) {
    switch(a) {
      case "com":
        return 1;
      case "co.uk":
        return 2;
      case "de":
        return 3;
      case "fr":
        return 4;
      case "co.jp":
        return 5;
      case "ca":
        return 6;
      case "it":
        return 8;
      case "es":
        return 9;
      case "in":
        return 10;
      case "com.mx":
        return 11;
      case "com.br":
        return 12;
      case "com.au":
        return 13;
      case "nl":
        return 14;
      default:
        return 1;
    }
  }, objectStorage:[], Guid:function() {
    var a = function(b, d, c) {
      return b.length >= d ? b : a(c + b, d, c || " ");
    }, b = function() {
      var a = (new Date).getTime();
      return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/x/g, function(b) {
        var d = (a + 16 * Math.random()) % 16 | 0;
        a = Math.floor(a / 16);
        return ("x" === b ? d : d & 7 | 8).toString(16);
      });
    };
    return {newGuid:function() {
      var e = "undefined" != typeof window.crypto.getRandomValues;
      if ("undefined" != typeof window.crypto && e) {
        e = new window.Uint16Array(16);
        window.crypto.getRandomValues(e);
        var d = "";
        for (g in e) {
          var c = e[g].toString(16);
          c = a(c, 4, "0");
          d += c;
        }
        var g = d;
      } else {
        g = b();
      }
      return g;
    }};
  }(), register:function() {
    chrome.cookies.onChanged.addListener(function(a) {
      a.removed || null == a.cookie || "keepa.com" != a.cookie.domain || "/extension" != a.cookie.path || ("token" == a.cookie.name ? A != a.cookie.value && 64 == a.cookie.value.length && (A = a.cookie.value, b.set("token", A), setTimeout(function() {
        document.location.reload(!1);
      }, 300)) : b.set(a.cookie.name, a.cookie.value));
    });
    var a = !1, c = function(e) {
      for (var d = {}, c = 0; c < e.length; d = {$jscomp$loop$prop$name$70:d.$jscomp$loop$prop$name$70}, c++) {
        d.$jscomp$loop$prop$name$70 = e[c];
        try {
          chrome.cookies.get({url:"https://keepa.com/extension", name:d.$jscomp$loop$prop$name$70}, function(d) {
            return function(c) {
              chrome.runtime.lastError && -1 < chrome.runtime.lastError.message.indexOf("No host permission") ? a || (a = !0, k.reportBug("extensionPermission restricted ### " + chrome.runtime.lastError.message)) : null != c && null != c.value && 0 < c.value.length && b.set(d.$jscomp$loop$prop$name$70, c.value);
            };
          }(d));
        } catch (g) {
          console.log(g);
        }
      }
    };
    c(h);
    chrome.cookies.get({url:"https://keepa.com/extension", name:"token"}, function(a) {
      if (null != a && 64 == a.value.length) {
        A = a.value, b.set("token", A);
      } else {
        var d = (Date.now() / 1000 | 0) + 31536E3;
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"optOut_crawl", value:"0", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"revealStock", value:"1", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxType", value:"0", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxOfferListing", value:"1", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"s_boxHorizontal", value:"0", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"webGraphType", value:"[1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"webGraphRange", value:"180", secure:!0, expirationDate:d});
        chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"overlayPriceGraph", value:"0", secure:!0, expirationDate:d});
        c(h);
        b.get("token", function(a) {
          A = (a = a.token) && 64 == a.length ? a : k.Guid.newGuid();
          chrome.cookies.set({url:"https://keepa.com", path:"/extension", name:"token", value:A, secure:!0, expirationDate:d});
        });
      }
    });
    try {
      "undefined" != typeof chrome.storage.sync && chrome.storage.sync.clear();
    } catch (e) {
    }
    window.addEventListener("message", function(a) {
      var b = a.data;
      if (b) {
        if ("string" === typeof b) {
          try {
            b = JSON.parse(b);
          } catch (w) {
            return;
          }
        }
        if (b.log) {
          console.log(b.log);
        } else {
          var c = function() {
          };
          if (a.origin != k.url && a.origin != k.testUrl) {
            var e = x.getMessage();
            if (null != e && ("function" == typeof e.onDoneC && (c = e.onDoneC, delete e.onDoneC), "undefined" == typeof e.sent && b.sandbox && a.source == document.getElementById("keepa_data").contentWindow)) {
              if (b.sandbox == e.url) {
                x.setStatTime(40);
                try {
                  a.source.postMessage({key:"data", value:e}, "*");
                } catch (w) {
                  x.abortJob(407), c();
                }
              } else {
                b.isUrlMsg ? (e.wasUrl = b.sandbox, x.abortJob(405)) : (a = x.getOutgoingMessage(e, b.sandbox), n.sendMessage(a)), c();
              }
            }
          }
        }
      }
    });
    p ? b.set("addonVersionFirefox", k.version) : b.set("addonVersionChrome", k.version);
    try {
      chrome.runtime.setUninstallURL("https://dyn.keepa.com/app/stats/?type=uninstall&version=" + O + "." + k.version);
    } catch (e) {
    }
    window.setTimeout(function() {
      n.initWebSocket();
    }, 2000);
  }, log:function(a) {
    b.log(a);
  }, lastBugReport:0, reportBug:function(a, c, e) {
    var d = Error();
    b.get(["token"], function(b) {
      var g = Date.now();
      if (!(12E5 > g - k.lastBugReport || /(dead object)|(Script error)|(setUninstallURL)|(File error: Corrupted)|(operation is insecure)|(\.location is null)/i.test(a))) {
        k.lastBugReport = g;
        g = "";
        var f = k.version;
        c = c || "";
        try {
          if (g = d.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;"), !/(keepa|content)\.js/.test(g) || g.startsWith("https://www.amazon") || g.startsWith("https://smile.amazon") || g.startsWith("https://sellercentral")) {
            return;
          }
        } catch (U) {
        }
        try {
          g = g.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        } catch (U) {
        }
        if ("object" == typeof a) {
          try {
            a = a instanceof Error ? a.toString() : JSON.stringify(a);
          } catch (U) {
          }
        }
        null == e && (e = {exception:a, additional:c, url:document.location.host, stack:g});
        e.keepaType = O;
        e.version = f;
        setTimeout(function() {
          k.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + b.token + "&type=" + Y + "&version=" + f, JSON.stringify(e), null, !1);
        }, 50);
      }
    });
  }, httpGet:function(a, b, c, d) {
    var e = new XMLHttpRequest;
    b && (e.onreadystatechange = function() {
      4 == e.readyState && b.call(this, e.responseText);
    });
    e.withCredentials = c;
    e.open("GET", a, !0);
    d && e.setRequestHeader("krequestid", d);
    e.send();
  }, httpPost:function(a, b, c, d, k) {
    var e = new XMLHttpRequest;
    c && (e.onreadystatechange = function() {
      4 == e.readyState && c.call(this, e.responseText);
    });
    e.withCredentials = d;
    e.open("POST", a, !0);
    e.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    k && e.setRequestHeader("krequestid", k);
    e.send(b);
  }};
  window.addEventListener("error", function(a, b, c, d, h) {
    a = "object" === typeof a && a.srcElement && a.target ? "[object HTMLScriptElement]" == a.srcElement && "[object HTMLScriptElement]" == a.target ? "Error loading script " + JSON.stringify(a) : JSON.stringify(a) : a.toString();
    var e = "";
    d = d || 0;
    if (h && h.stack) {
      e = h.stack;
      try {
        e = h.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        if (!/(keepa|content)\.js/.test(e)) {
          return;
        }
        e = e.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (w) {
      }
    }
    a = {msg:a, url:(b || document.location.toString()) + ":" + parseInt(c || 0) + ":" + parseInt(d || 0), stack:e};
    "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && "blfpbjkajgamcehdbehfdioapoiibdmc" != chrome.runtime.id || console.log(a);
    k.reportBug(null, null, a);
    return !1;
  });
  var X = 0;
  var n = {server:["wss://dyn.keepa.com", "wss://dyn-2.keepa.com"], serverIndex:0, clearTimeout:0, webSocket:null, sendPlainMessage:function(a) {
    J || (a = JSON.stringify(a), n.webSocket.send(pako.deflate(a)));
  }, sendMessage:function(a) {
    if (!J) {
      x.clearIframe();
      var b = pako.deflate(JSON.stringify(a));
      x.clearMessage();
      1 == n.webSocket.readyState && n.webSocket.send(b);
      403 == a.status && x.endSession(X);
      c.console.clear();
    }
  }, initWebSocket:function() {
    J || b.get(["token", "optOut_crawl"], function(a) {
      var c = a.token, e = a.optOut_crawl;
      if (c && 64 == c.length) {
        var d = function() {
          if (null == n.webSocket || 1 != n.webSocket.readyState) {
            n.serverIndex %= n.server.length;
            if ("undefined" == typeof e || "undefined" == e || null == e || "null" == e) {
              e = "0";
            }
            u && (e = "1");
            "undefined" === typeof chrome.webRequest && (e = "1");
            var a = new WebSocket(n.server[n.serverIndex] + "/apps/cloud/?app=" + O + "&version=" + k.version + "&wr=" + typeof chrome.webRequest + "&optOut=" + e, c);
            a.binaryType = "arraybuffer";
            a.onmessage = function(a) {
              a = a.data;
              var c = null;
              a instanceof ArrayBuffer && (a = pako.inflate(a, {to:"string"}));
              try {
                c = JSON.parse(a);
              } catch (U) {
                k.reportBug(U, a);
                return;
              }
              108 == c.status ? 1 === c.guest ? (b.isGuest = !0, b.actionUrl = c.actionUrl) : b.isGuest = !1 : "" == c.key ? b.stockData.domainId = c.domainId : 108108 == c.timeout ? (c.stockData && (b.stockData = c.stockData, console.log("stock reveal ready")), "undefined" != typeof c.keepaBoxPlaceholder && b.set("keepaBoxPlaceholder", c.keepaBoxPlaceholder), "undefined" != typeof c.keepaBoxPlaceholderBackup && b.set("keepaBoxPlaceholderBackup", c.keepaBoxPlaceholderBackup), "undefined" != typeof c.keepaBoxPlaceholderBackupClass && 
              b.set("keepaBoxPlaceholderBackupClass", c.keepaBoxPlaceholderBackupClass), "undefined" != typeof c.keepaBoxPlaceholderAppend && b.set("keepaBoxPlaceholderAppend", c.keepaBoxPlaceholderAppend), "undefined" != typeof c.keepaBoxPlaceholderBackupAppend && b.set("keepaBoxPlaceholderBackupAppend", c.keepaBoxPlaceholderBackupAppend)) : (c.domainId && (X = c.domainId), x.clearIframe(), x.onMessage(c));
            };
            a.onclose = function(a) {
              setTimeout(function() {
                d();
              }, 36E4 * Math.random());
            };
            a.onerror = function(b) {
              n.serverIndex++;
              a.close();
            };
            a.onopen = function() {
              x.abortJob(414);
            };
            n.webSocket = a;
          }
        };
        d();
      }
    });
  }};
  var x = function() {
    function a(a) {
      try {
        m.stats.times.push(a), m.stats.times.push(Date.now() - m.stats.start);
      } catch (v) {
      }
    }
    function f(b, c) {
      b.sent = !0;
      a(25);
      var d = b.key, e = b.messageId;
      b = b.stats;
      try {
        var y = C[F]["session-id"];
      } catch (l) {
        y = "";
      }
      d = {key:d, messageId:e, stats:b, sessionId:y, payload:[], status:200};
      for (var v in c) {
        d[v] = c[v];
      }
      return d;
    }
    function e(b) {
      F = m.domainId;
      R = t(C);
      "object" != typeof C[F] && (C[F] = {});
      "undefined" == typeof m.headers.Accept && (m.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
      h(b, !b.isAjax, function(c) {
        a(0);
        var d = {payload:[]};
        if (c.match(H)) {
          d.status = 403;
        } else {
          if (b.contentFilters && 0 < b.contentFilters.length) {
            for (var e in b.contentFilters) {
              var y = c.match(new RegExp(b.contentFilters[e]));
              if (y) {
                d.payload[e] = y[1].replace(/\n/g, "");
              } else {
                d.status = 305;
                d.payload[e] = c;
                break;
              }
            }
          } else {
            d.payload = [c];
          }
        }
        try {
          b.stats.times.push(3), b.stats.times.push(k.lastBugReport);
        } catch (r) {
        }
        "undefined" == typeof b.sent && (d = f(b, d), n.sendMessage(d));
      });
    }
    function d(c) {
      F = m.domainId;
      R = t(C);
      "object" != typeof C[F] && (C[F] = {});
      "undefined" == typeof m.headers.Accept && (m.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
      a(4);
      var d = new URL(c.url), e = null;
      try {
        null != c.scrapeFilters && 0 < c.scrapeFilters.length && c.scrapeFilters[0].lager && chrome.cookies.get({url:d.origin, name:"session-id"}, function(a) {
          null == a ? e = "guest" : null != a.value && 5 < a.value.length && (e = a.value);
        });
      } catch (q) {
      }
      h(c, !c.isAjax, function(v, y) {
        a(6);
        if ("undefined" == typeof c.sent) {
          var g = {};
          try {
            for (var l = v.evaluate("//comment()", v, null, XPathResult.ANY_TYPE, null), h = l.iterateNext(), m = ""; h;) {
              m += h.textContent, h = l.iterateNext();
            }
            if (v.querySelector("body").textContent.match(H) || m.match(H)) {
              g.status = 403;
              if ("undefined" != typeof c.sent) {
                return;
              }
              g = f(c, g);
              n.sendMessage(g);
              return;
            }
          } catch (I) {
          }
          a(7);
          if (c.scrapeFilters && 0 < c.scrapeFilters.length) {
            var p = {}, D = {}, L = {}, q = "", t = null, w = function() {
              if ("" === q) {
                g.payload = [t];
                g.scrapedData = L;
                for (var a in D) {
                  g[a] = D[a];
                }
              } else {
                g.status = 305, g.payload = [t, q, ""];
              }
              try {
                c.stats.times.push(99), c.stats.times.push(k.lastBugReport);
              } catch (ca) {
              }
              "undefined" == typeof c.sent && (g = f(c, g), n.sendMessage(g));
            }, x = function(a, c, b) {
              var d = [];
              if (!a.selector) {
                if (!a.regExp) {
                  return q = "invalid selector, sel/regexp", !1;
                }
                d = v.querySelector("html").innerHTML.match(new RegExp(a.regExp));
                if (!d || d.length < a.reGroup) {
                  b = "regexp fail: html - " + a.name + b;
                  if (!1 === a.optional) {
                    return q = b, !1;
                  }
                  t += " // " + b;
                  return !0;
                }
                return d[a.reGroup];
              }
              var e = c.querySelectorAll(a.selector);
              0 == e.length && (e = c.querySelectorAll(a.altSelector));
              if (0 == e.length) {
                if (!0 === a.optional) {
                  return !0;
                }
                q = "selector no match: " + a.name + b;
                return !1;
              }
              if (a.parentSelector && (e = [e[0].parentNode.querySelector(a.parentSelector)], null == e[0])) {
                if (!0 === a.optional) {
                  return !0;
                }
                q = "parent selector no match: " + a.name + b;
                return !1;
              }
              if ("undefined" != typeof a.multiple && null != a.multiple && (!0 === a.multiple && 1 > e.length || !1 === a.multiple && 1 < e.length)) {
                b = "selector multiple mismatch: " + a.name + b + " found: " + e.length;
                if (!1 === a.optional) {
                  return q = b, !1;
                }
                t += " // " + b;
                return !0;
              }
              if (a.isListSelector) {
                return p[a.name] = e, !0;
              }
              if (!a.attribute) {
                return q = "selector attribute undefined?: " + a.name + b, !1;
              }
              for (var y in e) {
                if (e.hasOwnProperty(y)) {
                  c = e[y];
                  if (!c) {
                    break;
                  }
                  if (a.childNode) {
                    a.childNode = Number(a.childNode);
                    c = c.childNodes;
                    if (c.length < a.childNode) {
                      b = "childNodes fail: " + c.length + " - " + a.name + b;
                      if (!1 === a.optional) {
                        return q = b, !1;
                      }
                      t += " // " + b;
                      return !0;
                    }
                    c = c[a.childNode];
                  }
                  c = "text" == a.attribute ? c.textContent : "html" == a.attribute ? c.innerHTML : c.getAttribute(a.attribute);
                  if (!c || 0 == c.length || 0 == c.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                    b = "selector attribute null: " + a.name + b;
                    if (!1 === a.optional) {
                      return q = b, !1;
                    }
                    t += " // " + b;
                    return !0;
                  }
                  if (a.regExp) {
                    var g = c.match(new RegExp(a.regExp));
                    if (!g || g.length < a.reGroup) {
                      b = "regexp fail: " + c + " - " + a.name + b;
                      if (!1 === a.optional) {
                        return q = b, !1;
                      }
                      t += " // " + b;
                      return !0;
                    }
                    d.push("undefined" == typeof g[a.reGroup] ? g[0] : g[a.reGroup]);
                  } else {
                    d.push(c);
                  }
                  if (!a.multiple) {
                    break;
                  }
                }
              }
              return a.multiple ? d : d[0];
            };
            h = !1;
            l = {};
            for (var B in c.scrapeFilters) {
              l.$jscomp$loop$prop$pageType$75 = B;
              a: {
                if (h) {
                  break;
                }
                l.$jscomp$loop$prop$pageFilter$72 = c.scrapeFilters[l.$jscomp$loop$prop$pageType$75];
                l.$jscomp$loop$prop$pageVersionTest$73 = l.$jscomp$loop$prop$pageFilter$72.pageVersionTest;
                m = v.querySelectorAll(l.$jscomp$loop$prop$pageVersionTest$73.selector);
                0 == m.length && (m = v.querySelectorAll(l.$jscomp$loop$prop$pageVersionTest$73.altSelector));
                if (0 != m.length) {
                  if ("undefined" != typeof l.$jscomp$loop$prop$pageVersionTest$73.multiple && null != l.$jscomp$loop$prop$pageVersionTest$73.multiple) {
                    if (!0 === l.$jscomp$loop$prop$pageVersionTest$73.multiple && 2 > m.length) {
                      break a;
                    }
                    if (!1 === l.$jscomp$loop$prop$pageVersionTest$73.multiple && 1 < m.length) {
                      break a;
                    }
                  }
                  if (l.$jscomp$loop$prop$pageVersionTest$73.attribute) {
                    var C = null;
                    C = "text" == l.$jscomp$loop$prop$pageVersionTest$73.attribute ? "" : m[0].getAttribute(l.$jscomp$loop$prop$pageVersionTest$73.attribute);
                    if (null == C) {
                      break a;
                    }
                  }
                  var A = l.$jscomp$loop$prop$pageType$75;
                  l.$jscomp$loop$prop$revealMAP$92 = l.$jscomp$loop$prop$pageFilter$72.revealMAP;
                  l.$jscomp$loop$prop$revealed$94 = !1;
                  l.$jscomp$loop$prop$afterAjaxFinished$95 = function(y) {
                    return function() {
                      var l = 0, h = [];
                      a(26);
                      var f = {}, k;
                      for (k in y.$jscomp$loop$prop$pageFilter$72) {
                        f.$jscomp$loop$prop$sel$81 = y.$jscomp$loop$prop$pageFilter$72[k];
                        if (!(f.$jscomp$loop$prop$sel$81.name == y.$jscomp$loop$prop$pageVersionTest$73.name || y.$jscomp$loop$prop$revealed$94 && "revealMAP" == f.$jscomp$loop$prop$sel$81.name)) {
                          var m = v;
                          if (f.$jscomp$loop$prop$sel$81.parentList) {
                            var q = [];
                            if ("undefined" != typeof p[f.$jscomp$loop$prop$sel$81.parentList]) {
                              q = p[f.$jscomp$loop$prop$sel$81.parentList];
                            } else {
                              if (!0 === x(y.$jscomp$loop$prop$pageFilter$72[f.$jscomp$loop$prop$sel$81.parentList], m, y.$jscomp$loop$prop$pageType$75)) {
                                q = p[f.$jscomp$loop$prop$sel$81.parentList];
                              } else {
                                break;
                              }
                            }
                            D[f.$jscomp$loop$prop$sel$81.parentList] || (D[f.$jscomp$loop$prop$sel$81.parentList] = []);
                            m = 0;
                            var r = {}, n;
                            for (n in q) {
                              if (q.hasOwnProperty(n)) {
                                if ("lager" == f.$jscomp$loop$prop$sel$81.name) {
                                  m++;
                                  try {
                                    var z = void 0;
                                    r.$jscomp$loop$prop$offerId$78 = void 0;
                                    f.$jscomp$loop$prop$sel$81.selector && (z = q[n].querySelector(f.$jscomp$loop$prop$sel$81.selector));
                                    f.$jscomp$loop$prop$sel$81.altSelector && (r.$jscomp$loop$prop$offerId$78 = q[n].querySelector(f.$jscomp$loop$prop$sel$81.altSelector));
                                    r.$jscomp$loop$prop$offerId$78 && (r.$jscomp$loop$prop$offerId$78 = r.$jscomp$loop$prop$offerId$78.getAttribute(f.$jscomp$loop$prop$sel$81.attribute));
                                    r.$jscomp$loop$prop$maxQty$79 = 999;
                                    if (!r.$jscomp$loop$prop$offerId$78) {
                                      try {
                                        var I = JSON.parse(f.$jscomp$loop$prop$sel$81.regExp);
                                        if (I.sel1) {
                                          try {
                                            var B = JSON.parse(q[n].querySelectorAll(I.sel1)[0].dataset[I.dataSet1]);
                                            r.$jscomp$loop$prop$offerId$78 = B[I.val1];
                                            r.$jscomp$loop$prop$maxQty$79 = B.maxQty;
                                          } catch (S) {
                                          }
                                        }
                                        if (!r.$jscomp$loop$prop$offerId$78 && I.sel2) {
                                          try {
                                            var C = JSON.parse(q[n].querySelectorAll(I.sel2)[0].dataset[I.dataSet2]);
                                            r.$jscomp$loop$prop$offerId$78 = C[I.val2];
                                            r.$jscomp$loop$prop$maxQty$79 = C.maxQty;
                                          } catch (S) {
                                          }
                                        }
                                      } catch (S) {
                                      }
                                    }
                                    if (z && r.$jscomp$loop$prop$offerId$78 && null != e) {
                                      l++;
                                      r.$jscomp$loop$prop$mapIndex$84 = n + "";
                                      r.$jscomp$loop$prop$isMAP$82 = !1;
                                      try {
                                        r.$jscomp$loop$prop$isMAP$82 = D[f.$jscomp$loop$prop$sel$81.parentList][r.$jscomp$loop$prop$mapIndex$84].isMAP || -1 != q[n].textContent.toLowerCase().indexOf("add to cart to see product details");
                                      } catch (S) {
                                      }
                                      r.$jscomp$loop$prop$busy$83 = !0;
                                      r.$jscomp$loop$prop$currentASIN$77 = c.url.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)[1];
                                      null == r.$jscomp$loop$prop$currentASIN$77 || 9 > r.$jscomp$loop$prop$currentASIN$77.length || setTimeout(function(a, f) {
                                        return function() {
                                          b.addStockJob({type:"getStock", asin:a.$jscomp$loop$prop$currentASIN$77, oid:a.$jscomp$loop$prop$offerId$78, host:d.host, maxQty:a.$jscomp$loop$prop$maxQty$79, onlyMaxQty:9 == f.$jscomp$loop$prop$sel$81.reGroup, isMAP:a.$jscomp$loop$prop$isMAP$82, referer:d.host + "/dp/" + a.$jscomp$loop$prop$currentASIN$77, domainId:c.domainId, force:!0, session:e}, function(c) {
                                            a.$jscomp$loop$prop$busy$83 && (a.$jscomp$loop$prop$busy$83 = !1, "undefined" != typeof c && (D[f.$jscomp$loop$prop$sel$81.parentList][a.$jscomp$loop$prop$mapIndex$84][f.$jscomp$loop$prop$sel$81.name] = c), 0 == --l && w(g));
                                          });
                                          setTimeout(function() {
                                            a.$jscomp$loop$prop$busy$83 && 0 == --l && (a.$jscomp$loop$prop$busy$83 = !1, console.log("timeout " + a.$jscomp$loop$prop$offerId$78), w(g));
                                          }, 4000 + 1000 * l);
                                        };
                                      }(r, f), 1);
                                    }
                                  } catch (S) {
                                  }
                                } else {
                                  if ("revealMAP" == f.$jscomp$loop$prop$sel$81.name) {
                                    if (r.$jscomp$loop$prop$revealMAP$49$85 = f.$jscomp$loop$prop$sel$81, z = void 0, z = r.$jscomp$loop$prop$revealMAP$49$85.selector ? q[n].querySelector(r.$jscomp$loop$prop$revealMAP$49$85.selector) : q[n], null != z && z.textContent.match(new RegExp(r.$jscomp$loop$prop$revealMAP$49$85.regExp))) {
                                      z = c.url.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)[1];
                                      var A = y.$jscomp$loop$prop$pageFilter$72.sellerId;
                                      "undefined" == typeof A || null == A || null == z || 2 > z.length || (A = q[n].querySelector(f.$jscomp$loop$prop$sel$81.childNode).value, null == A || 20 > A + 0 || (z = r.$jscomp$loop$prop$revealMAP$49$85.altSelector.replace("OFFERID", A).replace("ASINID", z), l++, r.$jscomp$loop$prop$mapIndex$52$86 = n + "", u(z, "GET", null, 3000, function(a) {
                                        return function(c) {
                                          try {
                                            var b = y.$jscomp$loop$prop$pageFilter$72.price;
                                            if (b && b.regExp) {
                                              if (c.match(/no valid offer--/)) {
                                                D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] || (D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] = {}), D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86][a.$jscomp$loop$prop$revealMAP$49$85.name] = -1;
                                              } else {
                                                var d = c.match(new RegExp("price info--\x3e(?:.|\\n)*?" + b.regExp + "(?:.|\\n)*?\x3c!--")), e = c.match(/price info--\x3e(?:.|\n)*?(?:<span.*?size-small.*?">)([^]*?<\/span)(?:.|\n)*?\x3c!--/);
                                                if (!d || d.length < b.reGroup) {
                                                  t += " //  priceMAP regexp fail: " + (c + " - " + b.name + y.$jscomp$loop$prop$pageType$75);
                                                } else {
                                                  var f = d[b.reGroup];
                                                  D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] || (D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86] = {});
                                                  D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86][a.$jscomp$loop$prop$revealMAP$49$85.name] = f;
                                                  null != e && 2 == e.length && (D[a.$jscomp$loop$prop$revealMAP$49$85.parentList][a.$jscomp$loop$prop$mapIndex$52$86][a.$jscomp$loop$prop$revealMAP$49$85.name + "Shipping"] = e[1].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                                }
                                              }
                                            }
                                          } catch (da) {
                                          }
                                          0 == --l && 0 == h.length && w();
                                        };
                                      }(r), function() {
                                        0 == --l && 0 == h.length && w();
                                      })));
                                    }
                                  } else {
                                    z = x(f.$jscomp$loop$prop$sel$81, q[n], y.$jscomp$loop$prop$pageType$75);
                                    if (!1 === z) {
                                      break;
                                    }
                                    if (!0 !== z) {
                                      if (D[f.$jscomp$loop$prop$sel$81.parentList][n] || (D[f.$jscomp$loop$prop$sel$81.parentList][n] = {}), f.$jscomp$loop$prop$sel$81.multiple) {
                                        for (var E in z) {
                                          z.hasOwnProperty(E) && !f.$jscomp$loop$prop$sel$81.keepBR && (z[E] = z[E].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                        }
                                        z = z.join("\u271c\u271c");
                                        D[f.$jscomp$loop$prop$sel$81.parentList][n][f.$jscomp$loop$prop$sel$81.name] = z;
                                      } else {
                                        D[f.$jscomp$loop$prop$sel$81.parentList][n][f.$jscomp$loop$prop$sel$81.name] = f.$jscomp$loop$prop$sel$81.keepBR ? z : z.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                                      }
                                    }
                                  }
                                }
                              }
                              r = {$jscomp$loop$prop$currentASIN$77:r.$jscomp$loop$prop$currentASIN$77, $jscomp$loop$prop$offerId$78:r.$jscomp$loop$prop$offerId$78, $jscomp$loop$prop$maxQty$79:r.$jscomp$loop$prop$maxQty$79, $jscomp$loop$prop$isMAP$82:r.$jscomp$loop$prop$isMAP$82, $jscomp$loop$prop$busy$83:r.$jscomp$loop$prop$busy$83, $jscomp$loop$prop$mapIndex$84:r.$jscomp$loop$prop$mapIndex$84, $jscomp$loop$prop$revealMAP$49$85:r.$jscomp$loop$prop$revealMAP$49$85, $jscomp$loop$prop$mapIndex$52$86:r.$jscomp$loop$prop$mapIndex$52$86};
                            }
                          } else {
                            q = x(f.$jscomp$loop$prop$sel$81, m, y.$jscomp$loop$prop$pageType$75);
                            if (!1 === q) {
                              break;
                            }
                            if (!0 !== q) {
                              if (f.$jscomp$loop$prop$sel$81.multiple) {
                                for (var F in q) {
                                  q.hasOwnProperty(F) && !f.$jscomp$loop$prop$sel$81.keepBR && (q[F] = q[F].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                }
                                q = q.join();
                              } else {
                                f.$jscomp$loop$prop$sel$81.keepBR || (q = q.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                              }
                              L[f.$jscomp$loop$prop$sel$81.name] = q;
                            }
                          }
                        }
                        f = {$jscomp$loop$prop$sel$81:f.$jscomp$loop$prop$sel$81};
                      }
                      try {
                        if (1 == h.length || "500".endsWith("8") && 0 < h.length) {
                          h.shift()();
                        } else {
                          for (f = 0; f < h.length; f++) {
                            setTimeout(function() {
                              0 < h.length && h.shift()();
                            }, 500 * f);
                          }
                        }
                      } catch (S) {
                      }
                      0 == l && 0 == h.length && w();
                    };
                  }(l);
                  if (l.$jscomp$loop$prop$revealMAP$92) {
                    if (h = v.querySelector(l.$jscomp$loop$prop$revealMAP$92.selector), null != h) {
                      l.$jscomp$loop$prop$url$93 = h.getAttribute(l.$jscomp$loop$prop$revealMAP$92.attribute);
                      if (null == l.$jscomp$loop$prop$url$93 || 0 == l.$jscomp$loop$prop$url$93.length) {
                        l.$jscomp$loop$prop$afterAjaxFinished$95();
                        break;
                      }
                      0 != l.$jscomp$loop$prop$url$93.indexOf("http") && (h = document.createElement("a"), h.href = c.url, l.$jscomp$loop$prop$url$93 = h.origin + l.$jscomp$loop$prop$url$93);
                      L[l.$jscomp$loop$prop$revealMAP$92.name] = "1";
                      l.$jscomp$loop$prop$url$93 = l.$jscomp$loop$prop$url$93.replace(/(mapPopover.*?)(false)/, "$1true");
                      l.$jscomp$loop$prop$xhr$90 = new XMLHttpRequest;
                      l.$jscomp$loop$prop$hasTimeout$89 = !1;
                      l.$jscomp$loop$prop$ti$91 = setTimeout(function(a) {
                        return function() {
                          a.$jscomp$loop$prop$hasTimeout$89 = !0;
                          a.$jscomp$loop$prop$afterAjaxFinished$95();
                        };
                      }(l), 4000);
                      l.$jscomp$loop$prop$xhr$90.onreadystatechange = function(a) {
                        return function() {
                          if (!a.$jscomp$loop$prop$hasTimeout$89 && 4 == a.$jscomp$loop$prop$xhr$90.readyState) {
                            clearTimeout(a.$jscomp$loop$prop$ti$91);
                            if (200 == a.$jscomp$loop$prop$xhr$90.status) {
                              var c = a.$jscomp$loop$prop$xhr$90.responseText;
                              if (a.$jscomp$loop$prop$revealMAP$92.regExp) {
                                var b = c.match(new RegExp(a.$jscomp$loop$prop$revealMAP$92.regExp));
                                if (!b || b.length < a.$jscomp$loop$prop$revealMAP$92.reGroup) {
                                  if (b = v.querySelector(a.$jscomp$loop$prop$revealMAP$92.selector)) {
                                    var d = b.cloneNode(!1);
                                    d.innerHTML = c;
                                    b.parentNode.replaceChild(d, b);
                                  }
                                } else {
                                  L[a.$jscomp$loop$prop$revealMAP$92.name] = b[a.$jscomp$loop$prop$revealMAP$92.reGroup], L[a.$jscomp$loop$prop$revealMAP$92.name + "url"] = a.$jscomp$loop$prop$url$93;
                                }
                              }
                            }
                            a.$jscomp$loop$prop$revealed$94 = !0;
                            a.$jscomp$loop$prop$afterAjaxFinished$95();
                          }
                        };
                      }(l);
                      l.$jscomp$loop$prop$xhr$90.onerror = l.$jscomp$loop$prop$afterAjaxFinished$95;
                      l.$jscomp$loop$prop$xhr$90.open("GET", l.$jscomp$loop$prop$url$93, !0);
                      l.$jscomp$loop$prop$xhr$90.send();
                    } else {
                      l.$jscomp$loop$prop$afterAjaxFinished$95();
                    }
                  } else {
                    l.$jscomp$loop$prop$afterAjaxFinished$95();
                  }
                  h = !0;
                }
              }
              l = {$jscomp$loop$prop$pageFilter$72:l.$jscomp$loop$prop$pageFilter$72, $jscomp$loop$prop$pageVersionTest$73:l.$jscomp$loop$prop$pageVersionTest$73, $jscomp$loop$prop$revealed$94:l.$jscomp$loop$prop$revealed$94, $jscomp$loop$prop$pageType$75:l.$jscomp$loop$prop$pageType$75, $jscomp$loop$prop$hasTimeout$89:l.$jscomp$loop$prop$hasTimeout$89, $jscomp$loop$prop$afterAjaxFinished$95:l.$jscomp$loop$prop$afterAjaxFinished$95, $jscomp$loop$prop$xhr$90:l.$jscomp$loop$prop$xhr$90, $jscomp$loop$prop$ti$91:l.$jscomp$loop$prop$ti$91, 
              $jscomp$loop$prop$revealMAP$92:l.$jscomp$loop$prop$revealMAP$92, $jscomp$loop$prop$url$93:l.$jscomp$loop$prop$url$93};
            }
            a(8);
            if (null == A) {
              q += " // no pageVersion matched";
              g.payload = [t, q, c.dbg1 ? y : ""];
              g.status = 308;
              a(10);
              try {
                c.stats.times.push(99), c.stats.times.push(k.lastBugReport);
              } catch (I) {
              }
              "undefined" == typeof c.sent && (g = f(c, g), n.sendMessage(g));
            }
          } else {
            a(9), g.status = 306, "undefined" == typeof c.sent && (g = f(c, g), n.sendMessage(g));
          }
        }
      });
    }
    function h(b, d, e) {
      null == M || V || P();
      K = b;
      var f = b.messageId;
      setTimeout(function() {
        null != K && K.messageId == f && (K = K = null);
      }, b.timeout);
      b.onDoneC = function() {
        K = null;
      };
      d ? (a(11), d = document.getElementById("keepa_data"), d.removeAttribute("srcdoc"), d.src = b.url) : (1 == b.httpMethod && (b.scrapeFilters && 0 < b.scrapeFilters.length && (G = b), O || (O = !0, b.l && 0 < b.l.length && (M = b.l, P()))), u(b.url, Q[b.httpMethod], b.postData, b.timeout, function(d) {
        a(12);
        if ("o0" == b.key) {
          e(d);
        } else {
          var f = document.getElementById("keepa_data_2");
          f.src = "";
          d = d.replace(/src=".*?"/g, 'src=""');
          if (null != b) {
            b.block && (d = d.replace(new RegExp(b.block, "g"), ""));
            a(13);
            var v = !1;
            f.srcdoc = d;
            a(18);
            f.onload = function() {
              a(19);
              v || (f.onload = void 0, v = !0, a(20), setTimeout(function() {
                a(21);
                var b = document.getElementById("keepa_data_2").contentWindow;
                try {
                  e(b.document, d);
                } catch (Z) {
                  k.reportBug(Z), E(410);
                }
              }, 80));
            };
          }
          c.console.clear();
        }
      }));
    }
    function g() {
      try {
        var a = document.getElementById("keepa_data");
        a.src = "";
        a.removeAttribute("srcdoc");
      } catch (D) {
      }
      try {
        var b = document.getElementById("keepa_data_2");
        b.src = "";
        b.removeAttribute("srcdoc");
      } catch (D) {
      }
      K = null;
    }
    function u(b, c, d, e, f) {
      var v = new XMLHttpRequest;
      if (f) {
        var g = !1, y = setTimeout(function() {
          g = !0;
          x.abortJob(413);
        }, e || 15000);
        v.onreadystatechange = function() {
          g || (2 == v.readyState && a(27), 4 == v.readyState && (clearTimeout(y), a(29), 503 != v.status && (0 == v.status || 399 < v.status) ? x.abortJob(415, [v.status]) : 0 == v.responseText.length && c == Q[0] ? x.abortJob(416) : f.call(this, v.responseText)));
        };
        v.onerror = function() {
          x.abortJob(408);
        };
      }
      v.open(c, b, !0);
      null == d ? v.send() : v.send(d);
    }
    function t(a) {
      var b = "", c = "", d;
      for (d in a[F]) {
        var e = a[F][d];
        "-" != e && (b += c + d + "=" + e + ";", c = " ");
      }
      return b;
    }
    function A(a) {
      delete C["" + a];
      localStorage.cache = pako.deflate(JSON.stringify(C), {to:"string"});
    }
    function E(a, b) {
      if (null != m) {
        try {
          if ("undefined" != typeof m.sent) {
            return;
          }
          var d = f(m, {});
          b && (d.payload = b);
          d.status = a;
          n.sendMessage(d);
          g();
        } catch (q) {
          k.reportBug(q, "abort");
        }
      }
      c.console.clear();
    }
    var G = null, m = null, H = /automated access|api-services-support@/, J = [function(a) {
    }, function(a) {
      if (null != m) {
        var b = !0;
        if (a.initiator) {
          if (a.initiator.startsWith("http")) {
            return;
          }
        } else {
          if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
            return;
          }
        }
        if (m.url == a.url) {
          N = a.frameId, T = a.tabId, W = a.parentFrameId, b = !1;
        } else {
          if (N == a.parentFrameId || W == a.parentFrameId || N == a.frameId) {
            b = !1;
          }
        }
        if (-2 != N && T == a.tabId) {
          a = a.requestHeaders;
          var c = {};
          if (!a.find(function(a) {
            return "krequestid" === a.name;
          })) {
            "" === m.headers.Cookie && (b = !0);
            (m.timeout + "").endsWith("108") || (m.headers.Cookie = b ? "" : R);
            for (var d in m.headers) {
              b = !1;
              for (var e = 0; e < a.length; ++e) {
                if (a[e].name.toLowerCase() == d.toLowerCase()) {
                  "" == m.headers[d] ? (a.splice(e, 1), e--) : a[e].value = m.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == m.headers[d] || a.push({name:p ? d.toLowerCase() : d, value:m.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }
    }, function(a) {
      var c = a.responseHeaders;
      try {
        if (a.initiator) {
          if (a.initiator.startsWith("http")) {
            return;
          }
        } else {
          if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
            return;
          }
        }
        if (T != a.tabId || null == m || c.find(function(a) {
          return "krequestid" === a.name;
        })) {
          return;
        }
        for (var d = (m.timeout + "").endsWith("108"), e = !1, f = [], g = 0; g < c.length; g++) {
          var h = c[g], k = h.name.toLowerCase();
          "set-cookie" == k ? (-1 < h.value.indexOf("xpires") && b.parseCookieHeader(f, h.value), d || c.splice(g--, 1)) : "x-frame-options" == k && (c.splice(g, 1), g--);
        }
        for (g = 0; g < f.length; g++) {
          var n = f[g];
          if ("undefined" == typeof C[F][n[0]] || C[F][n[0]] != n[1]) {
            e = !0, C[F][n[0]] = n[1];
          }
        }
        !d && e && m.url == a.url && (localStorage.cache = pako.deflate(JSON.stringify(C), {to:"string"}), R = t(C));
      } catch (ba) {
      }
      return {responseHeaders:c};
    }, function(a) {
      if (null != m && m.url == a.url) {
        var b = 0;
        switch(a.error) {
          case "net::ERR_TUNNEL_CONNECTION_FAILED":
            b = 510;
            break;
          case "net::ERR_INSECURE_RESPONSE":
            b = 511;
            break;
          case "net::ERR_CONNECTION_REFUSED":
            b = 512;
            break;
          case "net::ERR_BAD_SSL_CLIENT_AUTH_CERT":
            b = 513;
            break;
          case "net::ERR_CONNECTION_CLOSED":
            b = 514;
            break;
          case "net::ERR_NAME_NOT_RESOLVED":
            b = 515;
            break;
          case "net::ERR_NAME_RESOLUTION_FAILED":
            b = 516;
            break;
          case "net::ERR_ABORTED":
          case "net::ERR_CONNECTION_ABORTED":
            b = 517;
            break;
          case "net::ERR_CONTENT_DECODING_FAILED":
            b = 518;
            break;
          case "net::ERR_NETWORK_ACCESS_DENIED":
            b = 519;
            break;
          case "net::ERR_NETWORK_CHANGED":
            b = 520;
            break;
          case "net::ERR_INCOMPLETE_CHUNKED_ENCODING":
            b = 521;
            break;
          case "net::ERR_CONNECTION_TIMED_OUT":
          case "net::ERR_TIMED_OUT":
            b = 522;
            break;
          case "net::ERR_CONNECTION_RESET":
            b = 523;
            break;
          case "net::ERR_NETWORK_IO_SUSPENDED":
            b = 524;
            break;
          case "net::ERR_EMPTY_RESPONSE":
            b = 525;
            break;
          case "net::ERR_SSL_PROTOCOL_ERROR":
            b = 526;
            break;
          case "net::ERR_ADDRESS_UNREACHABLE":
            b = 527;
            break;
          case "net::ERR_INTERNET_DISCONNECTED":
            b = 528;
            break;
          case "net::ERR_BLOCKED_BY_ADMINISTRATOR":
            b = 529;
            break;
          case "net::ERR_SSL_VERSION_OR_CIPHER_MISMATCH":
            b = 530;
            break;
          case "net::ERR_CONTENT_LENGTH_MISMATCH":
            b = 531;
            break;
          case "net::ERR_PROXY_CONNECTION_FAILED":
            b = 532;
            break;
          default:
            b = 533;
            return;
        }
        setTimeout(function() {
          x.setStatTime(33);
          x.abortJob(b);
        }, 0);
      }
    }], O = !1, V = !1, M = null, K = null, P = function() {
      V = !0;
      for (var a = 0; a < M.length; a++) {
        var b = M[a], d = window, e = 0;
        try {
          for (; e < b.path.length - 1; e++) {
            d = d[b.path[e]];
          }
          if (b.b) {
            d[b.path[e]](J[b.index], b.a, b.b);
          } else {
            d[b.path[e]](J[b.index], b.a);
          }
        } catch (L) {
          console.log(L);
        }
      }
      c.console.clear();
    }, Q = ["GET", "HEAD", "POST", "PUT", "DELETE"], C = {}, R = "", F = 1;
    try {
      localStorage.cache && (C = JSON.parse(pako.inflate(localStorage.cache, {to:"string"})));
    } catch (y) {
      setTimeout(function() {
        k.reportBug(y, pako.inflate(localStorage.cache, {to:"string"}));
      }, 2000);
    }
    var N = -2, T = -2, W = -2;
    return {onMessage:function(a) {
      "hhhh" == a.key && chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
        if (null != m) {
          var b = !0;
          if (a.initiator) {
            if (a.initiator.startsWith("http")) {
              return;
            }
          } else {
            if (a.originUrl && !a.originUrl.startsWith("moz-extension")) {
              return;
            }
          }
          m.url == a.url && (N = a.frameId, T = a.tabId, W = a.parentFrameId, b = !1);
          if (-2 != N && N == a.frameId && T == a.tabId && W == a.parentFrameId) {
            a = a.requestHeaders;
            var c = {};
            (m.timeout + "").endsWith("108") || (m.headers.Cookie = b ? "" : R);
            for (var d in m.headers) {
              b = !1;
              for (var e = 0; e < a.length; ++e) {
                if (a[e].name.toLowerCase() == d.toLowerCase()) {
                  "" == m.headers[d] ? a.splice(e, 1) : a[e].value = m.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == m.headers[d] || a.push({name:p ? d.toLowerCase() : d, value:m.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }, {urls:["<all_urls>"]}, ["blocking", "requestHeaders"]);
      switch(a.key) {
        case "o0":
        case "o1":
          m = a, m.stats = {start:Date.now(), times:[]};
      }
      switch(a.key) {
        case "update":
          chrome.runtime.requestUpdateCheck(function(a, b) {
            "update_available" == a && chrome.runtime.reload();
          });
          break;
        case "o0":
          x.clearIframe();
          e(a);
          break;
        case "o1":
          x.clearIframe();
          d(a);
          break;
        case "o2":
          A(a.domainId);
          break;
        case "1":
          document.location.reload(!1);
      }
    }, clearIframe:g, endSession:A, getOutgoingMessage:f, setStatTime:a, getFilters:function() {
      return G;
    }, getMessage:function() {
      return m;
    }, clearMessage:function() {
      m = null;
      if (null != M && V) {
        V = !1;
        for (var a = 0; a < M.length; a++) {
          var b = M[a];
          if (b) {
            try {
              for (var d = window, e = 0; e < b.path.length - 1; e++) {
                d = d[b.path[e]];
              }
              d.removeListener(J[b.index]);
            } catch (L) {
            }
          }
        }
        c.console.clear();
      }
    }, abortJob:E};
  }();
})();

