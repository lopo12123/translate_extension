// 后台运行的脚本
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    sendResponse('from back', 'msg:', msg)
})


var contextMenuItem = ["hello!"]

contextMenuItem.map((item, index, arr) => {
    chrome.contextMenus.create(
        {
            "id": index+'',
            "title": item,
            "contexts": ["all"]
        }
    )
})

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if(info.menuItemId === '0') {
        chrome.tabs.sendMessage(
            tab.id,
            { info, tab },
            (response) => {
                console.log(response);
            }
        )
    }
})


