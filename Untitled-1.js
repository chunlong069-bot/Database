// 严格的开发者工具防护 - 纯JS版本
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
            background: rgba(0,0,0,0.7);
            z-index: 2147483646;
            display: none;
        }
        
        .protection-blocked {
            filter: blur(5px);
            pointer-events: none;
        }
        
        body {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            cursor: default;
        }
        
        img {
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;
            pointer-events: none;
        }
    `;
    document.head.appendChild(protectionStyle);
    
    // 创建保护元素
    const protectionAlert = document.createElement('div');
    protectionAlert.className = 'protection-alert';
    const protectionOverlay = document.createElement('div');
    protectionOverlay.className = 'protection-overlay';
    document.body.appendChild(protectionAlert);
    document.body.appendChild(protectionOverlay);
    
    let violationCount = 0;
    let devToolsOpen = false;
    
    function showAlert(msg, duration = 3000) {
        protectionAlert.textContent = msg;
        protectionAlert.style.display = 'block';
        protectionOverlay.style.display = 'block';
        setTimeout(() => {
            protectionAlert.style.display = 'none';
            protectionOverlay.style.display = 'none';
        }, duration);
    }
    
    function enableStrictMode() {
        violationCount++;
        if (violationCount >= 3) {
            document.body.classList.add('protection-blocked');
            showAlert('🚫 多次违规操作，页面已被锁定', 5000);
        }
    }
    
    // 全面键盘拦截
    document.addEventListener('keydown', function(e) {
        const blockedCombinations = [
            e.key === 'F12',
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')),
            (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')),
            (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')),
            (e.ctrlKey && e.shiftKey && e.key === 'K'),
            (e.ctrlKey && (e.key === 'u' || e.key === 'U')),
            (e.ctrlKey && (e.key === 's' || e.key === 'S')),
            (e.ctrlKey && (e.key === 'p' || e.key === 'P')),
            (e.ctrlKey && (e.key === 'c' || e.key === 'C')),
            (e.ctrlKey && (e.key === 'x' || e.key === 'X')),
            e.key === 'PrintScreen',
            (e.altKey && e.key === 'F4')
        ];
        
        if (blockedCombinations.some(Boolean)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showAlert('🚫 开发者工具快捷键已被阻止');
            enableStrictMode();
            return false;
        }
    }, true);
    
    // 右键和选择保护
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showAlert('🚫 右键菜单已被禁用');
        return false;
    }, true);
    
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showAlert('🚫 文本选择已被禁用');
        return false;
    }, true);
    
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showAlert('🚫 复制操作已被阻止');
        return false;
    }, true);
    
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showAlert('🚫 剪切操作已被阻止');
        return false;
    }, true);
    
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
    
    // 高级开发者工具检测
    function detectDevTools() {
        const startTime = performance.now();
        debugger;
        const endTime = performance.now();
        
        if (endTime - startTime > 100) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                showAlert('⚠️ 检测到开发者工具，请关闭后继续浏览', 5000);
                document.body.style.opacity = '0.3';
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 2000);
                enableStrictMode();
            }
            return true;
        }
        devToolsOpen = false;
        return false;
    }
    
    // 窗口大小检测
    function detectWindowResize() {
        const widthThreshold = window.outerWidth - window.innerWidth > 200;
        const heightThreshold = window.outerHeight - window.innerHeight > 200;
        
        if (widthThreshold || heightThreshold) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                showAlert('⚠️ 检测到开发者工具，请关闭后继续浏览', 5000);
                enableStrictMode();
            }
            return true;
        }
        devToolsOpen = false;
        return false;
    }
    
    // 控制台重写
    const originalConsole = window.console;
    window.console = {
        log: function() { 
            showAlert('🚫 控制台访问已被阻止');
            originalConsole.log.apply(originalConsole, arguments);
        },
        warn: function() { 
            showAlert('🚫 控制台访问已被阻止');
            originalConsole.warn.apply(originalConsole, arguments);
        },
        error: function() { 
            showAlert('🚫 控制台访问已被阻止');
            originalConsole.error.apply(originalConsole, arguments);
        },
        info: function() { 
            showAlert('🚫 控制台访问已被阻止');
            originalConsole.info.apply(originalConsole, arguments);
        },
        debug: function() { 
            showAlert('🚫 控制台访问已被阻止');
            originalConsole.debug.apply(originalConsole, arguments);
        }
    };
    
    // 定期检测
    setInterval(() => {
        detectDevTools();
        detectWindowResize();
    }, 1000);
    
    // 持续debugger防护
    setInterval(() => {
        if (devToolsOpen) {
            (function() {
                debugger;
            })();
        }
    }, 100);
    
    console.log('严格防护系统已激活');
})();

