"use strict";
/* لایه‌ی مخصوص وب: دکمه‌ی برگشت مرورگر + ثبت Service Worker */
(function () {
  // دکمه‌ی Back مرورگر/گوشی همان کار hwBack اندروید را می‌کند
  try {
    history.replaceState({ eb: 0 }, "");
    history.pushState({ eb: 1 }, "");
    window.addEventListener("popstate", function () {
      if (typeof window.hwBack === "function" && window.hwBack()) {
        history.pushState({ eb: 1 }, "");
      }
    });
  } catch (e) {}
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
