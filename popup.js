// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
const tabs = chrome.tabs;
document.addEventListener('DOMContentLoaded', function () {

    let urlEle = document.getElementById("url");
    let hostEle = document.getElementById("host");
    let cookieEle = document.getElementById("cookie");
    let refererEle = document.getElementById("referer");

    //老配置
    let settings = localStorage.getItem("setting") ? JSON.parse(localStorage.getItem("setting")) : {
        url: "http://4a.xj.cmcc/platform/login!homeAtion.do",
        host: "4a.xj.cmcc",
        referer: "http://4a.xj.cmcc/platform/login!onlyLogin.do?mod=1&sessionId=d98fc03c-9153-450e",
        cookie: ""
    };
    urlEle.value = settings.url;
    hostEle.value = settings.host;
    cookieEle.value = settings.cookie;
    refererEle.value = settings.referer;

    document.getElementById("btnLogin").addEventListener("click", function (e) {
        let message = {
            url: urlEle.value,
            host: hostEle.value,
            cookie: cookieEle.value,
            referer: refererEle.value,
            action: 'login'
        };

        //保存配置
        localStorage.setItem("setting", JSON.stringify(message));


        //2.设置URL
        window.open(message.url);

        //跳转
        // tabs.create({url: chrome.runtime.getURL('popup.html')}, function (tab) {
        //     console.log(tab);
        //     //执行js
        //     tabs.executeScript(tab.id, {file: "./run.js"}, function () {
        //
        //     });
        // });
    });
});
