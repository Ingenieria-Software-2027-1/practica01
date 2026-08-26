document.querySelectorAll('.imgfondo img').forEach(img => {
  img.addEventListener('click', () => {
    const src = img.getAttribute('src');
    const parent = img.parentElement;

    if (src.includes('-preview')) {
      img.setAttribute('src', src.replace('-preview', ''));
      parent.style.width = '100%';
    } else {
      img.setAttribute('src', src.replace(/\.png$/, '-preview.png'));
      parent.style.width = '';
    }
  });
});