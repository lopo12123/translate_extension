// +
// + 注入页面的脚本
// +

/** @description 注入当前页面后通知后台 */
(function() {
    console.log('[lopo]: success in <' + document.title + '>');
    
    chrome.runtime.sendMessage(
        {type: 'onload'},
        (response) => {
            console.log(response);
        })
})()











chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg)

    sendResponse('send back')

    return false

})