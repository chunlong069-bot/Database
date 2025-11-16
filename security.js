(function() {
  'use strict';

  /* 创建提示框与遮罩层 */
  const alertBox = document.createElement('div');
  alertBox.className = 'protection-alert';
  alertBox.innerHTML = '<span class="icon">⚠</span> <span class="text">This action has been blocked for security reasons</span>';
  document.body.appendChild(alertBox);

  const overlay = document.createElement('div');
  overlay.className = 'protection-overlay';
  document.body.appendChild(overlay);

  /* 显示提示信息的函数（带动画） */
  function showAlert(msg) {
    alertBox.querySelector('.text').textContent = msg;
    alertBox.style.display = 'flex';
    overlay.style.display = 'block';
    alertBox.classList.add('show');
    setTimeout(() => {
      alertBox.classList.remove('show');
      setTimeout(() => {
        alertBox.style.display = 'none';
        overlay.style.display = 'none';
      }, 400);
    }, 2500);
  }

  /* 阻止开发者工具、查看源码、保存等快捷键 */
  document.addEventListener('keydown', e => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j'].includes(e.key)) ||
      (e.ctrlKey && ['u', 's', 'U', 'S'].includes(e.key))
    ) {
      e.preventDefault();
      showAlert('This action has been blocked for security reasons');
    }
  });

  /* 禁止右键菜单 */
  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    showAlert('Right-click & Menu is disabled on this page');
  });

  /* 禁止文字选取 */
  document.addEventListener('selectstart', e => {
    e.preventDefault();
    showAlert('Text extraction is not allowed');
  });

  /* 禁止复制 */
  document.addEventListener('copy', e => {
    e.preventDefault();
    showAlert('Copying is not allowed');
  });

  /* 禁止图片拖动或另存 */
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG' || e.target.closest('img')) {
      e.preventDefault();
      showAlert('Image dragging is disabled');
    }
  });

  /* 防止页面被嵌入到iframe中 */
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }
})();
</script>

<style>
/* 提示框动画与样式 */
.protection-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background: rgba(20, 20, 20, 0.9);
  color: #fff;
  font-family: "Poppins", "Segoe UI", Arial, sans-serif;
  padding: 14px 24px;
  border-radius: 14px;
  font-size: 15px;
  z-index: 10001;
  display: none;
  align-items: center;
  gap: 10px;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: all 0.4s ease;
}

.protection-alert.show {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

/* 图标带轻微闪烁效果 */
.protection-alert .icon {
  animation: blink 1.5s infinite ease-in-out;
}

@keyframes blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

/* 遮罩层样式 */
.protection-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 10000;
  display: none;
  backdrop-filter: blur(2px);
}
