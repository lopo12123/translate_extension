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


function xhrRequest() {
    const appid = '20210527000844564';
    const key = 'pZ8Ero_Ai8lH6uB1N1On';
    const salt = (new Date).getTime()
    const sign = MD5(appid + text + salt + key)
    
    const url = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
    const params = '?appid=20210527000844564&salt=' + salt + '&q=' + text + '&from=auto&to=' + target + '&sign=' + sign

    let xhr = new XMLHttpRequest()
    xhr.open('GET', url+params)
    xhr.onload = (e) => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            (idList) => {
                console.log('id list: ', idList)
    
                chrome.tabs.sendMessage(
                    idList[0].id,
                    { type: 'solved', result: JSON.parse(e.target.response) }
                )
            }
        )
    }
    xhr.send()
}











// 改: feat: 在此添加生命周期
// chrome.windows.onFocusChanged.addListener((windowId) => {
    
// })
