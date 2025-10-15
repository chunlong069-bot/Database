[5:54 PM, 10/15/2025] 阿龙CHOW SCL: // HTML内容保护功能 - 修复版
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
        100% { opacity: 0; transform: translateY(-20px)…
[6:00 PM, 10/15/2025] 阿龙CHOW SCL: // 超严格HTML内容保护系统
(function() {
    'use strict';
    
    // 创建保护样式
    const protectionStyle = document.createElement('style');
    protectionStyle.textContent = `
        .protection-alert {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 71, 87, 0.95);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 2147483647;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            border: 2px solid #fff;
            backdrop-filter: blur(10px);
            display: none;
        }
        
        .protection-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 2147483646;
            display: none;
        }
        
        .protection-blocker {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2147483645;
            background: transparent;
        }
        
        body.protection-active {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
            cursor: default !important;
        }
        
        body.protection-active * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-user-drag: none !important;
            -moz-user-drag: none !important;
            -ms-user-drag: none !important;
            user-drag: none !important;
        }
        
        @keyframes protection-shake {
            0%, 100% { transform: translate(-50%, -50%); }
            25% { transform: translate(-52%, -50%); }
            75% { transform: translate(-48%, -50%); }
        }
        
        .protection-shake {
            animation: protection-shake 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(protectionStyle);
    
    // 创建保护元素
    const protectionAlert = document.createElement('div');
    protectionAlert.className = 'protection-alert';
    protectionAlert.id = 'protectionAlert';
    
    const protectionOverlay = document.createElement('div');
    protectionOverlay.className = 'protection-overlay';
    protectionOverlay.id = 'protectionOverlay';
    
    const protectionBlocker = document.createElement('div');
    protectionBlocker.className = 'protection-blocker';
    
    document.body.appendChild(protectionAlert);
    document.body.appendChild(protectionOverlay);
    document.body.appendChild(protectionBlocker);
    document.body.classList.add('protection-active');
    
    // 保护状态
    let protectionEnabled = true;
    let violationCount = 0;
    let lastViolationTime = 0;
    
    // 显示保护警告
    function showStrictProtection(message, duration = 3000) {
        if (!protectionEnabled) return;
        
        protectionAlert.textContent = message;
        protectionAlert.style.display = 'block';
        protectionOverlay.style.display = 'block';
        protectionAlert.classList.add('protection-shake');
        
        setTimeout(() => {
            protectionAlert.style.display = 'none';
            protectionOverlay.style.display = 'none';
            protectionAlert.classList.remove('protection-shake');
        }, duration);
        
        violationCount++;
        lastViolationTime = Date.now();
        
        // 多次违规触发严格措施
        if (violationCount >= 3) {
            enableStrictMode();
        }
        
        if (violationCount >= 5) {
            enableNuclearMode();
        }
    }
    
    // 严格模式
    function enableStrictMode() {
        console.warn('启用严格保护模式');
        
        // 禁用所有输入事件
        document.addEventListener('keydown', blockAllKeys, true);
        document.addEventListener('keyup', blockAllKeys, true);
        document.addEventListener('keypress', blockAllKeys, true);
        
        // 更频繁的检测
        setInterval(detectDevTools, 500);
        
        showStrictProtection('检测到多次违规操作，已启用严格保护模式', 5000);
    }
    
    // 核模式
    function enableNuclearMode() {
        console.error('启用核保护模式');
        
        // 屏蔽整个页面
        document.body.style.filter = 'blur(10px)';
        document.body.style.pointerEvents = 'none';
        
        // 重定向或屏蔽内容
        setTimeout(() => {
            showStrictProtection('由于严重违规，页面内容已被屏蔽', 10000);
            // 可以在这里添加页面重定向或内容清除
            // document.body.innerHTML = '<h1>内容因违规操作已被屏蔽</h1>';
        }, 2000);
    }
    
    // 阻止所有按键
    function blockAllKeys(e) {
        if (!protectionEnabled) return;
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // 允许必要的导航键
        const allowedKeys = ['Tab', 'Enter', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        if (!allowedKeys.includes(e.key)) {
            showStrictProtection('键盘操作已被限制');
        }
        
        return false;
    }
    
    // 检测开发者工具
    function detectDevTools() {
        if (!protectionEnabled) return;
        
        const widthThreshold = window.outerWidth - window.innerWidth > 200;
        const heightThreshold = window.outerHeight - window.innerHeight > 200;
        
        // 检查控制台状态
        const checkConsole = () => {
            const start = Date.now();
            console.profile();
            console.profileEnd();
            return Date.now() - start > 100;
        };
        
        if (widthThreshold || heightThreshold || checkConsole()) {
            showStrictProtection('检测到开发者工具，请关闭后继续浏览');
            document.body.style.opacity = '0.3';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 2000);
        }
    }
    
    // 阻止所有可能的事件
    const blockedEvents = [
        'contextmenu', 'copy', 'cut', 'paste', 'selectstart',
        'dragstart', 'mousedown', 'mouseup', 'click', 'dblclick',
        'touchstart', 'touchend', 'touchmove', 'pointerdown',
        'pointerup', 'pointermove', 'beforeprint', 'beforecopy'
    ];
    
    blockedEvents.forEach(event => {
        document.addEventListener(event, function(e) {
            if (!protectionEnabled) return;
            
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            if (event === 'contextmenu') {
                showStrictProtection('右键菜单已被禁用');
            } else if (event === 'copy' || event === 'cut') {
                showStrictProtection('复制操作已被阻止');
            } else if (event === 'selectstart') {
                showStrictProtection('文本选择已被禁用');
            }
            
            return false;
        }, true);
    });
    
    // 键盘事件拦截
    document.addEventListener('keydown', function(e) {
        if (!protectionEnabled) return;
        
        const blockedCombinations = [
            e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P'),
            e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'),
            e.altKey && (e.key === 'F4' || e.key === 'Tab'),
            e.key === 'F12',
            e.key === 'PrintScreen',
            e.key === 'ScrollLock' && e.ctrlKey,
            (e.key === 'F1' || e.key === 'F2' || e.key === 'F3' || e.key === 'F4' || e.key === 'F5' || e.key === 'F6' || 
             e.key === 'F7' || e.key === 'F8' || e.key === 'F9' || e.key === 'F10' || e.key === 'F11') && e.ctrlKey
        ];
        
        if (blockedCombinations.some(Boolean)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showStrictProtection('快捷键操作已被阻止');
            return false;
        }
    }, true);
    
    // 防止iframe嵌入
    if (window.self !== window.top) {
        showStrictProtection('此页面不允许在iframe中加载');
        setTimeout(() => {
            window.top.location = window.self.location;
        }, 2000);
    }
    
    // 防止调试
    Object.defineProperty(window, 'protectionEnabled', {
        get: () => protectionEnabled,
        set: (value) => {
            showStrictProtection('检测到调试尝试');
            return false;
        }
    });
    
    // 定期清理剪贴板
    setInterval(() => {
        if (protectionEnabled && navigator.clipboard) {
            navigator.clipboard.writeText('').catch(() => {});
        }
    }, 5000);
    
    // 检测扩展和用户脚本
    const detectExtensions = () => {
        // 检查常见的选择器
        const extensionSelectors = [
            '#ublock0-epicker',
            '.adblock-plus-outer',
            '.greasemonkey-outer'
        ];
        
        extensionSelectors.forEach(selector => {
            if (document.querySelector(selector)) {
                showStrictProtection('检测到浏览器扩展，可能会影响页面功能');
            }
        });
    };
    
    // 开始检测
    setInterval(detectDevTools, 1000);
    setInterval(detectExtensions, 5000);
    detectExtensions();
    
    console.log('🔒 超严格内容保护系统已激活');
    
    // 提供禁用方法（仅供开发使用）
    window.disableProtection = function() {
        protectionEnabled = false;
        document.body.classList.remove('protection-active');
        console.warn('保护系统已禁用 - 仅限开发环境使用');
    };
    
})();
