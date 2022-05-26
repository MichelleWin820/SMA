export { putToClipboard };

const putToClipboard = (text: string): void => {
  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.left = '-10000px';
  el.style.top = '-10000px';
  el.textContent = text;
  el.contentEditable = 'true';
  document.body.appendChild(el);

  const rangeToSelect = document.createRange();
  rangeToSelect.selectNodeContents(el);

  const selection = window.getSelection();
  if (!selection) {
    document.body.removeChild(el);
    return;
  }

  selection.removeAllRanges();
  selection.addRange(rangeToSelect);

  document.execCommand('copy', false);
  document.body.removeChild(el);
};
