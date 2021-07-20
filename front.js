// +
// + 注入页面的脚本
// +

/** @description 注入当前页面后通知后台创建contextmenu项目 */
(function() {
    _log('success', 'inject scripts')
    
    chrome.runtime.sendMessage(
        {type: 'onload'},
        (response) => {
            _log(response.type, response.msg)
        }
    )
})()






/** @description log some msg in the console */
function _log(type, msg) {
    console.log('[LOPO]: <' + type + '> ' + JSON.stringify(msg) + '!')
}