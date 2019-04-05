console.log("Start-1");
const webRequest = chrome.webRequest;
const events = {
    onBeforeSendHeaders: 'onBeforeSendHeaders',
    onBeforeRequest: 'onBeforeRequest',
};
const filter = {urls: ["http://4a.xj.cmcc/*"]};
webRequest[events.onBeforeSendHeaders].addListener((details) => {
    let exists = false;
    const setting = localStorage.getItem("setting") ? JSON.parse(localStorage.getItem("setting")) : {};
    for (let i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'Referer') {
            exists = true;
            details.requestHeaders[i].value = setting.referer;
            break;
        }
        //Cookie
        if (details.requestHeaders[i].name === 'Cookie') {
            details.requestHeaders[i].value = setting.cookie;
            break;
        }//Cookie
        if (details.requestHeaders[i].name === 'User-Agent') {
            details.requestHeaders[i].value = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36";
            break;
        }
    }
    if (details.url === "http://4a.xj.cmcc/platform/login!homeAtion.do") {
        details.method = "POST";
    }
    console.log(details);
    if (!exists) {
        details.requestHeaders.push({name: 'Referer', value: setting.referer});
    }
    return details;
}, filter, ["requestHeaders", "blocking"]);
console.log("Finish-1");
