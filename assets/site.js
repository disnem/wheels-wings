(() => {
  const dialog = document.querySelector('#photo-dialog');
  if (typeof dialog?.showModal !== 'function') return;

  const photos = Array.from(document.querySelectorAll('[data-photo]'));
  const image = document.querySelector('#dialog-image');
  const caption = document.querySelector('#dialog-caption');
  const close = dialog.querySelector('[data-close]');
  let index = 0;
  let previousFocus;

  function showPhoto(nextIndex) {
    index = (nextIndex + photos.length) % photos.length;
    const preview = photos[index].querySelector('img');
    image.src = photos[index].href;
    image.alt = preview.alt;
    caption.textContent = preview.alt;
  }

  photos.forEach((link, photoIndex) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      previousFocus = link;
      showPhoto(photoIndex);
      dialog.showModal();
      close.focus();
    });
  });

  close.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-prev]').addEventListener('click', () => showPhoto(index - 1));
  dialog.querySelector('[data-next]').addEventListener('click', () => showPhoto(index + 1));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showPhoto(index - 1);
    if (event.key === 'ArrowRight') showPhoto(index + 1);
  });
  dialog.addEventListener('close', () => previousFocus?.focus());
})();
