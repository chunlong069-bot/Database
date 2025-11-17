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
