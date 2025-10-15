// HTML内容保护功能 - 修复版
// 将此代码添加到您的HTML页面中即可启用内容保护

// 创建保护提示样式
const protectionStyle = document.createElement('style');
protectionStyle.textContent = `
    .protection-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4757;
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: bold;
        animation: fadeInOut 3s forwards;
        display: none;
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
    
    .protection-disabled {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    
    /* 添加透明覆盖层确保右键被拦截 */
    .protection-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: transparent;
    }
`;
document.head.appendChild(protectionStyle);

// 创建保护提示元素
const protectionAlert = document.createElement('div');
protectionAlert.className = 'protection-alert';
protectionAlert.id = 'protectionAlert';
document.body.appendChild(protectionAlert);

// 创建透明覆盖层
const protectionOverlay = document.createElement('div');
protectionOverlay.className = 'protection-overlay';
document.body.appendChild(protectionOverlay);

// 显示保护提示
function showProtectionMessage(message = '此内容受保护') {
    protectionAlert.textContent = message;
    protectionAlert.style.display = 'block';
    
    setTimeout(() => {
        protectionAlert.style.display = 'none';
    }, 3000);
}

// 更严格的右键禁用
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    e.stopPropagation();
    showProtectionMessage('右键菜单已禁用');
    return false;
});

// 在覆盖层上也禁用右键
protectionOverlay.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    e.stopPropagation();
    showProtectionMessage('右键菜单已禁用');
    return false;
});

// 禁用文本选择
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    showProtectionMessage('文本选择已禁用');
    return false;
});

// 拦截键盘快捷键
document.addEventListener('keydown', function(e) {
    // 拦截复制快捷键 (Ctrl+C)
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'Insert')) {
        showProtectionMessage('复制功能已禁用');
        e.preventDefault();
        return false;
    }
    
    // 拦截F12开发者工具
    if (e.key === 'F12') {
        showProtectionMessage('开发者工具已禁用');
        e.preventDefault();
        return false;
    }
    
    // 拦截Ctrl+U查看源代码
    if (e.ctrlKey && e.key === 'u') {
        showProtectionMessage('查看源代码已禁用');
        e.preventDefault();
        return false;
    }
    
    // 拦截Ctrl+Shift+I开发者工具
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        showProtectionMessage('开发者工具已禁用');
        e.preventDefault();
        return false;
    }
});

// 防止拖拽
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// 禁用文本选择（CSS方式）
document.body.classList.add('protection-disabled');

console.log('HTML内容保护功能已启用');
