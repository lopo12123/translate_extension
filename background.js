// 后台运行的脚本

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
                    }
                )
            })
            sendResponse({type: 'success', msg: 'create contextmenu item(s)'})
        } catch (error) {
            sendResponse({type: 'error', msg: error})
        }
    }
})

chrome.contextMenus.onClicked.addListener((info, tab) => {

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


