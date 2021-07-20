/**
 * @author lopo
 * @version 1.0.0
 * @description 注入页面的脚本
 */

/** @description 注入当前页面后通知后台创建contextmenu项目 */
(function() {
    _log('success', 'inject scripts')
    
    chrome.runtime.sendMessage(
        {type: 'onload'},
        (response) => {
            _log(response.type, response.msg)
            createDragableBox()
        }
    )
})()

/** @description 创建可拖拽的容器并设置可拖拽 */
function createDragableBox() {
    // create element
    let box = document.createElement('div')
    box.id = 'translateEl'
    box.innerHTML = '^.^'
    
    // set box`s style
    box.style.position = 'absolute'
    box.style.zIndex = '10000'
    box.style.width = '88px'
    box.style.height = '100px'
    box.style.backgroundImage = 'url(https://cdn.jsdelivr.net/gh/lopo12123/PHOTOS/HollowKnight/knight_small.png)'
    box.style.backgroundSize = 'contain'
    box.style.userSelect = 'none'
    box.style.outline = 'solid 2px gainsboro'
    box.style.display = 'flex'
    box.style.justifyContent = 'center'
    box.style.alignItems = 'center'
    
    box.style.borderRadius = '5px'
    box.style.backgroundColor = 'red'
    box.style.opacity = '0.6'

    // set box`s move event
    box.onmousedown = (eDown) => {
        eDown.stopPropagation()

        let disX = eDown.clientX - box.offsetLeft
        let disY = eDown.clientY - box.offsetTop

        document.onmousemove = (eMove) => {
            box.style.left = eMove.clientX - disX + 'px'
            box.style.top = eMove.clientY - disY + 'px'
            box.style.cursor = 'move'
        }
    }
    box.onmouseup = () => {
        document.onmousemove = null
        box.style.cursor = 'default'
    }

    // append box to the document tree
    document.body.appendChild(box)
}





/** @description 在当前窗口的控制台以一定格式打印信息 */
function _log(type, msg) {
    console.log('[LOPO]: <' + type + '> ' + JSON.stringify(msg) + '!')
}