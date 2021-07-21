/**
 * @description 后台运行的脚本
 */

/** @description 插件附加菜单列表 */
const contextMenuItem = ["[zh-CN] -> [en]", "[en] -> [zh-CN]"]

/** @description 事件处理 */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type === 'onload') {  // 就绪
        try {
            contextMenuItem.map((item, index, arr) => {  // 创建右键菜单
                chrome.contextMenus.create(
                    {
                        "id": "menu" + index,
                        "title": item,
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

// 右键菜单事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if(info.menuItemId === 'menu0') {  // zh to en
        chrome.tabs.sendMessage( tab.id, { type: 'translate', target: 'en', info, tab } )
    }
    else if(info.menuItemId === 'menu1') {  // en to zh
        chrome.tabs.sendMessage( tab.id, { type: 'translate', target: 'zh', info, tab } )
    }
})

// 改: feat: 在此添加生命周期
// chrome.windows.onFocusChanged.addListener((windowId) => {
    
// })
