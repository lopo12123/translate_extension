/**
 * @author lopo
 * @version 1.0.0
 * @description 后台运行的脚本
 */

/** @description 插件附加菜单列表 */
const contextMenuItem = ["TRANSLATE IT!"]

/** @description 事件处理 */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type === 'onload') {  // 刚就绪
        try {
            contextMenuItem.map((item, index, arr) => {
                chrome.contextMenus.create(
                    {
                        "id": "menu" + index,
                        "title": item + " [%s]",
                        "type": "normal",
                        "contexts": ["selection"]
                        // "contexts": [""]
                    }
                )
            })
            sendResponse({type: 'success', msg: 'create contextmenu item(s)'})
        } catch (error) {
            sendResponse({type: 'error', msg: error})
        }
    }
})



chrome.windows.onFocusChanged.addListener((windowId) => {
    
})



// chrome.contextMenus.onClicked.addListener(function(info, tab) {
//     if(info.menuItemId === '0') {
//         chrome.tabs.sendMessage(
//             tab.id,
//             { info, tab },
//             (response) => {
//                 console.log(response);
//             }
//         )
//     }
// })